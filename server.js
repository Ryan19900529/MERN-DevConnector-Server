const express = require("express");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5001;
const app = express();

// Connect Database
connectDB();

// Initial Middleware
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(PORT, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Server started on port ${PORT}`);
});
