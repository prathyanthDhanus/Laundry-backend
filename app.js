const expres = require('express');
const app = expres();
const mongoose = require("mongoose");
const cors = require('cors');
const port = 3000;



//dotenv config
require('dotenv').config();
const url = process.env.MONGODB_URL_1 //mongodb url

app.use(expres.json());
app.use(cors());

const userRoute = require("./src/apps/user/route")
app.use("/api/user",userRoute)


//mongodb connection setup
mongoose.connect(url)
    .then(() => console.log("mongodb atlas connected"))
    .catch((e) => console.log("error found", e))


app.listen(port, () => {
    console.log(`port is starting on ${port}`)
})