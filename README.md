# AI Chat Template

A fullstack AI chat application built with:

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **AI Model:** Gemini

---

# 1. Environment Setup

You need to create **two `.env` files**: one for the **client** and one for the **server**.

---

## Client `.env`

Create a file:

```
client/.env
```

Add the following:

```env
VITE_API_URL=http://localhost:5000/api
```

This variable defines the base URL used by the frontend to call the backend API.

---

## Server `.env`

Create a file:

```
server/.env
```

Add the following:

```env
MONGO_URI="your_mongodb_connection_string"
GEMINI_API_KEY="your_gemini_api_key"
JWT_SECRET="your_jwt_secret_key"
PORT=5000
USE_FAKE_AI="false"
```

### Explanation

| Variable | Description |
|--------|-------------|
| MONGO_URI | MongoDB connection string |
| GEMINI_API_KEY | API key for Gemini AI |
| JWT_SECRET | Secret key used to sign JWT tokens |
| PORT | Backend server port |
| USE_FAKE_AI | Set `true` to use fake AI responses for testing |

---

# 2. Install Dependencies

Install dependencies for **both client and server**.

## Install Client

```bash
cd client
yarn
```

## Install Server

```bash
cd server
yarn
```

---

# 3. Run the Project

You must run **both backend and frontend**.

## Start Backend

```bash
cd server
yarn dev
```

## Start Frontend

```bash
cd client
yarn dev
```

---

# 4. Access the Application

Frontend:

```
http://localhost:5173
```

Backend API:

```
http://localhost:5000/api
```

---

# 5. Features

- AI Chat with Gemini
- Conversation history
- Guest chat (no login required)
- User authentication (JWT)
- Conversation management (delete)
- Upload images / PDFs *(currently supports single file upload only)*

---

# Notes

- Guest users can chat but **conversations are not saved**.
- When `USE_FAKE_AI=true`, the backend will return **mock responses instead of calling Gemini**.

