import asyncHandler from "express-async-handler";
import pkg from "@woocommerce/woocommerce-rest-api";
const WooCommerceRestApi = pkg.default;

const api = new WooCommerceRestApi({
  url: "https://woocommerce-url-site.com",//site domain
  consumerKey: "Consumer key",//key from api key woocomerce
  consumerSecret: "Consumer secret ",
  version: "wc/v3",
});

export const getAllOrder = asyncHandler(async (req, res) => {
  const params = {
    status: "processing",
  };
  const { data } = await api.get("orders?status=processing");
  res.status(200).json({
    status: "success",
    data,
  });
});

//webhook controller
export const webhookHandler = asyncHandler(async (req, res) => {
  const webhookData = req.body;
  if (!webhookData || !webhookData.id) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid Webhook data",
    });
  }
  console.log("New webhook received:", webhookData);

  //response
  res.status(200).json({
    status: "success",
    message: "Webhook received and processed successfully",
  });
});
