const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send({
    success: true,
    message: "Laptop Resell service API",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
