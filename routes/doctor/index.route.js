const express = require("express");
const router = express.Router();
const controllerAuth = require("../../controllers/doctor/auth.controller");
const controllerProfile = require("../../controllers/doctor/profile.controller");
const controllerAppointments = require("../../controllers/doctor/appointment.controller");
const { authenticateUser } = require("../../middleware/auth.middleware");

router.get("/register", controllerAuth.getDoctorRegisterPage);
router.post("/register", controllerAuth.postDoctorRegister);

router.get("/login", controllerAuth.getDoctorLoginPage);
router.post("/login", controllerAuth.postDoctorLogin);
router.get("/logout", controllerAuth.logout);
router.get("/profile", authenticateUser, controllerProfile.getProfileDoctor);
router.get(
  "/appointments",
  authenticateUser,
  controllerAppointments.getAllAppointmentsDoctorId
);
router.put(
  "/updateStatus/:appointmentId/:newStatus",
  authenticateUser,
  controllerAppointments.updateStatus
);

module.exports = router;
