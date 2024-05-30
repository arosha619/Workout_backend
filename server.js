const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/User");
const cors = require("cors");

//express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:3000", // Replace with your frontend URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// New route for CI/CD pipeline check
app.get("/api/status", (req, res) => {
  res.json({ status: "CI/CD pipeline is working correctly!" });
});
//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
