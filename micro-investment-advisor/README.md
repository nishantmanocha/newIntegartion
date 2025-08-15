# MicroInvestment Advisor

An AI-powered micro-investment advisor app built with React Native and Expo, designed to help low-income users save ₹10–₹50/day safely and invest in secure options.

## Features

### 🚀 Onboarding Flow
- **Welcome Screen**: Brand introduction with multilingual support (English, Hindi, Punjabi)
- **Financial Profile**: Collect user financial information and goals
- **Permissions**: Request necessary app permissions for optimal experience

### 📊 Home Dashboard
- **Today's Safe Save**: AI-recommended daily savings amount with confidence level
- **Weekly Progress**: Interactive charts showing savings trends
- **Impact Tracking**: Visual representation of goal progress
- **Quick Actions**: Save Now, Pause Saving, Set Goal, View Report

### 💰 Transactions Management
- **Transaction List**: View all financial transactions with categorization
- **Category Editing**: Modify transaction categories with intuitive interface
- **Smart Categorization**: Automatic merchant and amount-based categorization
- **Filtering & Search**: Easy transaction discovery and analysis

### 📈 Financial Planner
- **Monthly Projections**: Bar charts showing income vs. expenses
- **Budget Breakdown**: Pie charts for budget allocation visualization
- **Emergency Fund Tracker**: Progress tracking towards financial safety net
- **Budget Management**: Edit and adjust monthly budget allocations

### 🎓 Education Hub
- **Saving Tips**: Practical advice for building wealth
- **Fraud Prevention**: Essential knowledge to protect finances
- **Investment Guide**: Learn about different investment options
- **Interactive Content**: Expandable tip cards with detailed information

## Tech Stack

- **Frontend**: React Native with Expo SDK 53
- **Navigation**: Expo Router (file-based routing)
- **Charts**: React Native Chart Kit
- **Icons**: Expo Vector Icons
- **State Management**: React Hooks
- **Styling**: React Native StyleSheet
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd micro-investment-advisor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

## Project Structure

```
app/
├── _layout.tsx              # Root layout with onboarding logic
├── onboarding/              # Onboarding flow
│   ├── _layout.tsx         # Onboarding navigation
│   ├── welcome.tsx         # Welcome screen
│   ├── form.tsx            # Financial profile form
│   └── permissions.tsx     # Permissions request
└── (tabs)/                 # Main app tabs
    ├── _layout.tsx         # Tab navigation
    ├── index.tsx           # Home dashboard
    ├── transactions.tsx    # Transactions screen
    ├── planner.tsx         # Financial planner
    └── learn.tsx           # Education hub
```

## Design System

### Color Palette
- **Primary**: Emerald Green (#006B3F) - Trust and stability
- **Secondary**: Golden Yellow (#FFD700) - Success and optimism
- **Background**: Warm Ivory (#FAF8F0) - Clean and welcoming
- **Accent**: Navy Blue (#003153) - Professional and reliable
- **Highlight**: Soft Orange (#FF914D) - Energy and action

### Typography
- **Headings**: Poppins (Bold)
- **Body Text**: Inter (Regular)
- **Icons**: Expo Vector Icons (Ionicons)

## Key Features

### 🔐 Security & Privacy
- Data encryption and secure storage
- Permission-based access control
- No sensitive data transmission without consent

### 🌍 Multilingual Support
- English, Hindi, and Punjabi languages
- Culturally appropriate content and examples
- Localized financial terminology

### 📱 Responsive Design
- Mobile-first design approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

### 📊 Data Visualization
- Interactive charts and graphs
- Real-time data updates
- Visual progress indicators

## Development

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Comprehensive error handling

### Testing
- Component testing with React Native Testing Library
- Integration testing for navigation flows
- Performance testing for charts and animations

### Performance
- Lazy loading for heavy components
- Optimized chart rendering
- Efficient state management
- Minimal re-renders

## Deployment

### Build Configuration
- Expo build system
- Platform-specific optimizations
- Environment variable management
- App store deployment ready

### Distribution
- iOS App Store
- Google Play Store
- Enterprise distribution
- TestFlight/Internal testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Roadmap

### Phase 2
- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Social features

### Phase 3
- [ ] AI-powered recommendations
- [ ] Investment portfolio management
- [ ] Goal tracking automation
- [ ] Financial health scoring

---

**Built with ❤️ for financial inclusion and empowerment**