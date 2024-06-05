const expres = require('express');
const app = expres();
const mongoose = require("mongoose");
const cors = require('cors');
const port = 3000;
const helmet = require('helmet');


//dotenv config
require('dotenv').config();
const url = process.env.MONGODB_URL_1 //mongodb url

app.use(expres.json());
app.use(cors());
app.use(helmet());

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["'self'", "data:"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        // Add other directives as needed
      },
    })
  );

const userRoute = require("./src/apps/user/route")
app.use("/api/user",userRoute);

const refreshToken = require("./src/apps/refreshToken/route")
app.use("/api/auth",refreshToken);

const adminRoute = require("./src/apps/admin/route")
app.use("/api/admin",adminRoute);

const category = require("./src/apps/category/route")
app.use("/api/admin",category);

const subCategory = require("./src/apps/subCategory/route")
app.use("/api/admin",subCategory);

const order = require("./src/apps/orderDetails/route")
app.use("/api/user",order);

const deliveryAgent = require("./src/apps/deliveryAgents/route")
app.use("/api/delivery-agent",deliveryAgent)

//mongodb connection setup
mongoose.connect(url)
    .then(() => console.log("mongodb atlas connected"))
    .catch((e) => console.log("error found", e))


app.listen(port, () => {
    console.log(`port is starting on ${port}`)
})