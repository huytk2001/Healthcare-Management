module.exports.getAdminDashboard = async (req, res) => {
  res.locals.currentPage = "dashboard";

  const user = req.user;

  res.render("admin/pages/dashboard/index.ejs", {
    title: "Admin Dashboard",
    user: user,
    currentPageDashboard: res.locals.currentPage,
  });
};
