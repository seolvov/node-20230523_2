import express from "express";
import Product from "./product.js";
import orderModel from "../models/order.js"

const router = express.Router()

router.get("/all", async (req, res) => {
    const orders = await orderModel
        .find()
        .populate("product")
    res.json({
        msg: "order get all",
        orders
    })
})
router.post("/", async (req, res) => {
    const { product, qty, memo } = req.body
    const newOrder = new orderModel({
        product, qty, memo
    })
    const createdOrder = await newOrder.save()
    res.json({
        msg: "successful new order",
        order: createdOrder
    })
})
router.put("/", (req, res) => {
    res.json({
        msg: "put ! "
    })
})
router.delete("/", (req, res) => {
    res.json({
        msg: "delete !"
    })
})


export default router