# Micro-Investment Advisor Backend API

A Node.js + Express.js backend with integrated AI/ML service for the AI-Powered Micro-Investment Advisor app targeting low-income users in India.

## Features

- 🏦 **Indian Context**: Merchants, amounts, and language support tailored for Indian users
- 💰 **Fake Transaction Generator**: Realistic transaction data with Indian merchants
- 📊 **Analytics**: Weekly spending patterns and monthly projections
- 🌐 **Multilingual**: Support for English, Hindi, and Punjabi
- 🤖 **AI/ML Integration**: Machine learning models for predictions and analysis
- 🧠 **Smart Recommendations**: ML-powered daily savings suggestions
- 📈 **Time Series Forecasting**: Prophet-based goal achievement predictions
- 🔤 **NLP Processing**: Hugging Face transformers for merchant categorization
- 💬 **LLM-Powered Tips**: OpenAI integration for personalized financial advice

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### AI/ML Setup (Optional but Recommended)

```bash
# Setup Python AI service
./setup_ai.sh

# Set OpenAI API key for LLM features (optional)
export OPENAI_API_KEY="your-key-here"
```

### Run Services

**Option 1: Start both services together**
```bash
./start_services.sh
```

**Option 2: Start manually**
```bash
# Terminal 1: Start AI service
source ai_env/bin/activate
python ai_service.py

# Terminal 2: Start Node.js API
npm start
```

The API will be available at:
- Node.js API: `http://localhost:3000`
- AI Service: `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/health` - API health status

### User Management
- **POST** `/user/setup` - Setup user profile and preferences
  ```json
  {
    "name": "Rajesh Kumar",
    "incomeFrequency": "monthly",
    "rent": 8000,
    "emi": 2000,
    "goal": 50000,
    "language": "hi"
  }
  ```

### Transactions
- **GET** `/transactions` - Get all transactions (auto-generates if empty)
- **POST** `/transactions/add` - Add manual transaction
- **PUT** `/transactions/:id` - Update transaction category
- **GET** `/transactions/week` - Get weekly aggregated data for charts
- **POST** `/transactions/generate-fresh` - Generate 20-25 fresh unique transactions

### Financial Planning
- **GET** `/projection` - Monthly financial projections and AI insights
- **GET** `/budget` - Get current budget settings
- **PUT** `/budget` - Update budget allocations
- **GET** `/safe-save` - Get today's AI-recommended safe save amount

### Education
- **GET** `/tips?lang=hi` - Get financial education tips (AI-powered when available)

### AI/ML Endpoints
- **POST** `/ai/forecast-goal` - Time series forecasting for goal achievement
- **POST** `/ai/categorize-merchant` - NLP-powered merchant categorization
- **POST** `/ai/analyze-patterns` - ML spending pattern analysis
- **GET** `/ai/health` - AI service health check

## Sample Data

### Merchants
The API includes realistic Indian merchants across categories:
- **Essential**: Big Bazaar, Punjab Kirana Store, Mother Dairy, Reliance Fresh
- **Discretionary**: Swiggy, Zomato, BookMyShow, Amazon, Flipkart
- **Debt**: LIC Premium, HDFC Bank EMI, Credit Card Payment
- **Income**: Salary Credit, Freelance Payment

### Transaction Categories
- **Essential** (50% weight): Daily necessities, utilities
- **Discretionary** (25% weight): Entertainment, shopping
- **Debt** (15% weight): EMIs, loan payments
- **Income** (10% weight): Salary, freelance work

### Fresh Transaction Generation
- **Count**: 20-25 transactions per generation
- **Uniqueness**: Prevents duplicate merchant-time combinations
- **Realistic Distribution**: Maintains proper category weights
- **Date Range**: Last 30 days with random distribution

## AI Logic

### Safe Save Calculation
The AI considers:
- Daily spending patterns
- Income vs expense ratio
- Historical transaction analysis
- Confidence levels (High/Medium/Low)

### Recommendations
- High confidence: Can save ₹40-50 daily
- Medium confidence: Can save ₹25-35 daily  
- Low confidence: Can save ₹10-20 daily

## Multilingual Support

Supported languages:
- **en**: English
- **hi**: Hindi (हिंदी)
- **pb**: Punjabi (ਪੰਜਾਬੀ)

Education tips and user interface text available in all three languages.

## Data Storage

Currently uses in-memory storage for hackathon purposes. Ready for database integration:
- User profiles
- Transaction history
- Budget settings
- Preference storage

## Architecture

```
├── server.js          # Main Express server
├── package.json       # Dependencies and scripts
└── README.md         # This file
```

## Environment Variables

```bash
PORT=3000              # Server port (default: 3000)
```

## Development

The server includes:
- CORS enabled for frontend integration
- JSON body parsing
- Error handling
- Automatic transaction generation
- Hot reload with nodemon

## Production Considerations

For production deployment:
1. Add database integration (MongoDB/PostgreSQL)
2. Implement proper authentication
3. Add request rate limiting
4. Set up logging and monitoring
5. Add data validation middleware
6. Implement caching for frequently accessed data

## License

MIT License - Built for educational and demonstration purposes.