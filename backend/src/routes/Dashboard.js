const express = require("express");
const Dashboard = express.Router();
const dashboard = require("../controllers/DashboardData.js");
const authMiddleware = require("../services/authMiddleware.js");

Dashboard.post(
  "/auth/dashboardData",
  authMiddleware,
  dashboard.dashboardData
);



module.exports = Dashboard;
