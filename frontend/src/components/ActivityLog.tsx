import React, { useState, useEffect } from "react";
import { activitiesAPI } from "../api";

interface Activity {
  _id: string;
  date: string;
  transport: {
    carKm: number;
    flightKm: number;
  };
  energy: {
    electricityKWh: number;
  };
  diet: {
    beefMeals: number;
    vegetarianMeals: number;
  };
  emissions: {
    transport: number;
    energy: number;
    diet: number;
    total: number;
  };
}

const ActivityLog: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    carKm: 0,
    flightKm: 0,
    electricityKWh: 0,
    beefMeals: 0,
    vegetarianMeals: 0,
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await activitiesAPI.getAll();
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await activitiesAPI.create({
        date: formData.date,
        transport: {
          carKm: formData.carKm,
          flightKm: formData.flightKm,
        },
        energy: {
          electricityKWh: formData.electricityKWh,
        },
        diet: {
          beefMeals: formData.beefMeals,
          vegetarianMeals: formData.vegetarianMeals,
        },
      });
      setShowForm(false);
      setFormData({
        date: new Date().toISOString().split("T")[0],
        carKm: 0,
        flightKm: 0,
        electricityKWh: 0,
        beefMeals: 0,
        vegetarianMeals: 0,
      });
      fetchActivities();
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await activitiesAPI.delete(id);
        fetchActivities();
      } catch (error) {
        console.error("Error deleting activity:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Activity Log</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          {showForm ? "Cancel" : "+ Add Activity"}
        </button>
      </div>

      {/* Add Activity Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Log New Activity</h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Car (km)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={formData.carKm}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    carKm: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Flight (km)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={formData.flightKm}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    flightKm: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Electricity (kWh)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={formData.electricityKWh}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    electricityKWh: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Beef Meals</label>
              <input
                type="number"
                min="0"
                value={formData.beefMeals}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    beefMeals: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Vegetarian Meals
              </label>
              <input
                type="number"
                min="0"
                value={formData.vegetarianMeals}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    vegetarianMeals: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="col-span-full">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Log Activity
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Activities List */}
      {loading ? (
        <div className="text-center py-8 text-gray-600">
          Loading activities...
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No activities logged yet. Click "Add Activity" to get started!
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">
                    {new Date(activity.date).toLocaleDateString()}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Total: {activity.emissions.total.toFixed(2)} kg CO2e
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(activity._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Transport</p>
                  <p className="font-semibold">
                    {activity.emissions.transport.toFixed(2)} kg
                  </p>
                  <p className="text-xs text-gray-500">
                    Car: {activity.transport.carKm}km, Flight:{" "}
                    {activity.transport.flightKm}km
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Energy</p>
                  <p className="font-semibold">
                    {activity.emissions.energy.toFixed(2)} kg
                  </p>
                  <p className="text-xs text-gray-500">
                    Electricity: {activity.energy.electricityKWh}kWh
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Diet</p>
                  <p className="font-semibold">
                    {activity.emissions.diet.toFixed(2)} kg
                  </p>
                  <p className="text-xs text-gray-500">
                    Beef: {activity.diet.beefMeals}, Veg:{" "}
                    {activity.diet.vegetarianMeals}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
