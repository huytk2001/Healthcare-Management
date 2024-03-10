const UserModel = require("../../models/user.model");

module.exports.getProfileDoctor = async (req, res) => {
  res.locals.currentPage = "profile";

  const user = req.user;

  const userId = req.user.userId;

  const doctorInfo = await UserModel.getDoctor(userId);

  res.render("doctor/pages/profile/profile.ejs", {
    title: "Appointment Dashboard",
    user: user,
    doctorInfo: doctorInfo,
    currentPageAppointment: res.locals.currentPage,
  });
};
