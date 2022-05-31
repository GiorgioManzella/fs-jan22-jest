import express from "express";
import cors from "cors";
import productsRouter from "./products/index.js";

const app = express();

app.use(express.json())
app.use(cors());

app.get('/api/test', (req, res) => {
    res.send({
        message: "Test successful"
    })
})

app.use("/api/products", productsRouter)

/**
 * We can't run our application here, otherwise it's going to **start
 * again** everytime we run the tests. And we don't want that, or it's going
 * to fail the tests.
 */
// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// })

export default app



