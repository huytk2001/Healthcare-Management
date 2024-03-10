const AppointmentModel = require("../../models/appointment.model");

module.exports.getAllAppointmentsDoctorId = async (req, res) => {
  res.locals.currentPage = "appointments";

  const user = req.user;

  const userId = req.user.userId;

  const appointments = await AppointmentModel.getAllAppointmentsDoctorId(
    userId
  );
  console.log(userId);

  console.log(appointments);
  res.render("doctor/pages/appointments/index.ejs", {
    title: "Appointment Dashboard",
    user: user,
    appointments: appointments,
    currentPageAppointment: res.locals.currentPage,
  });
};

module.exports.updateStatus = async (req, res) => {
  const { appointmentId, newStatus } = req.params;

  try {
    const success = await AppointmentModel.updateStatus(
      appointmentId,
      newStatus
    );
    req.flash("success", "Cập nhật trạng thái cuộc hẹn thành công.");
  } catch (error) {
    console.error("Error updating status:", error);
    req.flash("error", "Cập nhật trạng thái cuộc hẹn thất bại.");
  }
};
