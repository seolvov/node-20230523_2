// import express from "express"
//
// import cors from "cors"
// import morgan from "morgan"
// import bodyParser from "body-parser";
// import dotEnv from "dotenv"
//
// dotEnv.config()
//
// import connectDB from "./config/database.js";
//
// const app = express()
//
// connectDB()
//
// app.use(cors())
// app.use(morgan('dev'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
//
// app.get("/test", (req, res) => {
//     res.json({
//         msg: "test api"
//     })
// })
//
//
//
// const port = process.env.PORT || 9090
//
// app.listen(port, console.log(`server started at ${port}`))


import express from "express"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"

import productRoute from "./routes/product.js"
import orderRoute from "./routes/order.js"
import userRoute from "./routes/user.js"

import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/database.js"

const app = express();
connectDB();

app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))

app.use("/product", productRoute)
app.use("/order", orderRoute)
app.use("/user", userRoute)

app.get("/", (req, res) => {
    res.json({
        msg: "server check"
    })
})

const port = process.env.PORT || 9090


app.listen(port, console.log(`-----> server started at ${port}`));