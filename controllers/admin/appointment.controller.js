const AppointmentModel = require("../../models/appointment.model");

module.exports.getAllAppointments = async (req, res) => {
  res.locals.currentPage = "appointments";

  const user = req.user;

  const appointments = await AppointmentModel.getAllAppointments();

  res.render("admin/pages/appointment/index.ejs", {
    title: "Appointment Dashboard",
    user: user,
    appointments: appointments,
    currentPageAppointment: res.locals.currentPage,
  });
};
