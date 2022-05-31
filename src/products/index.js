import express from "express";
import Product from "./model.js";

const productsRouter = express.Router();

productsRouter
  .get("/", async (req, res) => {
    const products = await Product.find({});
    console.log(products);
    res.send(products);
  })

  .get("/:id", async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      console.table({ product });

      if (!product) {
        return res.status(404).send("Product not found");
      }

      res.send(product);
    } catch (error) {
      next(error);
    }
  })

  .post("/", async (req, res, next) => {
    try {
      const product = new Product(req.body);
      await product.save();

      res.status(201).send(product);
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
  })

  .delete("/:id", async (req, res, next) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).send("Product not found");
      }

      res.send(product);
    } catch (error) {
      next(error);
    }
  });

export default productsRouter;
