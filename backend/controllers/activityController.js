const Activity = require("../models/Activity");

// @desc    Create new activity
// @route   POST /api/activities
// @access  Private
exports.createActivity = async (req, res) => {
  try {
    const activity = await Activity.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all activities for logged in user
// @route   GET /api/activities
// @access  Private
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Private
exports.getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Make sure user owns activity
    if (activity.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private
exports.updateActivity = async (req, res) => {
  try {
    let activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Make sure user owns activity
    if (activity.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Make sure user owns activity
    if (activity.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await activity.deleteOne();

    res.json({ message: "Activity removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/activities/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    const { period = "daily" } = req.query;
    const now = new Date();
    let startDate;

    switch (period) {
      case "daily":
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case "weekly":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "monthly":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        startDate = new Date(now.setHours(0, 0, 0, 0));
    }

    const activities = await Activity.find({
      user: req.user.id,
      date: { $gte: startDate },
    });

    const stats = activities.reduce(
      (acc, activity) => {
        acc.transport += activity.emissions.transport || 0;
        acc.energy += activity.emissions.energy || 0;
        acc.diet += activity.emissions.diet || 0;
        acc.total += activity.emissions.total || 0;
        return acc;
      },
      { transport: 0, energy: 0, diet: 0, total: 0 },
    );

    const previousPeriodStart = new Date(startDate);
    if (period === "daily") {
      previousPeriodStart.setDate(previousPeriodStart.getDate() - 1);
    } else if (period === "weekly") {
      previousPeriodStart.setDate(previousPeriodStart.getDate() - 7);
    } else {
      previousPeriodStart.setMonth(previousPeriodStart.getMonth() - 1);
    }

    const previousActivities = await Activity.find({
      user: req.user.id,
      date: { $gte: previousPeriodStart, $lt: startDate },
    });

    const previousTotal = previousActivities.reduce(
      (sum, activity) => sum + (activity.emissions.total || 0),
      0,
    );

    const comparison = {
      current: stats.total,
      previous: previousTotal,
      change:
        previousTotal > 0
          ? ((stats.total - previousTotal) / previousTotal) * 100
          : 0,
    };

    res.json({
      period,
      stats,
      comparison,
      breakdown: {
        transport: stats.transport,
        energy: stats.energy,
        diet: stats.diet,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
