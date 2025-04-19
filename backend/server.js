const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); 
const userRoutes = require("./routes/userRoutes");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));


app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); 
  });

app.listen(8080, () => console.log("Server running on port 8080"));

const registerUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8080/api/users/register", {
      username,
      password,
    }, { withCredentials: true });
    console.log("User registered successfully:", response.data);
  } catch (error) {
    console.error("Error registering user:", error.message);
  }
};