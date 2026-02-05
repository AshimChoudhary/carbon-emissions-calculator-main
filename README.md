# Carbon Footprint Calculator & AI Recommendation Tracker

![Carbon Emissions Calculator](./img/carbon.png)

## Overview

A comprehensive full-stack web application for tracking, analyzing, and reducing personal carbon emissions with AI-powered recommendations. Users can log daily activities across transport, energy, and diet categories, visualize their carbon footprint through interactive dashboards, and receive personalized sustainability advice powered by OpenAI.

## Features

### 🔐 Authentication & User Management
- Secure user registration and login
- JWT-based authentication
- Protected routes and API endpoints
- Multi-user support with data isolation

### 📊 Activity Tracking
- Log daily activities:
  - **Transport**: Car travel (km), Flight travel (km)
  - **Energy**: Electricity consumption (kWh)
  - **Diet**: Beef meals, Vegetarian meals
- Edit and delete historical entries
- Automatic carbon emission calculations

### 📈 Interactive Dashboard
- Visual analytics with Chart.js
- Period selection (Daily/Weekly/Monthly)
- Category breakdown (Transport, Energy, Diet)
- Period-over-period comparison
- Real-time statistics

### 🤖 AI-Powered Recommendations
- Personalized sustainability tips using OpenAI GPT-3.5-turbo
- Based on actual user activity data (last 30 days)
- Quantified impact estimates
- Actionable and practical advice

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcryptjs
- **AI Integration**: OpenAI API
- **Environment**: dotenv

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **HTTP Client**: Axios
- **Build Tool**: Vite

## Carbon Calculation Formulas

| Activity Type | Formula | Example |
|--------------|---------|---------|
| Car (petrol) | km × 0.12 kg CO2e | 100 km = 12 kg CO2e |
| Flight (short-haul) | km × 0.255 kg CO2e | 500 km = 127.5 kg CO2e |
| Electricity | kWh × 0.5 kg CO2e | 100 kWh = 50 kg CO2e |
| Beef meal | 6.0 kg CO2e per meal | 1 meal = 6 kg CO2e |
| Vegetarian meal | 1.5 kg CO2e per meal | 1 meal = 1.5 kg CO2e |

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenAI API Key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/carbon-emissions-calculator.git
cd carbon-emissions-calculator
```

### 2. Backend Setup
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables in .env:
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/carbon-emissions
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
OPENAI_API_KEY=your-openai-api-key
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Start MongoDB
```bash
# If using local MongoDB
mongod
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
npm start
# Server runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

## Project Structure

```
carbon-emissions-calculator/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── activityController.js # Activity CRUD & stats
│   │   └── aiController.js       # AI recommendations
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   ├── errorHandler.js       # Error handling
│   │   └── validation.js         # Input validation
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Activity.js           # Activity schema
│   └── routes/
│       ├── auth.js               # Auth routes
│       ├── activities.js         # Activity routes
│       └── ai.js                 # AI routes
├── frontend/
│   └── src/
│       ├── api/
│       │   └── index.ts          # API client
│       ├── components/
│       │   ├── Login.tsx         # Login page
│       │   ├── Register.tsx      # Registration page
│       │   ├── Dashboard.tsx     # Analytics dashboard
│       │   ├── ActivityLog.tsx   # Activity management
│       │   └── AIRecommendations.tsx # AI recommendations
│       ├── context/
│       │   └── AuthContext.tsx   # Auth state management
│       └── App.tsx               # Main app component
├── docs/
│   ├── problem-statement.md      # Project requirements
│   └── ai-usage-report.md        # AI integration details
├── server.js                      # Express server entry
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Activities
- `GET /api/activities` - Get all user activities
- `POST /api/activities` - Create new activity
- `GET /api/activities/:id` - Get single activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity
- `GET /api/activities/dashboard/stats?period=daily` - Get dashboard statistics

### AI Recommendations
- `GET /api/ai/recommendations` - Get AI-powered recommendations

## Usage Guide

### 1. Register/Login
- Create an account with name, email, and password
- Login with credentials
- JWT token stored in localStorage

### 2. Log Activities
- Click "Activity Log" tab
- Click "+ Add Activity"
- Enter data for transport, energy, and diet
- Emissions calculated automatically

### 3. View Dashboard
- Click "Dashboard" tab
- Select period (Daily/Weekly/Monthly)
- View statistics and charts
- Compare with previous periods

### 4. Get AI Recommendations
- Click "AI Recommendations" tab
- Click "Get Recommendations"
- View personalized sustainability tips
- Implement suggested actions

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
# Backend (if needed)
npm run build

# Frontend
cd frontend
npm run build
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Backend server port | 3001 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/carbon-emissions |
| JWT_SECRET | Secret for JWT signing | random-secure-string |
| JWT_EXPIRE | JWT expiration time | 7d |
| OPENAI_API_KEY | OpenAI API key | sk-... |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5173 |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Carbon emission formulas based on standard environmental impact metrics
- OpenAI for AI-powered recommendations
- Chart.js for data visualization
- MongoDB for database solutions

## Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with 💚 for a sustainable future**
