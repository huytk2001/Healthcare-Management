const UserModel = require("../../models/user.model");

module.exports.getHomePage = async (req, res) => {
  const user = req.user;

  const doctors = await UserModel.getAllDoctors();

  console.log(doctors);

  res.render("customer/pages/home/index.ejs", {
    title: "Trang chủ",
    user: user,
    doctors: doctors,
  });
};
