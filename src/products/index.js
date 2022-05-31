import express from 'express';
import Product from "./model.js"

const productsRouter = express.Router()

productsRouter
    .get('/', async (req, res) => {
        const products = await Product.find({})
        res.send(products)
    })
    .post("/", async (req, res, next) => {
        try {
            const product = new Product(req.body)
            await product.save()

            res.status(201).send(product)
        } catch (error) {
            console.log(error)
            res.status(400).send()
        }
    })

export default productsRouter