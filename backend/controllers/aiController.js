const Activity = require("../models/Activity");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Gemini AI (FREE tier: 60 requests/minute)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Get AI recommendations based on user activities
// @route   GET /api/ai/recommendations
// @access  Private
exports.getRecommendations = async (req, res) => {
  try {
    // Get user's recent activities (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activities = await Activity.find({
      user: req.user.id,
      date: { $gte: thirtyDaysAgo },
    }).sort({ date: -1 });

    if (activities.length === 0) {
      return res.status(400).json({
        message: "No activity data found. Please log some activities first.",
      });
    }

    // Aggregate emissions data
    const totalEmissions = activities.reduce(
      (acc, activity) => {
        acc.transport += activity.emissions.transport || 0;
        acc.energy += activity.emissions.energy || 0;
        acc.diet += activity.emissions.diet || 0;
        acc.total += activity.emissions.total || 0;
        return acc;
      },
      { transport: 0, energy: 0, diet: 0, total: 0 },
    );

    // Calculate averages
    const avgDaily = totalEmissions.total / 30;

    // Prepare data summary for AI
    const dataSummary = `
Total Carbon Emissions (Last 30 days): ${totalEmissions.total.toFixed(2)} kg CO2e
Average Daily Emissions: ${avgDaily.toFixed(2)} kg CO2e

Breakdown by Category:
- Transport: ${totalEmissions.transport.toFixed(2)} kg CO2e (${((totalEmissions.transport / totalEmissions.total) * 100).toFixed(1)}%)
- Energy: ${totalEmissions.energy.toFixed(2)} kg CO2e (${((totalEmissions.energy / totalEmissions.total) * 100).toFixed(1)}%)
- Diet: ${totalEmissions.diet.toFixed(2)} kg CO2e (${((totalEmissions.diet / totalEmissions.total) * 100).toFixed(1)}%)

Number of logged days: ${activities.length}
    `.trim();

    // Generate AI recommendations using Google Gemini
    const prompt = `You are a sustainability expert.
Analyze the following user's carbon emission data:

${dataSummary}

1. Identify top emission sources.
2. Suggest 5 realistic actions.
3. Quantify impact where possible.
4. Keep advice practical and concise.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recommendations = response.text();

    res.json({
      summary: totalEmissions,
      avgDaily,
      recommendations,
      generatedAt: new Date(),
    });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      message: "Failed to generate recommendations",
      error: error.message,
    });
  }
};
