# 🌍 Carbon Footprint Calculator with AI Recommendations

A full-stack web application that helps users track their carbon emissions and get personalized AI-powered sustainability recommendations using **Google Gemini (100% FREE)**.

![Carbon Emissions Calculator](./img/carbon.png)

## ✨ Features

- 🔐 **User Authentication**: Secure JWT-based authentication
- 📊 **Activity Tracking**: Log daily transport, energy, and diet activities  
- 📈 **Dashboard**: Visualize emissions with interactive charts
- 🤖 **AI Recommendations**: Get personalized sustainability tips using Google Gemini AI (FREE)
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🔄 **Real-time Calculations**: Accurate carbon footprint calculations

## 🆓 AI Powered by Google Gemini (FREE)

This project uses **Google Gemini API** which is **completely free** with a generous quota of 60 requests per minute. No credit card required!

## 🛠️ Tech Stack

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- Google Gemini AI

### Frontend
- React 18 with TypeScript
- Vite
- Tailwind CSS
- Recharts for data visualization
- Axios for API calls

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API key (FREE - [Get it here](https://makersuite.google.com/app/apikey))

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/AshimChoudhary/carbon-emissions-calculator-main.git
cd carbon-emissions-calculator-main
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
cd frontend
npm install
cd ..
\`\`\`

### 3. Get Your FREE Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

### 4. Configure Environment

\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\` and add your Gemini API key:

\`\`\`env
GEMINI_API_KEY=your-gemini-api-key-here
\`\`\`

### 5. Run the Application

\`\`\`bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
\`\`\`

Visit: http://localhost:5173

## 📊 Carbon Emission Formulas

| Activity Type | Formula |
|--------------|---------|
| Car (petrol) | km × 0.12 kg CO₂ |
| Flight (short-haul) | km × 0.255 kg CO₂ |
| Electricity | kWh × 0.5 kg CO₂ |
| Beef meal | 6.0 kg CO₂ per meal |
| Vegetarian meal | 1.5 kg CO₂ per meal |

## 📖 Documentation

- [Setup Guide](docs/setup-guide.md)
- [Testing Guide](docs/testing-guide.md)
- [AI Alternatives](docs/ai-alternatives.md)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Activities
- `GET /api/activities` - Get all user activities
- `POST /api/activities` - Create new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Dashboard
- `GET /api/activities/dashboard/summary` - Get emission summary
- `GET /api/activities/dashboard/trends` - Get trend data

### AI Recommendations
- `GET /api/ai/recommendations` - Get personalized AI tips

## 📄 License

MIT License

---

**Made with ❤️ for a sustainable future**
