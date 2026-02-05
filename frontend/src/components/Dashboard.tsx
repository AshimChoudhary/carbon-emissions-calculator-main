import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { activitiesAPI } from "../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface DashboardStats {
  period: string;
  stats: {
    transport: number;
    energy: number;
    diet: number;
    total: number;
  };
  comparison: {
    current: number;
    previous: number;
    change: number;
  };
}

const Dashboard: React.FC = () => {
  const [period, setPeriod] = useState("daily");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [period]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await activitiesAPI.getDashboardStats(period);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">
          No data available yet. Start logging activities!
        </p>
      </div>
    );
  }

  const categoryData = {
    labels: ["Transport", "Energy", "Diet"],
    datasets: [
      {
        label: "CO2 Emissions (kg)",
        data: [stats.stats.transport, stats.stats.energy, stats.stats.diet],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm">Total Emissions</h3>
          <p className="text-3xl font-bold text-gray-800">
            {stats.stats.total.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">kg CO2e</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm">Transport</h3>
          <p className="text-3xl font-bold text-red-600">
            {stats.stats.transport.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">kg CO2e</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm">Energy</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.stats.energy.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">kg CO2e</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm">Diet</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.stats.diet.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">kg CO2e</p>
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Period Comparison</h3>
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-sm text-gray-600">Current Period</p>
            <p className="text-2xl font-bold">
              {stats.comparison.current.toFixed(2)} kg
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Previous Period</p>
            <p className="text-2xl font-bold">
              {stats.comparison.previous.toFixed(2)} kg
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Change</p>
            <p
              className={`text-2xl font-bold ${
                stats.comparison.change > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {stats.comparison.change > 0 ? "+" : ""}
              {stats.comparison.change.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
        <Bar
          data={categoryData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
