const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.model");
require("dotenv").config();

module.exports.getCustomerRegisterPage = async (req, res) => {
  res.render("customer/pages/register/register.ejs", {
    title: "Đăng ký khách hàng",
  });
};

module.exports.postCustomerRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOneByEmail(email);

    if (existingUser) {
      req.flash("error", "Email đã tồn tại. Vui lòng chọn email khác.");
      return res.redirect("back");
    }

    const newUser = await UserModel.createUser({
      email: email,
      password: password,
    });

    req.flash("success", "Đăng ký thành công. Vui lòng đăng nhập.");
    res.redirect("/login");
  } catch (error) {
    console.error("Error in postCustomerRegister:", error);
    req.flash("error", "Đăng ký thất bại. Vui lòng thử lại.");
    res.redirect("back");
  }
};

module.exports.getCustomerLoginPage = async (req, res) => {
  res.render("customer/pages/login/login.ejs", {
    title: "Customer Login Page",
  });
};

module.exports.postCustomerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOneByEmail(email);

    if (!existingUser) {
      req.flash("error", "Email không tồn tại");
      return res.redirect("back");
    }

    if (password !== existingUser.Password) {
      req.flash("error", "Mật khẩu không đúng");
      return res.redirect("back");
    }

    const token = jwt.sign(
      {
        userId: existingUser.User_Id,
        email: existingUser.Email,
        role: existingUser.Role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token);

    if (existingUser.Role === "customer") {
      req.flash("success", "Đăng nhập thành công");
      res.redirect("/");
    } else if (existingUser.Role === "admin") {
      req.flash(
        "error",
        "Bạn là Admin, hãy truy cập trang đăng nhập dành cho Admin"
      );
      res.redirect("back");
    } else if (existingUser.Role === "doctor") {
      req.flash(
        "error",
        "Bạn là Doctor, hãy truy cập trang đăng nhập dành cho Doctor"
      );
      res.redirect("back");
    } else {
      req.flash("error", "Vai trò người dùng không hợp lệ");
      res.redirect("back");
    }
  } catch (error) {
    console.error("Error in postAdminLogin:", error);
    req.flash("error", "Đăng nhập thất bại");
    res.redirect("back");
  }
};

module.exports.logoutCustomer = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
