const OpenAI = require("openai");
const Activity = require("../models/Activity");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a sustainability expert specializing in carbon footprint reduction.",
        },
        {
          role: "user",
          content: `You are a sustainability expert.
Analyze the following user's carbon emission data:

${dataSummary}

1. Identify top emission sources.
2. Suggest 5 realistic actions.
3. Quantify impact where possible.
4. Keep advice practical and concise.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const recommendations = completion.choices[0].message.content;

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
