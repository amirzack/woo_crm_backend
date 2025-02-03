import asyncHandler from "express-async-handler";
import pkg from "@woocommerce/woocommerce-rest-api";
const WooCommerceRestApi = pkg.default;
import CryptoJS from "crypto-js";

const api = new WooCommerceRestApi({
  url: "process.env.SITE_URL",
  consumerKey: "process.env.CONSUMER_KEY",
  consumerSecret: "process.env.CONSUMER_SECRET",
  version: "wc/v3",
});

export const getAllOrder = asyncHandler(async (req, res) => {
  const { data } = await api.get("orders?status=processing");
  res.status(200).json({
    status: "success",
    data,
  });
});

let clients = [];

//webhook controller
export const webhookHandler = asyncHandler(async (req, res) => {
  console.log("Webhook received");

  if (req.method === "POST") {
    //recieve signature from header
    // const signature = req.headers["x-wc-webhook-signature"];

    // console.log("Signature:", signature);

    // //Generate signature With cryptojs
    // const generatedSignature = CryptoJS.HmacSHA256(
    //   JSON.stringify(req.body),
    //  process.env.WEB_HOOK_SECRET
    // ).toString(CryptoJS.enc.Base64);

    // console.log("Generated Signature:", generatedSignature);

    // // Check if the signature matches
    // if (signature !== generatedSignature) {
    //   console.error("Signature Mismatch:", {
    //     received: signature,
    //     generated: generatedSignature,
    //   });
    //   return res.status(401).json({
    //     status: "failed",
    //     message: "Invalid signature",
    //   });
    // }

    const order = req.body;
    const { id, status } = order;
    console.log("Webhook order detail:", id);

    //Order with "processing" status
    if (status === "processing") {
      //Send to database

      // Send a SSE notification to all connected clients
      clients.forEach((client) => {
        client.res.write(`event: order-status-update\n`);
        client.res.write(`data: ${JSON.stringify(order)}\n\n`);
      });
    } else {
      console.log("Problem with res write");
    }
    //response
    res.status(200).json({
      status: "success",
      message: "Webhook received and processed successfully",
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
});

export const sseHandler = (req, res) => {
  res.socket.server.keepAliveTimeout = 60000;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  // Important: Force HTTP/1.1
  res.setHeader("X-HTTP-Version", "1.1");

  //Save client connection
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  clients.push(newClient);
  console.log(`Client ${clientId} Connected`);

  // Handle client disconnection

  req.on("close", () => {
    clients = clients.filter((client) => client.id !== clientId);
    console.log(`Client ${clientId} Disconnected`);
  });
};
