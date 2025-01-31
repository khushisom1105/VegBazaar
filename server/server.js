const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const app = express();
const cors = require("cors");
const bodyparse = require("body-parser");
const authRouter = require("./routes/index.js");
const port = 4007;
app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URL);
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.log("error =>", error);
    }
  };
  start();