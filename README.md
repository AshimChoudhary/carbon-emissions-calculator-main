# 🌍 Carbon Footprint Calculator with AI Recommendations

A full-stack web application that helps users track their carbon emissions and get personalized AI-powered sustainability recommendations.

![Carbon Emissions Calculator](./img/carbon.png)

## ✨ Features

- 🔐 **User Authentication**: Secure JWT-based authentication
- 📊 **Activity Tracking**: Log daily transport, energy, and diet activities  
- 📈 **Dashboard**: Visualize emissions with interactive charts
- 🤖 **AI Recommendations**: Get personalized sustainability tips using **Google Gemini (FREE)** or OpenAI
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🔄 **Real-time Calculations**: Accurate carbon footprint calculations

## 🆓 AI Powered by Google Gemini (FREE)

This project uses **Google Gemini API** which is **completely free** with a generous quota of 60 requests per minute. No credit card required!

**Alternative**: You can also use OpenAI if you prefer (paid option).

See [docs/ai-alternatives.md](docs/ai-alternatives.md) for more free AI options.

## 🛠️ Tech Stack

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- Google Gemini AI / OpenAI (optional)

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

Edit \`.env\` with your settings (use Gemini for FREE AI):

\`\`\`env
AI_PROVIDER=gemini
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

## 📖 Documentation

- [Setup Guide](docs/setup-guide.md)
- [Testing Guide](docs/testing-guide.md)
- [Free AI Alternatives](docs/ai-alternatives.md) ⭐
- [Problem Statement](docs/problem-statement.md)
- [AI Usage Report](docs/ai-usage-report.md)

## 📄 License

MIT License

---

**Made with ❤️ for a sustainable future**
