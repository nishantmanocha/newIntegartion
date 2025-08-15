import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const API_BASE_URL = 'http://localhost:3000'; // Change this for production

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [weeklyData, setWeeklyData] = useState({});
  const [projection, setProjection] = useState({});
  const [budgets, setBudgets] = useState({});
  const [tips, setTips] = useState([]);
  const [safeSave, setSafeSave] = useState({});
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API functions
  const api = {
    // User setup
    setupUser: async (userData) => {
      try {
        setLoading(true);
        const response = await axios.post(`${API_BASE_URL}/user/setup`, userData);
        setUser(response.data.user);
        return response.data;
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },

    // Transactions
    getTransactions: async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/transactions`);
        setTransactions(response.data.transactions);
        return response.data.transactions;
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },

    addTransaction: async (transactionData) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/transactions/add`, transactionData);
        // Refresh transactions
        await api.getTransactions();
        return response.data;
      } catch (error) {
        setError(error.message);
        throw error;
      }
    },

    generateFreshTransactions: async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${API_BASE_URL}/transactions/generate-fresh`);
        setTransactions(response.data.transactions);
        return response.data;
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },

    updateTransaction: async (id, data) => {
      try {
        const response = await axios.put(`${API_BASE_URL}/transactions/${id}`, data);
        // Refresh transactions
        await api.getTransactions();
        return response.data;
      } catch (error) {
        setError(error.message);
        throw error;
      }
    },

    getWeeklyData: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/transactions/week`);
        setWeeklyData(response.data.weeklyData);
        return response.data.weeklyData;
      } catch (error) {
        setError(error.message);
        throw error;
      }
    },

    // Projections and budgets
    getProjection: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/projection`);
        setProjection(response.data.projection);
        return response.data.projection;
      } catch (error) {
        setError(error.message);
        throw error;
      }
    },

    getBudgets: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/budget`);
        setBudgets(response.data.budgets);
        return response.data.budgets;
      } catch (error) {
        setError(error.message);
        throw error;
      }
    },

    updateBudgets: async (budgetData) => {
      try {
        const response = await axios.put(`${API_BASE_URL}/budget`, budgetData);
        setBudgets(response.data.budgets);
        return response.data;
      } catch (error) {
        setError(error.message);
        throw error;
      }
    },

    // Education and recommendations
    getTips: async (lang = 'en') => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tips?lang=${lang}`);
        setTips(response.data.tips);
        return response.data.tips;
      } catch (error) {
        setError(error.message);
        throw error;
      }
    },

    getSafeSave: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/safe-save`);
        setSafeSave(response.data.safeSave);
        return response.data.safeSave;
      } catch (error) {
        setError(error.message);
        throw error;
      }
    },

    // Health check
    healthCheck: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/health`);
        return response.data;
      } catch (error) {
        setError('API connection failed');
        throw error;
      }
    }
  };

  // Utility functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Essential': '🛒',
      'Discretionary': '🎯',
      'Debt': '💳',
      'Income': '💰'
    };
    return icons[category] || '📝';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Essential': '#059669',
      'Discretionary': '#F59E0B',
      'Debt': '#DC2626',
      'Income': '#10B981'
    };
    return colors[category] || '#6B7280';
  };

  // Initialize app data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await api.healthCheck();
        await api.getTransactions();
        await api.getWeeklyData();
        await api.getProjection();
        await api.getBudgets();
        await api.getTips(language);
        await api.getSafeSave();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initializeApp();
  }, []);

  // Update tips when language changes
  useEffect(() => {
    api.getTips(language);
  }, [language]);

  const value = {
    // State
    user,
    transactions,
    weeklyData,
    projection,
    budgets,
    tips,
    safeSave,
    language,
    loading,
    error,
    
    // Actions
    setUser,
    setLanguage,
    setError,
    
    // API
    api,
    
    // Utilities
    formatCurrency,
    formatDate,
    getCategoryIcon,
    getCategoryColor,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};