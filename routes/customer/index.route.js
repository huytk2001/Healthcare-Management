const express = require("express");
const router = express.Router();
const controllerHome = require("../../controllers/customer/home.controller");
const controllerAuth = require("../../controllers/customer/auth.controller");
const controllerProfileDoctor = require("../../controllers/customer/profile.doctor.controller");
// const controllerProfile = require("../../controllers/customer/profile.controller");
// const controllerAppointments = require("../../controllers/customer/appointment.controller");
const {
  authenticateCustomer,
} = require("../../middleware/authCustomer.middleware");

router.get("/", controllerHome.getHomePage);

router.get("/register", controllerAuth.getCustomerRegisterPage);
router.post("/register", controllerAuth.postCustomerRegister);

router.get("/login", controllerAuth.getCustomerLoginPage);
router.post("/login", controllerAuth.postCustomerLogin);
router.get("/logout", controllerAuth.logoutCustomer);
router.get(
  "/doctor/:userId",
  authenticateCustomer,
  controllerProfileDoctor.getDoctorProfile
);
router.get(
  "/doctor/:userId/appointment",
  authenticateCustomer,
  controllerProfileDoctor.getDoctorProfileApointment
);
router.post(
  "/create_appointment",
  authenticateCustomer,
  controllerProfileDoctor.createAppointment
);

// router.get("/profile", authenticateUser, controllerProfile.getProfileDoctor);
// router.get(
//   "/appointments",
//   authenticateUser,
//   controllerAppointments.getAllAppointments
// );

module.exports = router;
