//loading env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");

const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orderRoutes");
const orderItemRoutes = require("./routes/orderItemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const salesexecutiveRouter = require("./routes/SalesExecutives.js");
const deliverydriverRouter = require("./routes/DeliveryDrivers.js");
const adminRouter = require("./routes/Admin.js");
const loginRouter = require("./routes/Logins.js");
const leaveRouter = require("./routes/LeaveApplications.js");
const supplierRouter = require("./routes/supplier.js");
const paymentRouter = require("./routes/Payment.js");
const deliveryRouter = require("./controllers/deliveryController.js");

//Creating our express app
const app = express();

//Configuring our express app
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

//Connecting to our database
connectToDb();

const auth = require("./routes/auth");


//Routing
app.use("/api/v1/", auth);
app.use("/carts", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/orderItems", orderItemRoutes);
app.use("/salesexecutive", salesexecutiveRouter);
app.use("/deliverydriver", deliverydriverRouter);
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/leave", leaveRouter);
app.use("/supplier", supplierRouter);
app.use("/payment", paymentRouter);
app.use("/", deliveryRouter);

app.listen(process.env.PORT);
