const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Server started on port ${PORT}`);
});
