require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const userRoute = require("./routes/userRoute");
const diagnoseRoute = require("./routes/diagnoseRoute");
const queueRoute = require("./routes/queueRoute");
const historyRoute = require("./routes/historyRoute");
const { connectDB } = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoute);
app.use("/api/diagnose", diagnoseRoute);
app.use("/api/queue", queueRoute);
app.use("/api/history", historyRoute);
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
