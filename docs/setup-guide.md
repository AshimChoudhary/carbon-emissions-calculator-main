# Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or cloud instance)
- Google Gemini API Key (FREE)

## Installation Steps

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd carbon-emissions-calculator-main
\`\`\`

### 2. Install Dependencies

\`\`\`bash
# Backend dependencies
npm install

# Frontend dependencies
cd frontend
npm install
cd ..
\`\`\`

### 3. Environment Configuration

Create a \`.env\` file in the root directory:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\` and configure:

- \`MONGODB_URI\`: Your MongoDB connection string
- \`JWT_SECRET\`: A secure random string for JWT signing
- \`GEMINI_API_KEY\`: Your Google Gemini API key from https://makersuite.google.com/app/apikey

### 4. Get Google Gemini API Key (FREE)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your \`.env\` file

### 5. Start MongoDB

\`\`\`bash
# If using local MongoDB
mongod
\`\`\`

### 6. Run the Application

**Development Mode:**

\`\`\`bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
\`\`\`

**Production Mode:**

\`\`\`bash
# Build frontend
cd frontend
npm run build
cd ..

# Start backend
npm start
\`\`\`

### 7. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - Login user

### Activities
- \`GET /api/activities\` - Get user activities
- \`POST /api/activities\` - Create activity
- \`PUT /api/activities/:id\` - Update activity
- \`DELETE /api/activities/:id\` - Delete activity

### Dashboard
- \`GET /api/activities/dashboard/summary\` - Get emission summary
- \`GET /api/activities/dashboard/trends\` - Get trend data

### AI Recommendations
- \`GET /api/ai/recommendations\` - Get personalized AI recommendations

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in \`.env\`

### Gemini API Issues
- Verify API key is valid
- Check API quota (60 requests/min free tier)

### Port Already in Use
- Change \`PORT\` in \`.env\`
- Kill process using the port: \`lsof -ti:5000 | xargs kill\`

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Recharts
- **AI**: Google Gemini (FREE)
- **Authentication**: JWT
