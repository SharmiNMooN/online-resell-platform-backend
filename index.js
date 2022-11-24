const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.js");
const userRoutes = require("./routes/user");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

connectDB()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send({
    success: true,
    message: "Laptop Resell service API",
  });
});

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
