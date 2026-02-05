const express = require("express");
const router = express.Router();
const {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
  getDashboardStats,
} = require("../controllers/activityController");
const { protect } = require("../middleware/auth");
const { validateActivity } = require("../middleware/validation");

router.route("/").post(protect, validateActivity, createActivity).get(protect, getActivities);

router.get("/dashboard/stats", protect, getDashboardStats);

router
  .route("/:id")
  .get(protect, getActivity)
  .put(protect, validateActivity, updateActivity)
  .delete(protect, deleteActivity);

module.exports = router;
