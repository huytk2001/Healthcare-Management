const UserModel = require("../../models/user.model");

module.exports.getAllUser = async (req, res) => {
  try {
    res.locals.currentPage = "users";

    const userInfo = req.user;

    const users = await UserModel.getAllUser();

    res.render("admin/pages/users/index.ejs", {
      title: "User Dashboard",
      user: userInfo,
      users: users,
      currentPageUsers: res.locals.currentPage,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
