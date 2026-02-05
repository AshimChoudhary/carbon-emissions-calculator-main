# Problem Statement

## Project Overview

The **Carbon Footprint Calculator & AI Recommendation Tracker** is a comprehensive web application designed to help users monitor, analyze, and reduce their carbon emissions through data-driven insights and AI-powered recommendations.

## Objectives

1. **Track Daily Activities**: Enable users to log daily activities across three main categories:
   - Transportation (car and flight travel)
   - Energy consumption (electricity usage)
   - Diet (meal types)

2. **Calculate Carbon Emissions**: Automatically calculate carbon emissions based on standardized formulas:
   - Car (petrol): km × 0.12 kg CO2e
   - Flight (short-haul): km × 0.255 kg CO2e
   - Electricity: kWh × 0.5 kg CO2e
   - Beef meal: 6.0 kg CO2e per meal
   - Vegetarian meal: 1.5 kg CO2e per meal

3. **Visualize Data**: Provide interactive dashboards with:
   - Daily, weekly, and monthly emission trends
   - Category-wise breakdown (transport, energy, diet)
   - Period-over-period comparisons

4. **AI-Powered Recommendations**: Generate personalized sustainability recommendations using OpenAI's GPT model based on actual user data.

5. **User Management**: Implement secure authentication and authorization to ensure data privacy and enable multi-user support.

## Technical Requirements

### Backend

- **Technology**: Node.js with Express framework
- **Database**: MongoDB for data persistence
- **Authentication**: JWT-based authentication
- **API**: RESTful API endpoints
- **AI Integration**: OpenAI API for recommendations

### Frontend

- **Technology**: React with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js for data visualization
- **State Management**: React Context API

### Features

- User registration and login
- Protected routes with JWT authentication
- CRUD operations for activities
- Dashboard with aggregated statistics
- AI-powered recommendation engine
- Responsive UI design

## Success Criteria

1. Users can register and log in securely
2. Users can log daily activities with transport, energy, and diet data
3. Emissions are calculated automatically using correct formulas
4. Dashboard displays comprehensive statistics with visual charts
5. AI recommendations are personalized and actionable
6. Application is responsive and user-friendly
7. Code is clean, well-documented, and follows best practices
8. Git history shows incremental development with meaningful commits

## Target Users

- Individuals interested in tracking and reducing their carbon footprint
- Environmentally conscious users seeking actionable sustainability advice
- People wanting data-driven insights into their environmental impact

## Expected Outcomes

- Increased awareness of personal carbon emissions
- Data-driven decision making for lifestyle changes
- Quantifiable reduction in carbon footprint through recommended actions
- Better understanding of emission sources across different activity categories
