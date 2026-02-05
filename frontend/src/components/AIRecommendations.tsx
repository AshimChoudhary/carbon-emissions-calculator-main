import React, { useState } from "react";
import { aiAPI } from "../api";

interface Recommendations {
  summary: {
    transport: number;
    energy: number;
    diet: number;
    total: number;
  };
  avgDaily: number;
  recommendations: string;
  generatedAt: string;
}

const AIRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] =
    useState<Recommendations | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await aiAPI.getRecommendations();
      setRecommendations(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">AI Recommendations</h2>
        <button
          onClick={fetchRecommendations}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Get Recommendations"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!recommendations && !error && (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-center">
          <p className="text-gray-700">
            Click "Get Recommendations" to receive personalized tips based on
            your activity data.
          </p>
        </div>
      )}

      {recommendations && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Your Carbon Footprint (Last 30 Days)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-800">
                  {recommendations.summary.total.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">kg CO2e</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Transport</p>
                <p className="text-2xl font-bold text-red-600">
                  {recommendations.summary.transport.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">kg CO2e</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Energy</p>
                <p className="text-2xl font-bold text-blue-600">
                  {recommendations.summary.energy.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">kg CO2e</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Diet</p>
                <p className="text-2xl font-bold text-green-600">
                  {recommendations.summary.diet.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">kg CO2e</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">Average Daily Emissions</p>
              <p className="text-xl font-bold text-gray-800">
                {recommendations.avgDaily.toFixed(2)} kg CO2e/day
              </p>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">🤖</span>
              AI-Powered Recommendations
            </h3>
            <div className="bg-white p-4 rounded-lg whitespace-pre-wrap">
              {recommendations.recommendations}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Generated on{" "}
              {new Date(recommendations.generatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
