# Dev-Tinder — Web (Frontend)

A Tinder-style developer networking platform that helps developers discover, connect, and chat with each other. This repo contains the **React.js frontend** for Dev-Tinder.

🔗 **Live Demo:** [dev-tinder-web-nine-sand.vercel.app](https://dev-tinder-web-nine-sand.vercel.app/)
🔗 **Backend Repo:** [devtinder-backend](https://github.com/uttamvajapara-a16y/devtinder-backend)

---

## ✨ Features

- **User Authentication** — Signup/login secured with JWT-based authentication
- **Developer Feed** — feed showing developers you haven't connected with yet
- **Connection Requests** — Send, accept, or reject connection requests
- **Real-Time Chat** — Message your connections instantly using Socket.io
- **Profile Management** — Create and edit your developer profile
- **Responsive UI** — Works smoothly across desktop and mobile screen sizes

## 🛠️ Tech Stack

- **React.js** — UI library
- **JavaScript (ES6+)**
- **Socket.io-client** — Real-time chat
- **Axios** — API requests to the backend
- **CSS** — Styling

## 📦 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- The [devtinder-backend](https://github.com/uttamvajapara-a16y/devtinder-backend) server running locally or deployed

### Installation

```bash
# Clone the repository
git clone https://github.com/uttamvajapara-a16y/devtinder-web.git
cd devtinder-web

# Install dependencies
npm install

# Start the development server
npm start
```

The app will run on `http://localhost:3000` by default.

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:3000
REACT_APP_SOCKET_URL=http://localhost:3000
```

> Update these values to point to your deployed backend URL when running in production.

## 📁 Project Structure

```
devtinder-web/
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/         # Page-level components (Feed, Chat, Profile, etc.)
│   ├── utils/          # Helper functions, API calls, Redux/Context setup
│   └── App.js
├── public/
└── package.json
```

## 🔗 Related Repository

- **Backend (Node.js + Express + MongoDB):** [devtinder-backend](https://github.com/uttamvajapara-a16y/devtinder-backend)

## 👤 Author

**Uttam Vajapara**
- GitHub: [@uttamvajapara-a16y](https://github.com/uttamvajapara-a16y)

## 📄 License

This project is open source and available for learning purposes.
