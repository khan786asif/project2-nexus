const express = require("express");
const path=require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/restaurant", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
