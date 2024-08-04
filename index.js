require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const userRoute = require("./routes/userRoute");
const diagnoseRoute = require("./routes/diagnoseRoute");
const { connectDB } = require("./config/db");
const errorHandler = require("./middlewares/errorHandler.js");

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoute);
app.use("/api/diagnose", diagnoseRoute);
app.use(errorHandler);

app.use((error, req, res, next) => {
  res.status(error.status).json({ message: error.message });
});

connectDB().then(() => {
  console.log("Connect to DB");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
