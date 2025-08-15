# Micro-Investment Advisor Backend API

A Node.js + Express.js backend for the AI-Powered Micro-Investment Advisor app targeting low-income users in India.

## Features

- 🏦 **Indian Context**: Merchants, amounts, and language support tailored for Indian users
- 💰 **Fake Transaction Generator**: Realistic transaction data with Indian merchants
- 📊 **Analytics**: Weekly spending patterns and monthly projections
- 🌐 **Multilingual**: Support for English, Hindi, and Punjabi
- 🤖 **AI Recommendations**: Smart daily savings suggestions based on spending patterns

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

The API will be available at `http://localhost:3000`

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

### Financial Planning
- **GET** `/projection` - Monthly financial projections and AI insights
- **GET** `/budget` - Get current budget settings
- **PUT** `/budget` - Update budget allocations
- **GET** `/safe-save` - Get today's AI-recommended safe save amount

### Education
- **GET** `/tips?lang=hi` - Get financial education tips in specified language

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