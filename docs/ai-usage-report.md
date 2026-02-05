# AI Usage Report

## Overview

This document details how AI (specifically OpenAI's GPT-3.5-turbo model) is integrated into the Carbon Footprint Calculator application to provide personalized sustainability recommendations.

## AI Integration Points

### 1. Recommendation Generation

**Location**: `/backend/controllers/aiController.js`

**Purpose**: Generate personalized carbon reduction recommendations based on user's actual activity data.

**Implementation**:
- Aggregates user's carbon emission data from the last 30 days
- Calculates total emissions across transport, energy, and diet categories
- Computes category-wise percentages to identify top emission sources
- Sends structured data to OpenAI API with a specialized prompt

### 2. AI Prompt Design

**Prompt Structure**:
```
You are a sustainability expert.
Analyze the following user's carbon emission data:

[USER DATA SUMMARY INCLUDING:]
- Total Carbon Emissions (Last 30 days)
- Average Daily Emissions
- Breakdown by Category (Transport, Energy, Diet)
- Percentage contribution of each category

1. Identify top emission sources.
2. Suggest 5 realistic actions.
3. Quantify impact where possible.
4. Keep advice practical and concise.
```

**Key Design Decisions**:
- **Structured Input**: Data is formatted in a clear, consistent structure
- **Specific Instructions**: The prompt explicitly requests 5 actionable recommendations
- **Quantification Requirement**: AI is asked to quantify impact when possible
- **Practical Focus**: Emphasis on realistic, implementable actions
- **Conciseness**: Ensures responses are digestible and not overwhelming

### 3. Model Configuration

**Model**: `gpt-3.5-turbo`
- **Rationale**: Balance between cost-efficiency and response quality
- **Temperature**: 0.7 (moderate creativity while maintaining accuracy)
- **Max Tokens**: 500 (sufficient for detailed recommendations without excessive verbosity)

### 4. Data Privacy & Security

**User Data Handling**:
- Only aggregated statistics are sent to OpenAI (no personally identifiable information)
- Individual activity records are summarized before transmission
- API keys are stored securely in environment variables
- Recommendations are generated on-demand, not stored permanently

## AI Response Processing

### Response Structure
The AI generates recommendations in natural language format including:

1. **Top Emission Source Identification**
   - Analyzes percentage breakdown
   - Highlights primary contributors

2. **Actionable Recommendations**
   - 5 specific actions tailored to user's data
   - Categorized by impact area (transport, energy, diet)
   - Includes quantified impact estimates where applicable

3. **Practical Advice**
   - Focuses on achievable changes
   - Considers real-world constraints
   - Provides context and reasoning

### Example Output Format

```
Top Emission Sources:
- Transport: 45% of total emissions
- Diet: 35% of total emissions
- Energy: 20% of total emissions

Recommendations:

1. **Reduce Car Usage**: Your car travel accounts for 45% of emissions. 
   Consider carpooling or public transport 2-3 days per week.
   Potential savings: ~15 kg CO2e per week

2. **Transition to Plant-Based Meals**: Replace 2-3 beef meals per week 
   with vegetarian options.
   Potential savings: ~9 kg CO2e per week

[...]
```

## Benefits of AI Integration

### 1. Personalization
- Recommendations are based on actual user behavior, not generic advice
- Prioritizes areas with highest impact for each individual user

### 2. Scalability
- AI can generate unlimited unique recommendations
- Adapts to changing user patterns automatically

### 3. Educational Value
- Helps users understand emission sources
- Provides quantified impact of suggested changes
- Builds environmental awareness

### 4. Actionability
- Recommendations are specific and implementable
- Focuses on practical lifestyle changes
- Respects user's real-world constraints

## Limitations & Future Improvements

### Current Limitations
1. **API Dependency**: Requires active OpenAI API key and internet connection
2. **Cost**: Each recommendation generation incurs API costs
3. **Response Variability**: Slight variations in responses for similar data
4. **Language**: Currently supports English only

### Potential Improvements
1. **Caching**: Store recommendations and regenerate only when user data changes significantly
2. **Multi-language Support**: Extend prompt to support multiple languages
3. **Fine-tuning**: Create a custom fine-tuned model specifically for carbon recommendations
4. **Feedback Loop**: Allow users to rate recommendations and improve over time
5. **Comparative Analysis**: Add peer comparison ("You emit X% less than average user")
6. **Goal Setting**: AI-assisted carbon reduction goal setting and tracking

## API Usage Metrics

**Typical Request**:
- Input Tokens: ~150-200 tokens (user data + prompt)
- Output Tokens: ~300-400 tokens (recommendations)
- Total Cost per Request: ~$0.001-0.002 (based on GPT-3.5-turbo pricing)

**Rate Limiting**:
- Currently no built-in rate limiting
- Recommended: Implement user-level rate limiting (e.g., max 5 requests per day)

## Error Handling

**AI Service Failures**:
1. **API Key Invalid**: Returns user-friendly error message
2. **Network Timeout**: Graceful degradation with retry logic
3. **Rate Limit Exceeded**: Informs user to try again later
4. **Insufficient Data**: Requires minimum 1 logged activity in last 30 days

## Ethical Considerations

1. **Data Transparency**: Users are informed that their data is used for recommendations
2. **No Personal Data Sharing**: Only aggregated statistics sent to OpenAI
3. **Opt-in**: Recommendations are generated only when user explicitly requests them
4. **Accuracy Disclaimer**: AI recommendations are suggestions, not guarantees
5. **Environmental Focus**: AI is used to promote positive environmental behavior

## Conclusion

The AI integration in this application demonstrates practical use of large language models for sustainability. By combining user-specific data with AI-powered analysis, the application provides personalized, actionable insights that can drive meaningful behavioral change and environmental impact reduction.

The implementation prioritizes user privacy, cost-efficiency, and practical utility while maintaining the flexibility to evolve with advancing AI capabilities.
