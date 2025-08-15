# Micro-Investment Advisor Frontend

A React Native app for AI-Powered Micro-Investment Advisor targeting low-income users in India.

## Features

- 🎯 **Onboarding Flow**: 3-screen user setup with multilingual support
- 🏠 **Home Dashboard**: AI savings recommendations, weekly charts, quick actions
- 💳 **Transactions**: View and categorize transactions with Indian merchant names
- 📊 **Planner**: Budget management, projections, emergency fund tracking
- 📚 **Education Hub**: Financial tips in English, Hindi, and Punjabi
- 🌐 **Multilingual**: Full support for EN/HI/PB with language toggle
- 🎨 **Punjab & Sind Bank Theme**: Professional banking aesthetics

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **Charts**: React Native Chart Kit
- **State Management**: React Context API
- **HTTP Client**: Axios
- **UI Components**: Custom components with linear gradients
- **Icons**: Expo Vector Icons (Ionicons)

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Card.js         # Gradient card component
│   │   └── Header.js       # App header with language toggle
│   ├── context/            # State management
│   │   └── AppContext.js   # Main app context with API integration
│   ├── screens/            # App screens
│   │   ├── OnboardingWelcome.js
│   │   ├── OnboardingForm.js
│   │   ├── OnboardingPermissions.js
│   │   ├── HomeScreen.js
│   │   ├── TransactionsScreen.js
│   │   ├── PlannerScreen.js
│   │   └── EducationScreen.js
│   └── theme/              # Design system
│       └── colors.js       # Punjab & Sind Bank inspired colors
├── App.js                  # Main app component with navigation
├── app.json               # Expo configuration
├── babel.config.js        # Babel configuration
└── package.json           # Dependencies and scripts
```

## Design System

### Color Palette (Punjab & Sind Bank Inspired)
- **Primary**: Emerald Green (#006B3F)
- **Secondary**: Golden Yellow (#FFD700)  
- **Accent**: Navy Blue (#003153)
- **Background**: Warm Ivory (#FAF8F0)
- **Success**: #10B981
- **Warning**: #F59E0B
- **Error**: #EF4444

### Typography
- **Headers**: Poppins/Nunito (weight: 600-bold)
- **Body**: Inter (weight: 400-500)
- **Sizes**: 12px-32px responsive scale

### Components
- **Cards**: Rounded corners (16px), subtle shadows, gradient headers
- **Buttons**: Linear gradients, rounded (25px for primary actions)
- **Charts**: Minimalist design with brand colors
- **Icons**: Ionicons with consistent sizing (16px-32px)

## Screens Overview

### 1. Onboarding Flow
- **Welcome**: Logo, tagline, language selection, feature highlights
- **Form**: User details (income, rent, EMI, goals) with validation
- **Permissions**: SMS/notification permissions with privacy assurance

### 2. Home Dashboard
- **Safe Save Card**: AI-recommended daily savings amount with confidence
- **Weekly Chart**: Line chart showing savings pattern
- **Impact Card**: Goal achievement projection
- **Quick Actions**: Save Now, Pause, Set Goal buttons
- **Recent Insights**: Spending analysis and tips

### 3. Transactions
- **Transaction List**: Merchant name, amount, date, category
- **Category Editing**: Modal with visual category selection
- **Indian Context**: Merchants like Big Bazaar, Swiggy, LIC Premium
- **Real-time Updates**: Optimistic UI updates

### 4. Planner
- **Monthly Projection**: Income, expenses, savings rate overview
- **Budget Planning**: Interactive pie chart with editable budgets
- **Emergency Fund**: Progress tracking with 6-month goal
- **Visual Analytics**: Charts and progress bars

### 5. Education Hub
- **Financial Tips**: Expandable cards with category-based tips
- **Multilingual Content**: Tips in EN/HI/PB
- **Categories**: Savings, Budgeting, Fraud Prevention, Planning, Investment
- **Reading Stats**: Tip count, categories, estimated reading time

## API Integration

### Context-Based State Management
```javascript
const { 
  user, transactions, weeklyData, projection, 
  budgets, tips, safeSave, language,
  api, formatCurrency, formatDate 
} = useApp();
```

### API Methods
- `api.setupUser()` - User onboarding
- `api.getTransactions()` - Fetch transaction list
- `api.addTransaction()` - Manual transaction entry
- `api.updateTransaction()` - Category updates
- `api.getWeeklyData()` - Chart data
- `api.getProjection()` - Financial projections
- `api.getBudgets()` - Budget settings
- `api.getTips()` - Educational content
- `api.getSafeSave()` - AI recommendations

## Multilingual Support

### Language Toggle
- Header component with globe icon
- Cycles through EN → HI → PB
- Persists user preference
- Updates API calls for localized content

### Supported Languages
- **English**: Default, comprehensive coverage
- **Hindi**: Full UI translation with Devanagari script
- **Punjabi**: Complete Gurmukhi script support

### Content Localization
- Static UI text translated per screen
- Dynamic content (tips, categories) from API
- Currency formatting (₹ symbol, Indian number format)
- Date formatting (DD MMM YYYY)

## Installation & Setup

### Prerequisites
- Node.js 16+
- Expo CLI
- Android Studio / Xcode (for device testing)

### Quick Start
```bash
cd frontend
npm install
npm start
```

### Development Commands
```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
```

### Environment Setup
1. Install Expo CLI: `npm install -g @expo/cli`
2. Install dependencies: `npm install`
3. Update API base URL in `src/context/AppContext.js`
4. Start development server: `npm start`

## Key Features Implementation

### AI Savings Recommendations
- Dynamic daily amount based on spending patterns
- Confidence levels (High/Medium/Low) with color coding
- Contextual messages explaining recommendations

### Interactive Charts
- Weekly savings line chart with smooth animations
- Budget pie chart with editable segments
- Progress bars for emergency fund tracking
- Responsive design for different screen sizes

### Transaction Management
- Real-time category updates with optimistic UI
- Indian merchant recognition and categorization
- Visual feedback with icons and color coding
- Smooth modal animations for category selection

### Responsive Design
- Mobile-first approach with flexible layouts
- Consistent spacing and typography scale
- Touch-friendly interface elements
- Accessibility considerations

## Performance Optimizations

- Context-based state management for minimal re-renders
- Optimistic UI updates for better perceived performance
- Image and icon optimization
- Lazy loading for large lists
- Efficient chart rendering with react-native-chart-kit

## Security Considerations

- No sensitive data stored locally
- API communication over HTTPS
- Permission requests with clear explanations
- Privacy-focused design with user consent

## Future Enhancements

1. **Offline Support**: Local data caching and sync
2. **Push Notifications**: Savings reminders and tips
3. **Biometric Auth**: Fingerprint/Face ID login
4. **Advanced Charts**: More detailed analytics
5. **Social Features**: Savings challenges and sharing
6. **Investment Integration**: Mutual fund recommendations
7. **Bank Integration**: Real transaction syncing
8. **Voice Commands**: Hindi/Punjabi voice interaction

## Testing

### Manual Testing Checklist
- [ ] Onboarding flow completion
- [ ] Language switching functionality
- [ ] Transaction category editing
- [ ] Budget updates and persistence
- [ ] Chart data visualization
- [ ] API error handling
- [ ] Navigation between screens
- [ ] Responsive design on different devices

### Device Compatibility
- **Android**: 6.0+ (API level 23+)
- **iOS**: 11.0+
- **Screen Sizes**: 320px - 428px width
- **Orientations**: Portrait (primary), landscape (supported)

## Contributing

1. Follow React Native best practices
2. Maintain consistent code formatting
3. Add multilingual support for new features
4. Test on both Android and iOS
5. Update documentation for new components

## License

MIT License - Built for educational and demonstration purposes.

---

**Note**: This frontend is designed to work with the Node.js backend API. Ensure the backend server is running on `http://localhost:3000` for full functionality.