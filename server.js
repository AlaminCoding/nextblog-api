const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// ROUTER IMPORT
const router = require("./routes");
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const userRouter = require("./routes/user-profile");
const tagRouter = require("./routes/tag");
//APP
const app = express();

// CORS
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: process.env.CLIENT_URL }));
}

//DATABASE
async function dbConnect() {
  await mongoose.connect(process.env.DB_CONNECTION_URL);
  console.log("DATABASE CONNECTED");
}
dbConnect().catch((err) => console.log(err));

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ROUTE INITIALIZATION WITH MIDDLEWARE
app.use("/api", router);
app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/tag", tagRouter);

app.listen(process.env.PORT, () => {
  console.log("SERVER RUNNING AT " + process.env.PORT);
});
