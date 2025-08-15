#!/usr/bin/env python3
"""
AI/ML Service for Micro-Investment Advisor
Provides ML-powered predictions, forecasting, and NLP capabilities
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import os
from typing import Dict, List, Any, Optional

# ML Libraries
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import pickle

# Time Series Forecasting
try:
    from prophet import Prophet
except ImportError:
    Prophet = None
    print("Prophet not available, using simple forecasting")

# NLP Libraries
try:
    from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
    import torch
except ImportError:
    print("Transformers not available, using rule-based NLP")

try:
    import spacy
    # Load English model: python -m spacy download en_core_web_sm
    nlp = spacy.load("en_core_web_sm")
except ImportError:
    nlp = None
    print("spaCy not available, using basic text processing")

# OpenAI for LLM-based tips
try:
    import openai
    # Set your OpenAI API key: export OPENAI_API_KEY="your-key-here"
    openai.api_key = os.getenv("OPENAI_API_KEY")
except ImportError:
    openai = None
    print("OpenAI not available, using static tips")

class AIService:
    def __init__(self):
        self.models = {}
        self.scalers = {}
        self.load_or_train_models()
        
        # Initialize NLP pipeline for merchant categorization
        self.init_nlp_models()
        
    def load_or_train_models(self):
        """Load pre-trained models or train new ones"""
        try:
            # Try to load existing models
            with open('models/savings_predictor.pkl', 'rb') as f:
                self.models['savings_predictor'] = pickle.load(f)
            with open('models/scaler.pkl', 'rb') as f:
                self.scalers['standard'] = pickle.load(f)
            print("✅ Loaded pre-trained ML models")
        except FileNotFoundError:
            # Train new models with sample data
            self.train_initial_models()
            print("✅ Trained new ML models")
    
    def init_nlp_models(self):
        """Initialize NLP models for text processing"""
        try:
            # Hugging Face model for sentiment/classification
            self.sentiment_pipeline = pipeline(
                "sentiment-analysis",
                model="cardiffnlp/twitter-roberta-base-sentiment-latest"
            )
            
            # Text classification for merchant categorization
            self.category_pipeline = pipeline(
                "zero-shot-classification",
                model="facebook/bart-large-mnli"
            )
            print("✅ Loaded NLP models")
        except Exception as e:
            print(f"⚠️ NLP models not available: {e}")
            self.sentiment_pipeline = None
            self.category_pipeline = None
    
    def train_initial_models(self):
        """Train ML models with synthetic Indian financial data"""
        # Generate synthetic training data based on Indian spending patterns
        np.random.seed(42)
        n_samples = 1000
        
        # Features: income, rent, emi, age, family_size, location_tier
        income = np.random.normal(25000, 10000, n_samples)  # Monthly income in INR
        rent = np.random.normal(8000, 3000, n_samples)
        emi = np.random.normal(3000, 2000, n_samples)
        age = np.random.randint(22, 65, n_samples)
        family_size = np.random.randint(1, 6, n_samples)
        location_tier = np.random.randint(1, 4, n_samples)  # 1=Metro, 2=Tier-1, 3=Tier-2
        
        # Create feature matrix
        X = np.column_stack([income, rent, emi, age, family_size, location_tier])
        
        # Target: Daily safe savings amount (₹10-₹50)
        # Formula based on Indian financial behavior
        daily_savings = np.maximum(10, 
            np.minimum(50, 
                (income - rent - emi) * 0.1 / 30 + 
                np.random.normal(0, 5, n_samples)
            )
        )
        
        # Train Random Forest model
        X_train, X_test, y_train, y_test = train_test_split(X, daily_savings, test_size=0.2, random_state=42)
        
        # Scale features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        # Train model
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_train_scaled, y_train)
        
        # Save models
        os.makedirs('models', exist_ok=True)
        with open('models/savings_predictor.pkl', 'wb') as f:
            pickle.dump(model, f)
        with open('models/scaler.pkl', 'wb') as f:
            pickle.dump(scaler, f)
        
        self.models['savings_predictor'] = model
        self.scalers['standard'] = scaler
        
        print(f"📊 Model trained with R² score: {model.score(X_test_scaled, y_test):.3f}")
    
    def predict_safe_savings(self, user_data: Dict) -> Dict:
        """ML-powered safe savings prediction"""
        try:
            # Extract features
            features = np.array([[
                user_data.get('income', 25000),
                user_data.get('rent', 8000),
                user_data.get('emi', 3000),
                user_data.get('age', 30),
                user_data.get('family_size', 3),
                user_data.get('location_tier', 2)
            ]])
            
            # Scale features
            features_scaled = self.scalers['standard'].transform(features)
            
            # Predict
            prediction = self.models['savings_predictor'].predict(features_scaled)[0]
            
            # Determine confidence based on prediction stability
            confidence = "High" if 20 <= prediction <= 40 else "Medium" if 15 <= prediction <= 45 else "Low"
            
            return {
                "amount": max(10, min(50, round(prediction))),
                "confidence": confidence,
                "ml_prediction": True,
                "model_used": "RandomForest"
            }
        except Exception as e:
            # Fallback to rule-based prediction
            return self._fallback_savings_prediction(user_data)
    
    def _fallback_savings_prediction(self, user_data: Dict) -> Dict:
        """Fallback rule-based prediction"""
        income = user_data.get('income', 25000)
        expenses = user_data.get('rent', 8000) + user_data.get('emi', 3000)
        surplus = max(0, income - expenses)
        
        if surplus > 15000:
            return {"amount": 45, "confidence": "High", "ml_prediction": False}
        elif surplus > 8000:
            return {"amount": 30, "confidence": "Medium", "ml_prediction": False}
        else:
            return {"amount": 15, "confidence": "Low", "ml_prediction": False}
    
    def forecast_savings_goal(self, transactions: List[Dict], goal_amount: float) -> Dict:
        """Time series forecasting for goal achievement"""
        try:
            if not Prophet:
                return self._simple_goal_forecast(transactions, goal_amount)
            
            # Prepare data for Prophet
            df = pd.DataFrame([
                {
                    'ds': pd.to_datetime(t['date']),
                    'y': abs(t['amount']) if t['amount'] < 0 else 0  # Daily expenses
                }
                for t in transactions if t['amount'] < 0
            ])
            
            if len(df) < 10:  # Need minimum data points
                return self._simple_goal_forecast(transactions, goal_amount)
            
            # Aggregate by day
            df = df.groupby('ds')['y'].sum().reset_index()
            
            # Train Prophet model
            model = Prophet(
                yearly_seasonality=True,
                weekly_seasonality=True,
                daily_seasonality=False
            )
            model.fit(df)
            
            # Forecast next 365 days
            future = model.make_future_dataframe(periods=365)
            forecast = model.predict(future)
            
            # Calculate when goal will be reached
            daily_avg_expense = df['y'].mean()
            monthly_avg_expense = daily_avg_expense * 30
            
            # Estimate monthly savings (simplified)
            estimated_monthly_savings = max(1000, monthly_avg_expense * 0.1)
            months_to_goal = goal_amount / estimated_monthly_savings
            
            return {
                "months_to_goal": round(months_to_goal, 1),
                "confidence": "High" if len(df) > 30 else "Medium",
                "method": "Prophet",
                "daily_avg_expense": round(daily_avg_expense, 2),
                "estimated_monthly_savings": round(estimated_monthly_savings, 2)
            }
            
        except Exception as e:
            print(f"Prophet forecasting failed: {e}")
            return self._simple_goal_forecast(transactions, goal_amount)
    
    def _simple_goal_forecast(self, transactions: List[Dict], goal_amount: float) -> Dict:
        """Simple ARIMA-like forecasting"""
        if not transactions:
            return {"months_to_goal": 12, "confidence": "Low", "method": "Simple"}
        
        # Calculate average monthly savings
        expenses = [abs(t['amount']) for t in transactions if t['amount'] < 0]
        avg_monthly_expense = sum(expenses) / max(1, len(expenses)) * 30
        
        # Estimate 10% savings rate
        estimated_monthly_savings = avg_monthly_expense * 0.1
        months_to_goal = goal_amount / max(estimated_monthly_savings, 500)
        
        return {
            "months_to_goal": round(months_to_goal, 1),
            "confidence": "Medium",
            "method": "Simple",
            "estimated_monthly_savings": round(estimated_monthly_savings, 2)
        }
    
    def categorize_merchant_nlp(self, merchant_name: str, description: str = "") -> Dict:
        """NLP-powered merchant categorization"""
        try:
            if not self.category_pipeline:
                return self._rule_based_categorization(merchant_name)
            
            # Categories for classification
            categories = ["Essential", "Discretionary", "Debt", "Income"]
            
            # Combine merchant name and description
            text = f"{merchant_name} {description}".strip()
            
            # Use zero-shot classification
            result = self.category_pipeline(text, categories)
            
            # Get the top prediction
            predicted_category = result['labels'][0]
            confidence = result['scores'][0]
            
            return {
                "category": predicted_category,
                "confidence": round(confidence, 3),
                "method": "NLP",
                "all_scores": dict(zip(result['labels'], result['scores']))
            }
            
        except Exception as e:
            print(f"NLP categorization failed: {e}")
            return self._rule_based_categorization(merchant_name)
    
    def _rule_based_categorization(self, merchant_name: str) -> Dict:
        """Fallback rule-based categorization"""
        merchant_lower = merchant_name.lower()
        
        # Essential keywords
        if any(word in merchant_lower for word in ['bazaar', 'kirana', 'grocery', 'medical', 'pharmacy', 'gas', 'petrol', 'electricity', 'water', 'milk', 'dairy']):
            return {"category": "Essential", "confidence": 0.8, "method": "Rule-based"}
        
        # Discretionary keywords
        elif any(word in merchant_lower for word in ['swiggy', 'zomato', 'restaurant', 'movie', 'shopping', 'amazon', 'flipkart', 'myntra', 'entertainment']):
            return {"category": "Discretionary", "confidence": 0.8, "method": "Rule-based"}
        
        # Debt keywords
        elif any(word in merchant_lower for word in ['emi', 'loan', 'credit', 'bank', 'lic', 'insurance', 'premium']):
            return {"category": "Debt", "confidence": 0.8, "method": "Rule-based"}
        
        # Income keywords
        elif any(word in merchant_lower for word in ['salary', 'freelance', 'payment', 'income', 'credit']):
            return {"category": "Income", "confidence": 0.8, "method": "Rule-based"}
        
        else:
            return {"category": "Essential", "confidence": 0.5, "method": "Rule-based"}
    
    def generate_ai_tips(self, language: str = "en", user_context: Dict = None) -> List[Dict]:
        """Generate AI-powered multilingual financial tips"""
        try:
            if not openai or not openai.api_key:
                return self._static_tips(language)
            
            # Create context-aware prompt
            context = ""
            if user_context:
                income = user_context.get('income', 25000)
                savings_rate = user_context.get('savings_rate', 10)
                context = f"User has monthly income of ₹{income} and saves {savings_rate}% monthly."
            
            language_map = {
                "en": "English",
                "hi": "Hindi (हिंदी)",
                "pb": "Punjabi (ਪੰਜਾਬੀ)"
            }
            
            prompt = f"""Generate 5 practical financial tips for micro-investment and savings in {language_map.get(language, 'English')} for low-income users in India. {context}

Focus on:
1. Daily savings (₹10-₹50)
2. Fraud prevention
3. Emergency fund building
4. Simple investment options
5. Budgeting for Indian families

Format as JSON array with title and content fields."""

            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a financial advisor for low-income Indian families. Provide practical, culturally relevant advice."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1500,
                temperature=0.7
            )
            
            # Parse response
            content = response.choices[0].message.content
            tips = json.loads(content)
            
            # Add metadata
            for i, tip in enumerate(tips):
                tip['id'] = str(i + 1)
                tip['category'] = 'ai_generated'
                tip['source'] = 'OpenAI'
            
            return tips
            
        except Exception as e:
            print(f"AI tip generation failed: {e}")
            return self._static_tips(language)
    
    def _static_tips(self, language: str) -> List[Dict]:
        """Fallback static tips"""
        tips_db = {
            "en": [
                {
                    "id": "1",
                    "title": "Start Small, Dream Big",
                    "content": "Even ₹10 saved daily becomes ₹3,650 in a year. Small consistent savings compound over time.",
                    "category": "savings"
                },
                {
                    "id": "2", 
                    "title": "Track Every Rupee",
                    "content": "Monitor daily expenses. Awareness is the first step to better financial control.",
                    "category": "budgeting"
                }
            ],
            "hi": [
                {
                    "id": "1",
                    "title": "छोटी शुरुआत, बड़े सपने", 
                    "content": "रोज़ाना ₹10 की बचत भी एक साल में ₹3,650 बन सकती है।",
                    "category": "savings"
                }
            ]
        }
        return tips_db.get(language, tips_db["en"])
    
    def analyze_spending_patterns(self, transactions: List[Dict]) -> Dict:
        """ML-powered spending pattern analysis"""
        if not transactions:
            return {"patterns": [], "insights": [], "recommendations": []}
        
        df = pd.DataFrame(transactions)
        
        # Convert date and amount
        df['date'] = pd.to_datetime(df['date'])
        df['amount'] = df['amount'].astype(float)
        df['day_of_week'] = df['date'].dt.day_name()
        df['hour'] = df['date'].dt.hour
        
        # Analyze patterns
        patterns = {
            "highest_spending_day": df[df['amount'] < 0].groupby('day_of_week')['amount'].sum().abs().idxmax(),
            "peak_spending_hour": df[df['amount'] < 0].groupby('hour')['amount'].sum().abs().idxmax(),
            "avg_transaction_size": abs(df[df['amount'] < 0]['amount'].mean()),
            "spending_by_category": df[df['amount'] < 0].groupby('category')['amount'].sum().abs().to_dict()
        }
        
        # Generate insights
        insights = []
        if patterns["highest_spending_day"] in ["Saturday", "Sunday"]:
            insights.append("You spend more on weekends - consider weekend budgeting")
        
        if patterns["peak_spending_hour"] > 20:
            insights.append("Late night spending detected - avoid impulse purchases")
        
        # ML-based recommendations
        recommendations = self._generate_ml_recommendations(patterns, df)
        
        return {
            "patterns": patterns,
            "insights": insights, 
            "recommendations": recommendations,
            "analysis_date": datetime.now().isoformat()
        }
    
    def _generate_ml_recommendations(self, patterns: Dict, df: pd.DataFrame) -> List[str]:
        """Generate ML-based financial recommendations"""
        recommendations = []
        
        # Spending analysis
        total_spending = abs(df[df['amount'] < 0]['amount'].sum())
        essential_spending = abs(df[df['category'] == 'Essential']['amount'].sum())
        
        if essential_spending / total_spending > 0.7:
            recommendations.append("Good job! 70%+ spending on essentials shows disciplined budgeting")
        else:
            recommendations.append("Consider reducing discretionary spending to improve savings")
        
        # Frequency analysis
        transaction_frequency = len(df) / 30  # Transactions per day
        if transaction_frequency > 3:
            recommendations.append("High transaction frequency detected - consider bulk purchases to save")
        
        return recommendations

# Flask API wrapper for Node.js integration
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize AI service
ai_service = AIService()

@app.route('/ai/predict-savings', methods=['POST'])
def predict_savings():
    """ML-powered savings prediction endpoint"""
    data = request.json
    result = ai_service.predict_safe_savings(data)
    return jsonify(result)

@app.route('/ai/forecast-goal', methods=['POST'])
def forecast_goal():
    """Time series goal forecasting endpoint"""
    data = request.json
    transactions = data.get('transactions', [])
    goal_amount = data.get('goal_amount', 50000)
    result = ai_service.forecast_savings_goal(transactions, goal_amount)
    return jsonify(result)

@app.route('/ai/categorize-merchant', methods=['POST'])
def categorize_merchant():
    """NLP merchant categorization endpoint"""
    data = request.json
    merchant = data.get('merchant', '')
    description = data.get('description', '')
    result = ai_service.categorize_merchant_nlp(merchant, description)
    return jsonify(result)

@app.route('/ai/generate-tips', methods=['POST'])
def generate_tips():
    """AI-powered tip generation endpoint"""
    data = request.json
    language = data.get('language', 'en')
    user_context = data.get('user_context', {})
    result = ai_service.generate_ai_tips(language, user_context)
    return jsonify({"tips": result})

@app.route('/ai/analyze-patterns', methods=['POST'])
def analyze_patterns():
    """ML spending pattern analysis endpoint"""
    data = request.json
    transactions = data.get('transactions', [])
    result = ai_service.analyze_spending_patterns(transactions)
    return jsonify(result)

@app.route('/ai/health', methods=['GET'])
def ai_health():
    """AI service health check"""
    return jsonify({
        "status": "healthy",
        "models_loaded": len(ai_service.models),
        "nlp_available": ai_service.sentiment_pipeline is not None,
        "openai_available": openai is not None and openai.api_key is not None,
        "prophet_available": Prophet is not None
    })

if __name__ == '__main__':
    print("🤖 Starting AI/ML Service...")
    print("📊 Models loaded:", len(ai_service.models))
    print("🔗 Available at: http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)