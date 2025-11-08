# TAPTI – SOS Safety & Crisis Assistance Platform 🚨

TAPTI is a safety-focused platform designed to help individuals quickly request help during emergencies, while also providing supportive guidance through a built-in AI crisis chatbot. The system consists of:

- **Android SOS Widget (Jetpack Compose + Glance)**
- **Web Application (React + Tailwind CSS)**
- **Backend API (Node.js + Express + PostgreSQL)**
- **AI Crisis Chatbot (Dialogflow)**

The goal is to ensure **fast SOS alerting, real-time guidance, and reliable communication** during distress situations.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🆘 **SOS Widget (Instant Help Button)** | A home-screen widget allowing one-tap distress signaling. |
| 🗣️ **AI Crisis Chatbot** | Offers emotional support and quick actionable steps during emergencies. |
| 👤 **User Dashboard** | Allows users to configure custom SOS message & emergency contacts. |
| 📡 **Administrator Dashboard** | Displays live SOS alerts (hardcoded sample currently). |
| 🔐 **Login & Signup System** | Secure authentication with session-based login. |
| 🌍 **Google Maps Coordinates** | Exact location coordinates stored/transmitted for responders. |

---

## 🧱 Tech Stack

### **Frontend**
- React.js
- Tailwind CSS
- Dialogflow Messenger UI (Google)
- (Optional Custom Chat UI Version Available)

### **Backend**
- Node.js + Express
- PostgreSQL (pg)
- Session Auth + bcrypt for password hashing

### **Mobile Widget**
- Android Studio
- Jetpack Compose
- Glance API

### **AI**
- Google Dialogflow ES
- REST API for chatbot communication

---

## 📁 Project Structure

TAPTI/
│── frontend/ (React UI)
│── server/ (Node + Express backend)
│── soswidget/ (Android widget project)
└── README.md


---

## 🚀 Getting Started

### 1. **Clone the Repository**
```sh
git clone https://github.com/Mannan88/tapti.git
cd TAPTI

2. Backend Setup
cd server
npm install

Create .env:
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
SESSION_SECRET=your_secret_key
GOOGLE_APPLICATION_CREDENTIALS=./dialogflow-key.json
DIALOGFLOW_PROJECT_ID=your_dialogflow_project_id

Start the backend:
nodemon index.js

3. Frontend Setup
cd frontend
npm install
npm run dev

🤝 Contributing

Pull requests are welcome!

