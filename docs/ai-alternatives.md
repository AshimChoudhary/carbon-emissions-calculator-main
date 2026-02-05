# Free AI Alternatives to OpenAI

This document lists free alternatives to OpenAI API for generating carbon footprint recommendations.

---

## ✅ Currently Supported

### 1. **Google Gemini API** (Recommended - FREE)

**Status**: ✅ Implemented in this project

**Free Tier**:

- 60 requests per minute
- Completely FREE
- No credit card required

**How to Get API Key**:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key

**Setup**:

```bash
# In .env file
AI_PROVIDER=gemini
GEMINI_API_KEY=your-gemini-api-key-here
```

**Pros**:

- ✅ Generous free tier
- ✅ No credit card needed
- ✅ Good quality responses
- ✅ Fast response time

**Cons**:

- ⚠️ Requires Google account

---

### 2. **OpenAI API** (Optional - PAID)

**Status**: ✅ Also supported (fallback option)

**Pricing**: Pay-as-you-go

- GPT-3.5-turbo: ~$0.002 per request

**How to Get API Key**:

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create account (requires credit card)
3. Generate API key

**Setup**:

```bash
# In .env file
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-openai-api-key-here
```

---

## 🔧 Other Free Alternatives (Not Yet Implemented)

### 3. **Hugging Face Inference API**

**Free Tier**: 30,000 requests/month

**How to Use**:

```bash
npm install @huggingface/inference
```

```javascript
const { HfInference } = require("@huggingface/inference");
const hf = new HfInference(process.env.HF_API_KEY);

const result = await hf.textGeneration({
  model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  inputs: prompt,
  parameters: { max_new_tokens: 500 },
});
```

**Get API Key**: [Hugging Face Settings](https://huggingface.co/settings/tokens)

---

### 4. **Ollama** (100% Free - Local)

**Pros**: Completely free, runs offline, no API limits

**Cons**: Requires local installation, uses system resources

**Setup**:

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Download a model
ollama pull llama2

# Run server
ollama serve
```

**Usage**:

```javascript
const response = await fetch("http://localhost:11434/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "llama2",
    prompt: prompt,
    stream: false,
  }),
});
```

---

### 5. **Cohere API**

**Free Tier**: 100 requests/minute (trial)

**Get API Key**: [Cohere Dashboard](https://dashboard.cohere.com/)

**Usage**:

```bash
npm install cohere-ai
```

```javascript
const { CohereClient } = require("cohere-ai");
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

const response = await cohere.generate({
  prompt: prompt,
  max_tokens: 500,
});
```

---

### 6. **Together AI**

**Free Tier**: $25 free credits

**Get API Key**: [Together AI](https://api.together.xyz/)

**Usage**: Similar to OpenAI API format

---

## 📊 Comparison Table

| Provider          | Cost       | Free Tier   | Setup Difficulty | Quality    |
| ----------------- | ---------- | ----------- | ---------------- | ---------- |
| **Google Gemini** | FREE       | 60 req/min  | ⭐ Easy          | ⭐⭐⭐⭐   |
| **Ollama**        | FREE       | Unlimited   | ⭐⭐⭐ Medium    | ⭐⭐⭐     |
| **Hugging Face**  | FREE       | 30k/month   | ⭐⭐ Medium      | ⭐⭐⭐⭐   |
| **Cohere**        | FREE Trial | 100 req/min | ⭐ Easy          | ⭐⭐⭐⭐   |
| **Together AI**   | FREE Trial | $25 credits | ⭐⭐ Medium      | ⭐⭐⭐⭐   |
| **OpenAI**        | PAID       | None        | ⭐ Easy          | ⭐⭐⭐⭐⭐ |

---

## 🎯 Recommendation

**For this project, use Google Gemini** because:

1. ✅ Completely free
2. ✅ No credit card required
3. ✅ Easy to set up
4. ✅ Good quality responses
5. ✅ Already integrated in the code

---

## 🚀 How to Switch Providers

Simply change the `AI_PROVIDER` in your `.env` file:

```bash
# Use Google Gemini (FREE)
AI_PROVIDER=gemini
GEMINI_API_KEY=your-key-here

# OR use OpenAI (PAID)
AI_PROVIDER=openai
OPENAI_API_KEY=your-key-here
```

The code automatically detects and uses the configured provider!

---

## 📝 Notes

- All providers generate similar quality recommendations
- Google Gemini is recommended for development and production
- OpenAI can be used if you already have credits
- For offline/privacy needs, consider Ollama (local)
