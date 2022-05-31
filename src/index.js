import mongoose from "mongoose";
import app from "./app.js"
// This will fail in production because "dotenv"
// is NOT a production dependency.
// ERROR: MODULE_NOT_FOUND
// import dotenv from "dotenv"
// dotenv.config()

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
})