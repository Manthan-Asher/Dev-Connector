const express = require("express");
const mongoose = require("mongoose");
const bodyParser=require('body-parser')

const app = express();
app.use(bodyParser.json({extended:true}))

// Connect Database
mongoose.connect("mongodb://localhost:27017/devconnectorDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
});

app.get("/", (req, res) => res.send("API running"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
