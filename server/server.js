
const express = require('express');

const app = express();
const cors = require("cors");
const bodyparse = require("body-parser");
const port = 3000;
app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set up a simple route for the home page
app.get('/', (req, res) => {
  res.send('Hello World! This is your la a first Express server.');
});


const start = async () => {
    try {
      //await connectDB(process.env.MONGO_URL);
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.log("error =>", error);
    }
  };
  start();