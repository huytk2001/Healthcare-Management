const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.model");
require("dotenv").config();

module.exports.getAdminLoginPage = async (req, res) => {
  res.render("admin/pages/login/login.ejs", {
    title: "Admin Login Page",
  });
};

module.exports.postAdminLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

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

    if (existingUser.Role === "admin") {
      req.flash("success", "Đăng nhập thành công");
      res.redirect("/admin/users");
    } else if (existingUser.Role === "doctor") {
      req.flash("error", "Bạn không có quyền truy cập trang này");
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

module.exports.getAdminDashboard = async (req, res) => {
  const { email, name } = req.user;

  res.render("admin/pages/dashboard/index", {
    title: "Admin Dashboard",
    email,
    name,
  });
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/login");
};
