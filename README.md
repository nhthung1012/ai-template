# AI Chat Application

Full-stack AI chat app with conversation history, file uploads, and authentication.

Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- AI: Google Gemini
- Auth: JWT

1. Environment Setup
Create two .env files.

Client ─ client/.env
VITE_API_URL=http://localhost:5000/api

Server ─ server/.env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_random_jwt_secret_key
PORT=5000
USE_FAKE_AI=false

Environment Variables
Name            Description                                   Required?
MONGO_URI       MongoDB connection string                     Yes
GEMINI_API_KEY  Google Gemini API key                         Yes (unless USE_FAKE_AI=true)
JWT_SECRET      Secret for signing JWT tokens                 Yes
PORT            Server port                                   No (default 5000)
USE_FAKE_AI     Use fake/mock AI responses for testing        No

2. Install Dependencies

# Frontend
cd client
yarn install
# or npm install

# Backend
cd ../server
yarn install
# or npm install

3. Run the Project

# Terminal 1 – Backend
cd server
yarn dev
# or npm run dev

# Terminal 2 – Frontend
cd client
yarn dev
# or npm run dev

4. Default URLs

Frontend:     http://localhost:5173
Backend API:  http://localhost:5000/api

5. Main Features

- Chat with Google Gemini
- Save & view conversation history
- Upload images / PDFs (Still in development)
- Guest mode (no login needed)
- Register / Login with JWT
- Delete conversations
