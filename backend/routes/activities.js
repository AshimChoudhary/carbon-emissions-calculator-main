const express = require("express");
const router = express.Router();
const {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");
const { protect } = require("../middleware/auth");

router.route("/").post(protect, createActivity).get(protect, getActivities);

router
  .route("/:id")
  .get(protect, getActivity)
  .put(protect, updateActivity)
  .delete(protect, deleteActivity);

module.exports = router;
