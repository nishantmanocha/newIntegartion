const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage (for hackathon purposes)
let userData = {};
let transactions = [];
let budgets = {
  essentials: 15000,
  discretionary: 5000,
  debt: 3000
};

// Merchant data for Indian context
const merchants = [
  { name: 'Big Bazaar', category: 'Essential', weight: 0.3 },
  { name: 'Punjab Kirana Store', category: 'Essential', weight: 0.25 },
  { name: 'Mother Dairy', category: 'Essential', weight: 0.2 },
  { name: 'Reliance Fresh', category: 'Essential', weight: 0.15 },
  { name: 'Paytm Recharge', category: 'Essential', weight: 0.1 },
  { name: 'Bharat Gas', category: 'Essential', weight: 0.08 },
  { name: 'State Bus Depot', category: 'Essential', weight: 0.07 },
  { name: 'LIC Premium', category: 'Debt', weight: 0.4 },
  { name: 'HDFC Bank EMI', category: 'Debt', weight: 0.3 },
  { name: 'Credit Card Payment', category: 'Debt', weight: 0.3 },
  { name: 'Swiggy', category: 'Discretionary', weight: 0.25 },
  { name: 'Zomato', category: 'Discretionary', weight: 0.2 },
  { name: 'BookMyShow', category: 'Discretionary', weight: 0.15 },
  { name: 'Myntra', category: 'Discretionary', weight: 0.15 },
  { name: 'Amazon', category: 'Discretionary', weight: 0.15 },
  { name: 'Flipkart', category: 'Discretionary', weight: 0.1 },
  { name: 'Salary Credit', category: 'Income', weight: 0.6 },
  { name: 'Freelance Payment', category: 'Income', weight: 0.4 }
];

// Education tips in multiple languages
const educationTips = {
  en: [
    {
      id: '1',
      title: 'Start Small, Dream Big',
      content: 'Even ₹10 saved daily can become ₹3,650 in a year. Small consistent savings compound over time.',
      category: 'savings'
    },
    {
      id: '2',
      title: 'Track Every Rupee',
      content: 'Monitor your daily expenses. Awareness is the first step to better financial control.',
      category: 'budgeting'
    },
    {
      id: '3',
      title: 'Beware of Fake Investment Schemes',
      content: 'Avoid schemes promising unrealistic returns. Stick to regulated investment options.',
      category: 'fraud_prevention'
    },
    {
      id: '4',
      title: 'Emergency Fund First',
      content: 'Build an emergency fund covering 3-6 months of expenses before investing.',
      category: 'planning'
    },
    {
      id: '5',
      title: 'SIP is Your Friend',
      content: 'Systematic Investment Plans help you invest regularly without timing the market.',
      category: 'investment'
    }
  ],
  hi: [
    {
      id: '1',
      title: 'छोटी शुरुआत, बड़े सपने',
      content: 'रोज़ाना ₹10 की बचत भी एक साल में ₹3,650 बन सकती है। छोटी नियमित बचत समय के साथ बढ़ती है।',
      category: 'savings'
    },
    {
      id: '2',
      title: 'हर रुपए का हिसाब रखें',
      content: 'अपने दैनिक खर्चों पर नज़र रखें। जागरूकता बेहतर वित्तीय नियंत्रण की पहली सीढ़ी है।',
      category: 'budgeting'
    },
    {
      id: '3',
      title: 'नकली निवेश योजनाओं से बचें',
      content: 'अवास्तविक रिटर्न का वादा करने वाली योजनाओं से बचें। नियंत्रित निवेश विकल्पों पर टिके रहें।',
      category: 'fraud_prevention'
    }
  ],
  pb: [
    {
      id: '1',
      title: 'ਛੋਟੀ ਸ਼ੁਰੂਆਤ, ਵੱਡੇ ਸੁਪਨੇ',
      content: 'ਰੋਜ਼ਾਨਾ ₹10 ਦੀ ਬਚਤ ਵੀ ਇੱਕ ਸਾਲ ਵਿੱਚ ₹3,650 ਬਣ ਸਕਦੀ ਹੈ। ਛੋਟੀ ਨਿਯਮਤ ਬਚਤ ਸਮੇਂ ਨਾਲ ਵਧਦੀ ਹੈ।',
      category: 'savings'
    },
    {
      id: '2',
      title: 'ਹਰ ਰੁਪਏ ਦਾ ਹਿਸਾਬ ਰੱਖੋ',
      content: 'ਆਪਣੇ ਰੋਜ਼ਾਨਾ ਖਰਚਿਆਂ ਉੱਤੇ ਨਜ਼ਰ ਰੱਖੋ। ਜਾਗਰੂਕਤਾ ਬਿਹਤਰ ਵਿੱਤੀ ਨਿਯੰਤਰਣ ਦੀ ਪਹਿਲੀ ਸੀੜ੍ਹੀ ਹੈ।',
      category: 'budgeting'
    }
  ]
};

// Utility functions
function getRandomMerchant(category = null) {
  let availableMerchants = merchants;
  if (category) {
    availableMerchants = merchants.filter(m => m.category === category);
  }
  return availableMerchants[Math.floor(Math.random() * availableMerchants.length)];
}

function getRandomAmount(category) {
  switch (category) {
    case 'Essential':
      return Math.floor(Math.random() * 1000) + 50; // ₹50-₹1050
    case 'Discretionary':
      return Math.floor(Math.random() * 2000) + 100; // ₹100-₹2100
    case 'Debt':
      return Math.floor(Math.random() * 5000) + 500; // ₹500-₹5500
    case 'Income':
      return Math.floor(Math.random() * 20000) + 15000; // ₹15000-₹35000
    default:
      return Math.floor(Math.random() * 500) + 10; // ₹10-₹510
  }
}

function getRandomDate() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
  return new Date(thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime()));
}

function generateFakeTransactions(count = 12) {
  const categories = ['Essential', 'Essential', 'Essential', 'Essential', 'Essential', 
                     'Discretionary', 'Discretionary', 'Discretionary', 
                     'Debt', 'Debt', 'Income'];
  
  const newTransactions = [];
  
  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const merchant = getRandomMerchant(category);
    const amount = getRandomAmount(category);
    const date = getRandomDate();
    
    newTransactions.push({
      id: uuidv4(),
      merchant: merchant.name,
      amount: category === 'Income' ? amount : -amount,
      category: category,
      date: date.toISOString(),
      icon: getIconForCategory(category)
    });
  }
  
  return newTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getIconForCategory(category) {
  const icons = {
    'Essential': '🛒',
    'Discretionary': '🎯',
    'Debt': '💳',
    'Income': '💰'
  };
  return icons[category] || '📝';
}

// API Routes

// User setup endpoint
app.post('/user/setup', (req, res) => {
  try {
    const { name, incomeFrequency, rent, emi, goal, language } = req.body;
    
    userData = {
      id: uuidv4(),
      name: name || 'User',
      incomeFrequency: incomeFrequency || 'monthly',
      rent: rent || 0,
      emi: emi || 0,
      goal: goal || 10000,
      language: language || 'en',
      createdAt: new Date().toISOString()
    };
    
    // Generate initial transactions
    transactions = generateFakeTransactions(15);
    
    res.json({
      success: true,
      message: 'User setup completed successfully',
      user: userData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all transactions
app.get('/transactions', (req, res) => {
  try {
    // Generate fresh transactions if empty
    if (transactions.length === 0) {
      transactions = generateFakeTransactions(12);
    }
    
    res.json({
      success: true,
      transactions: transactions
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new transaction
app.post('/transactions/add', (req, res) => {
  try {
    const { merchant, amount, category, date } = req.body;
    
    const newTransaction = {
      id: uuidv4(),
      merchant: merchant || 'Manual Entry',
      amount: parseFloat(amount) || 0,
      category: category || 'Discretionary',
      date: date || new Date().toISOString(),
      icon: getIconForCategory(category)
    };
    
    transactions.unshift(newTransaction);
    
    res.json({
      success: true,
      message: 'Transaction added successfully',
      transaction: newTransaction
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update transaction category
app.put('/transactions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    
    const transactionIndex = transactions.findIndex(t => t.id === id);
    
    if (transactionIndex === -1) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }
    
    transactions[transactionIndex].category = category;
    transactions[transactionIndex].icon = getIconForCategory(category);
    
    res.json({
      success: true,
      message: 'Transaction updated successfully',
      transaction: transactions[transactionIndex]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get weekly transaction data
app.get('/transactions/week', (req, res) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    
    const weeklyTransactions = transactions.filter(t => 
      new Date(t.date) >= sevenDaysAgo && new Date(t.date) <= now
    );
    
    // Group by day
    const dailyData = {};
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Initialize all days with 0
    for (let i = 0; i < 7; i++) {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      const dayName = days[date.getDay()];
      dailyData[dayName] = { income: 0, expense: 0, savings: 0 };
    }
    
    // Aggregate transactions
    weeklyTransactions.forEach(t => {
      const date = new Date(t.date);
      const dayName = days[date.getDay()];
      
      if (t.amount > 0) {
        dailyData[dayName].income += t.amount;
      } else {
        dailyData[dayName].expense += Math.abs(t.amount);
      }
    });
    
    // Calculate daily savings
    Object.keys(dailyData).forEach(day => {
      dailyData[day].savings = Math.max(0, dailyData[day].income - dailyData[day].expense);
    });
    
    res.json({
      success: true,
      weeklyData: dailyData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get monthly projection
app.get('/projection', (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    const monthlyTransactions = transactions.filter(t => 
      new Date(t.date) >= thirtyDaysAgo && new Date(t.date) <= now
    );
    
    let totalIncome = 0;
    let totalExpenses = 0;
    let categoryExpenses = {
      Essential: 0,
      Discretionary: 0,
      Debt: 0
    };
    
    monthlyTransactions.forEach(t => {
      if (t.amount > 0) {
        totalIncome += t.amount;
      } else {
        totalExpenses += Math.abs(t.amount);
        if (categoryExpenses[t.category] !== undefined) {
          categoryExpenses[t.category] += Math.abs(t.amount);
        }
      }
    });
    
    const projectedSavings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (projectedSavings / totalIncome) * 100 : 0;
    
    // Calculate safe save amount (10-15% of income or ₹10-50 daily)
    const dailySafeSave = Math.min(50, Math.max(10, Math.floor((totalIncome * 0.12) / 30)));
    
    res.json({
      success: true,
      projection: {
        totalIncome,
        totalExpenses,
        projectedSavings,
        savingsRate: Math.round(savingsRate),
        categoryExpenses,
        dailySafeSave,
        confidence: savingsRate > 15 ? 'High' : savingsRate > 8 ? 'Medium' : 'Low'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update budget
app.put('/budget', (req, res) => {
  try {
    const { essentials, discretionary, debt } = req.body;
    
    budgets = {
      essentials: parseFloat(essentials) || budgets.essentials,
      discretionary: parseFloat(discretionary) || budgets.discretionary,
      debt: parseFloat(debt) || budgets.debt
    };
    
    res.json({
      success: true,
      message: 'Budget updated successfully',
      budgets
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get budget
app.get('/budget', (req, res) => {
  try {
    res.json({
      success: true,
      budgets
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get education tips
app.get('/tips', (req, res) => {
  try {
    const language = req.query.lang || 'en';
    const tips = educationTips[language] || educationTips.en;
    
    res.json({
      success: true,
      tips
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get today's safe save recommendation
app.get('/safe-save', (req, res) => {
  try {
    // Simple AI logic for safe save amount
    const now = new Date();
    const todayTransactions = transactions.filter(t => {
      const tDate = new Date(t.date);
      return tDate.toDateString() === now.toDateString();
    });
    
    let todaySpent = 0;
    todayTransactions.forEach(t => {
      if (t.amount < 0) todaySpent += Math.abs(t.amount);
    });
    
    // Calculate safe save based on spending pattern
    let safeSaveAmount = 25; // default
    let confidence = 'Medium';
    
    if (todaySpent < 200) {
      safeSaveAmount = 45;
      confidence = 'High';
    } else if (todaySpent < 500) {
      safeSaveAmount = 30;
      confidence = 'Medium';
    } else {
      safeSaveAmount = 15;
      confidence = 'Low';
    }
    
    res.json({
      success: true,
      safeSave: {
        amount: safeSaveAmount,
        confidence,
        message: `Based on your spending today, you can safely save ₹${safeSaveAmount}`
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Micro-Investment Advisor API is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Micro-Investment Advisor API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  
  // Generate initial sample data
  transactions = generateFakeTransactions(15);
  console.log(`💰 Generated ${transactions.length} sample transactions`);
});

module.exports = app;