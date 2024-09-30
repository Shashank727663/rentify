const express = require("express");
const app = express();
const connectdb = require('../db');
const UserRouter = require("../Routes/userRoutes");
const protect = require('../middlewares/authmiddleware');
const env = require('dotenv');
const cors = require("cors");
app.use(cors());
app.use(express.json());
connectdb();


app.use("/users", UserRouter);
app.use("/sellers", protect , require("../Routes/sellersRoutes"));
app.use("/buyers", protect , require("../Routes/buyersRoute"));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
