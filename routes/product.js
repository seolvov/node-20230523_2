import express from "express";
import productModel from "../models/product.js";

const router = express.Router()

router.get("/all", async (req, res) => {
    const products = await productModel.find() //find()는 array로 return
    res.json({
        msg: "product get all",
        count: products.length,
        products: products.map(item => {
            return {
                id: item._id,
                title: item.title,
                price: item.price
            }
        })
    })
})
router.get("/:productId", async (req, res) => {
    // const product = await productModel.findById(req.params.productId) //url 들어가는 params
    const { productId } = req.params
    const product = await productModel.findById(productId)
    res.json({
        msg: `successful get ${productId}`,
        product
    })
})
router.post("/", async (req, res) => {
    // const userInput = new productModel({
    //     title: req.body.productTitle,
    //     price: req.body.productPrice,
    //     description: req.body.productDescription,
    //     brand: req.body.productBrand,
    //     company: req.body.productCompany,
    //     stock: req.body.productStock
    // })
    const { title, price, description, brand, company, stock } = req.body
    const userInput = new productModel({
        title, price, description, brand, company, stock
    })

    const newProduct = await userInput.save()
    res.json({
        msg: "created a product",
        product: newProduct
    })
})
router.put("/:productId", async (req, res) => {
    const { title, price, description, brand, company, stock } = req.body
    const { productId } = req.params
    const product = await productModel.findById(productId)
    if(product) {
        product.title = title ? title : product.title //삼항연산자
        product.price = price ? price : product.price
        product.description = description ? description : product.description
        product.brand = brand ? brand : product.brand
        product.company = company ? company : product.company
        product.stock = stock ? stock : product.stock
    }
    const updateProduct = await product.save()
    res.json({
        msg: `updated product at ${productId}`,
        product: updateProduct
    })
})
router.delete("/", async (req, res) => {
    await productModel.deleteMany()
    res.json({
        msg: "deleted all products"
    })
})
router.delete("/:productId", async (req, res) => {
    const { productId } = req.params
    await productModel.findByIdAndDelete(productId)
    res.json({
        msg: `deleted a product at ${productId}`
    })
})

export default router