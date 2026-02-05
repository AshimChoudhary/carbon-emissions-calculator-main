import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ActivityLog from "./components/ActivityLog";
import AIRecommendations from "./components/AIRecommendations";

function AppContent() {
  const { isAuthenticated, logout, user } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!isAuthenticated) {
    return showRegister ? (
      <Register onToggle={() => setShowRegister(false)} />
    ) : (
      <Login onToggle={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Carbon Footprint Tracker</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {user?.name}!</span>
            <button
              onClick={logout}
              className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-4 px-2 border-b-2 transition ${
                activeTab === "dashboard"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("activities")}
              className={`py-4 px-2 border-b-2 transition ${
                activeTab === "activities"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Activity Log
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`py-4 px-2 border-b-2 transition ${
                activeTab === "ai"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              AI Recommendations
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "activities" && <ActivityLog />}
        {activeTab === "ai" && <AIRecommendations />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
