import asyncHandler from "express-async-handler";
import pkg from "@woocommerce/woocommerce-rest-api";
const WooCommerceRestApi = pkg.default;

const api = new WooCommerceRestApi({
  url: "https://hugerofashion.com",
  consumerKey: "ck_0f980069d6b89b6c1c085090baba7559e7a73d85",
  consumerSecret: "cs_f84c3f2feaeecfaf8cdce19f658dd68b52ce20c4",
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
