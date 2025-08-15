#!/bin/bash

echo "🚀 Starting Micro-Investment Advisor Services"

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null; then
        return 0
    else
        return 1
    fi
}

# Start AI service in background
echo "🤖 Starting AI/ML Service on port 5000..."
if check_port 5000; then
    echo "⚠️ Port 5000 already in use"
else
    source ai_env/bin/activate && python ai_service.py &
    AI_PID=$!
    echo "✅ AI service started (PID: $AI_PID)"
fi

# Wait a moment for AI service to start
sleep 3

# Start Node.js API service
echo "🌐 Starting Node.js API on port 3000..."
if check_port 3000; then
    echo "⚠️ Port 3000 already in use"
else
    npm start &
    NODE_PID=$!
    echo "✅ Node.js API started (PID: $NODE_PID)"
fi

echo ""
echo "🎉 Services are starting up!"
echo "📊 Node.js API: http://localhost:3000"
echo "🤖 AI Service: http://localhost:5000"
echo ""
echo "🔍 Check service status:"
echo "   curl http://localhost:3000/health"
echo "   curl http://localhost:5000/ai/health"
echo ""
echo "⏹️ To stop services:"
echo "   kill $NODE_PID $AI_PID"

# Keep script running
wait