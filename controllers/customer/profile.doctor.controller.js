const UserModel = require("../../models/user.model");
const AppointmentModel = require("../../models/appointment.model");

module.exports.getDoctorProfile = async (req, res) => {
  const user = req.user;

  const userId = req.params.userId;

  const doctorInfo = await UserModel.getDoctor(userId);

  const appointmentInfo = await AppointmentModel.getAppointmentInfo(userId);

  console.log(req.user);

  console.log(doctorInfo);

  console.log(appointmentInfo);

  res.render("customer/pages/profileDoctor/profile_doctor.ejs", {
    title: "Thông tin Bác sĩ",
    user: user,
    doctorInfo: doctorInfo,
    appointmentInfo: appointmentInfo,
  });
};

module.exports.getDoctorProfileApointment = async (req, res) => {
  const user = req.user;

  const userId = req.params.userId;

  const { date, time } = req.query;

  const doctorInfo = await UserModel.getDoctor(userId);

  console.log(doctorInfo.Doctor_id);

  res.render("customer/pages/appointment/create_appointment.ejs", {
    title: "Thông tin Bác sĩ",
    user: user,
    doctorInfo: doctorInfo,
    date: date,
    time: time,
  });
};

module.exports.createAppointment = async (req, res) => {
  try {
    const appointmentData = {
      customerName: req.body.customerName,
      customerGender: req.body.customerGender,
      customerPhone: req.body.customerPhone,
      customerDOB: req.body.customerDOB,
      customerAddress: req.body.customerAddress,
      userId: req.body.userId,
      doctorId: req.body.doctorId,
      roomNumber: req.body.roomId,
      appointmentTime: req.body.appointmentTime,
      appointmentDate: req.body.appointmentDate,
    };

    // Create an appointment
    const appointmentResult = await UserModel.createAppointment(
      appointmentData
    );

    const user = req.user;

    res.render("customer/pages/appointment/success.ejs", {
      title: "Đặt lịch thành công",
      user: user,
      appointmentId: appointmentResult.appointmentId,
    });
  } catch (error) {
    console.error("Error in createAppointmentPost:", error);
    res.status(500).send("Internal Server Error");
  }
};
