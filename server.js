const express = require("express");
const dotenv = require("dotenv");
const ConnectDB = require("./Config/db");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser())
// Database connected
ConnectDB();

//Routes
const authUser = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candiateRoutes");
app.use("/api/v1/", authUser);
app.use("/api/v1/", candidateRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
