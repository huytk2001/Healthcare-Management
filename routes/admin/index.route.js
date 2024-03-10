const express = require("express");
const router = express.Router();
const controllerDashboard = require("../../controllers/admin/dashboard.controller");
const controllerAuth = require("../../controllers/admin/auth.controller");
const controllerUsers = require("../../controllers/admin/user.controller");
const controllerAppointments = require("../../controllers/admin/appointment.controller");
const { authenticateUser } = require("../../middleware/auth.middleware");

router.get(
  "/dashboard",
  authenticateUser,
  controllerDashboard.getAdminDashboard
);
router.get("/login", controllerAuth.getAdminLoginPage);
router.post("/login", controllerAuth.postAdminLogin);
router.get("/logout", controllerAuth.logout);
router.get("/users", authenticateUser, controllerUsers.getAllUser);
router.get(
  "/appointments",
  authenticateUser,
  controllerAppointments.getAllAppointments
);

module.exports = router;
