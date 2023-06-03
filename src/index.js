const express = require("express");
const mongoose = require("mongoose");
const router= require("./routes/route")

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Shwetadubey:QvtqJ8hdhmn0fhlT@cluster0.ymyddly.mongodb.net/New_Task",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/", router)

const PORT=3000
  app.listen(PORT,()=>console.log(`Server is connected to ${PORT}`))