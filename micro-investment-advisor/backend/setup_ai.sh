#!/bin/bash

echo "🤖 Setting up AI/ML Service for Micro-Investment Advisor"

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed"
    echo "Please install Python 3.8+ and try again"
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"

# Create virtual environment
echo "📦 Creating Python virtual environment..."
python3 -m venv ai_env

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source ai_env/bin/activate

# Upgrade pip
echo "⬆️ Upgrading pip..."
pip install --upgrade pip

# Install AI/ML dependencies
echo "📚 Installing AI/ML libraries..."
pip install -r requirements.txt

# Download spaCy model
echo "📥 Downloading spaCy English model..."
python -m spacy download en_core_web_sm

# Create models directory
mkdir -p models

echo "✅ AI/ML setup complete!"
echo ""
echo "🚀 To start the AI service:"
echo "   source ai_env/bin/activate"
echo "   python ai_service.py"
echo ""
echo "🔧 Optional: Set OpenAI API key for LLM features:"
echo "   export OPENAI_API_KEY='your-key-here'"
echo ""
echo "📊 The AI service will run on http://localhost:5000"