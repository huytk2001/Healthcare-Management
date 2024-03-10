const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql2");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const express_session = require("express-session");
const adminRoutes = require("./routes/admin/index.route");
const doctorRoutes = require("./routes/doctor/index.route");
const customerRoutes = require("./routes/customer/index.route");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();
const port = process.env.PORT;
const database = require("./config/database");
const systemConfig = require("./config/system");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser("GJDMLAA"));
app.use(express_session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.use("/admin", adminRoutes);
app.use("/doctor", doctorRoutes);
app.use("/", customerRoutes);

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
