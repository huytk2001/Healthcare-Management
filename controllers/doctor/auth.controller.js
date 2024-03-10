const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.model");
const RoomModel = require("../../models/room.model");
require("dotenv").config();

module.exports.getDoctorRegisterPage = async (req, res) => {
  res.render("doctor/pages/register/register.ejs", {
    title: "Doctor Register Page",
  });
};

module.exports.postDoctorRegister = async (req, res) => {
  const { name, email, phone, password, specialty1, specialty2, address } =
    req.body;

  try {
    const existingUser = await UserModel.findOneByEmail(email);

    if (existingUser) {
      req.flash("error", "Email đã tồn tại. Vui lòng chọn email khác.");
      return res.redirect("back");
    }

    const newRoomNumber = await RoomModel.createRoomForDoctor();

    const newUser = await UserModel.createDoctor({
      name: name,
      email: email,
      phone: phone,
      password: password,
      specialty1: specialty1,
      specialty2: specialty2,
      address: address,
      roomNumber: newRoomNumber,
    });

    req.flash("success", "Đăng ký thành công. Vui lòng đăng nhập.");
    res.redirect("/doctor/login");
  } catch (error) {
    console.error("Error in postDoctorRegister:", error);
    req.flash("error", "Đăng ký thất bại. Vui lòng thử lại.");
    res.redirect("back");
  }
};

module.exports.getDoctorLoginPage = async (req, res) => {
  res.render("doctor/pages/login/login.ejs", {
    title: "Doctor Login Page",
  });
};

module.exports.postDoctorLogin = async (req, res) => {
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

    if (existingUser.Role === "doctor") {
      req.flash("success", "Đăng nhập thành công");
      res.redirect("/doctor/profile");
    } else if (existingUser.Role === "admin") {
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

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/doctor/login");
};
