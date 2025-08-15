# AI-Powered Micro-Investment Advisor

A complete full-stack application designed to help low-income users in India save ₹10–₹50 daily and invest safely. Built with React Native frontend and Node.js backend, featuring AI-powered recommendations and multilingual support.

![App Preview](https://img.shields.io/badge/Platform-React%20Native-blue) ![Backend](https://img.shields.io/badge/Backend-Node.js-green) ![Languages](https://img.shields.io/badge/Languages-EN%7CHI%7CPB-orange)

## 🌟 Key Features

### 🎯 AI-Powered Savings
- **Smart Recommendations**: Daily savings amounts (₹10-₹50) based on spending patterns
- **Confidence Levels**: High/Medium/Low recommendations with explanations
- **Personalized Goals**: Tailored savings targets for individual users

### 🏦 Banking-Grade Design
- **Punjab & Sind Bank Inspired**: Professional, trustworthy aesthetics
- **Modern UI**: Clean cards, gradients, and intuitive navigation
- **Mobile-First**: Optimized for Indian smartphone users

### 🌐 Multilingual Support
- **English**: Comprehensive default language
- **Hindi (हिंदी)**: Full Devanagari script support
- **Punjabi (ਪੰਜਾਬੀ)**: Complete Gurmukhi script integration

### 🇮🇳 Indian Context
- **Local Merchants**: Big Bazaar, Swiggy, LIC Premium, Punjab Kirana Store
- **Currency**: Indian Rupee (₹) formatting and number systems
- **Cultural Relevance**: Designed for semi-urban and rural Indian users

## 📱 App Screens

### 1. Onboarding Flow (3 Screens)
- **Welcome**: Logo, tagline "Save a little, grow a lot", language toggle
- **Form**: Income frequency, rent, EMI, savings goals
- **Permissions**: SMS reading simulation, notification requests

### 2. Home Dashboard
- **Today's Safe Save**: AI recommendation with confidence indicator
- **Weekly Chart**: Interactive savings visualization
- **Impact Projection**: "Reach your goal X months sooner"
- **Quick Actions**: Save Now, Pause Saving, Set Goal

### 3. Transactions
- **Smart Categorization**: Automatic expense categorization
- **Indian Merchants**: Real merchant names and spending patterns
- **Category Editing**: Tap to recategorize transactions
- **Real-time Updates**: Immediate UI feedback

### 4. Financial Planner
- **Monthly Projections**: Income vs expenses analysis
- **Budget Management**: Interactive pie charts
- **Emergency Fund**: 6-month expense tracking
- **Savings Rate**: Personalized financial health metrics

### 5. Education Hub
- **Financial Tips**: Savings, budgeting, fraud prevention
- **Multilingual Content**: Tips in all supported languages
- **Progressive Learning**: Expandable tip cards with categories

## 🏗️ Architecture

```
micro-investment-advisor/
├── backend/                 # Node.js + Express API
│   ├── server.js           # Main server with all endpoints
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
├── frontend/               # React Native + Expo app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # State management
│   │   ├── screens/        # App screens
│   │   └── theme/          # Design system
│   ├── App.js              # Main app component
│   ├── package.json        # Frontend dependencies
│   └── README.md           # Frontend documentation
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ 
- **npm** or **yarn**
- **Expo CLI** (for mobile development)
- **Git** for version control

### 1. Clone the Repository
```bash
git clone <repository-url>
cd micro-investment-advisor
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:3000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
# Expo development server starts
```

### 4. Test the Integration
1. Start backend server first (`npm start` in backend/)
2. Start frontend (`npm start` in frontend/)
3. Open Expo app on your mobile device
4. Scan QR code to run the app

## 🔧 API Endpoints

### User Management
- `POST /user/setup` - User onboarding and profile setup
- `GET /health` - API health check

### Transactions
- `GET /transactions` - Fetch all transactions (auto-generates if empty)
- `POST /transactions/add` - Add manual transaction
- `PUT /transactions/:id` - Update transaction category
- `GET /transactions/week` - Weekly aggregated data for charts

### Financial Planning
- `GET /projection` - Monthly financial projections and AI insights
- `GET /budget` - Current budget settings
- `PUT /budget` - Update budget allocations
- `GET /safe-save` - AI-recommended daily savings amount

### Education
- `GET /tips?lang=hi` - Financial education tips in specified language

## 🎨 Design System

### Color Palette
```css
Primary: #006B3F (Emerald Green)
Secondary: #FFD700 (Golden Yellow)
Accent: #003153 (Navy Blue)
Background: #FAF8F0 (Warm Ivory)
Success: #10B981
Warning: #F59E0B
Error: #EF4444
```

### Typography
- **Headers**: Poppins/Nunito (600-700 weight)
- **Body**: Inter (400-500 weight)
- **Sizes**: 12px-32px responsive scale

## 🤖 AI Logic

### Safe Save Calculation
The AI considers multiple factors:
- **Daily Spending Patterns**: Analyzes recent transaction history
- **Income vs Expense Ratio**: Calculates available surplus
- **Confidence Assessment**: High (₹40-50), Medium (₹25-35), Low (₹10-20)
- **Seasonal Adjustments**: Accounts for spending variations

### Transaction Categorization
- **Essential** (50%): Daily necessities, utilities, transport
- **Discretionary** (25%): Entertainment, dining, shopping
- **Debt** (15%): EMIs, loan payments, credit cards
- **Income** (10%): Salary, freelance, other earnings

## 🔒 Security & Privacy

- **No Sensitive Storage**: No financial data stored locally
- **API Security**: HTTPS communication with error handling
- **Permission Transparency**: Clear explanations for all permissions
- **Data Minimization**: Only essential data collection
- **User Consent**: Explicit opt-in for all features

## 🌍 Localization

### Language Support
- **English**: Default, comprehensive coverage
- **Hindi**: Complete UI translation with proper script rendering
- **Punjabi**: Full Gurmukhi support for rural Punjab users

### Cultural Adaptation
- **Merchant Names**: Locally relevant store and service names
- **Currency Format**: ₹ symbol with Indian number formatting
- **Regional Context**: Savings advice tailored for Indian financial habits

## 🔄 Data Flow

1. **App Launch**: Health check → Load transactions → Initialize dashboard
2. **User Interaction**: Optimistic UI updates → API calls → State refresh
3. **Language Change**: Update UI text → Fetch localized content
4. **Transaction Edit**: Immediate UI feedback → Backend update → Refetch data
5. **Savings Action**: Confirmation dialog → Add transaction → Update projections

## 📊 Sample Data

The backend generates realistic fake data including:
- **Indian Merchants**: 18 different merchants across categories
- **Realistic Amounts**: Category-appropriate transaction amounts
- **Date Distribution**: Last 30 days with random distribution
- **Category Weights**: Balanced representation of spending patterns

## 🧪 Testing

### Manual Testing Checklist
- [ ] Complete onboarding flow in all languages
- [ ] Language switching functionality
- [ ] Transaction category editing
- [ ] Budget updates and persistence
- [ ] Chart data visualization
- [ ] API error handling
- [ ] Navigation between all screens
- [ ] Responsive design on different devices

### Device Compatibility
- **Android**: 6.0+ (API level 23+)
- **iOS**: 11.0+
- **Screen Sizes**: 320px - 428px width
- **Network**: Works with 3G/4G/WiFi

## 🚀 Deployment

### Backend Deployment
1. **Heroku**: Easy Node.js deployment
2. **Railway**: Modern alternative to Heroku
3. **DigitalOcean**: VPS deployment with PM2
4. **AWS EC2**: Scalable cloud deployment

### Frontend Deployment
1. **Expo Build**: Generate APK/IPA files
2. **EAS Build**: Expo Application Services
3. **Play Store**: Android app distribution
4. **App Store**: iOS app distribution

## 🔮 Future Enhancements

### Phase 1 (MVP+)
- **Offline Support**: Local data caching and synchronization
- **Push Notifications**: Daily savings reminders and tips
- **Advanced Charts**: More detailed spending analytics

### Phase 2 (Growth)
- **Bank Integration**: Real transaction syncing via APIs
- **Investment Recommendations**: Mutual fund suggestions
- **Social Features**: Savings challenges and community

### Phase 3 (Scale)
- **AI Enhancement**: Machine learning for better predictions
- **Voice Interface**: Hindi/Punjabi voice commands
- **Rural Banking**: Integration with regional banks

## 👥 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow React Native and Node.js best practices
- Maintain multilingual support for new features
- Test on both Android and iOS
- Update documentation for new components
- Ensure responsive design across devices

## 📄 License

MIT License - Built for educational and demonstration purposes.

## 🤝 Support

For questions, issues, or contributions:
- **Issues**: Use GitHub Issues for bug reports
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact the development team

---

**Built with ❤️ for financial inclusion in India**

*Empowering every Indian to save, invest, and grow their financial future, one rupee at a time.*