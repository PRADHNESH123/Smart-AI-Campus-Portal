# 🎓 Kalasalingam Smart AI Campus Portal (CSP)

An intelligent, full-stack campus management portal and AI assistant designed for **Kalasalingam Academy of Research and Education (KARE)**. 

Powered by **React 19**, **Vite**, **FastAPI**, and the **Google Antigravity SDK** with **Gemini**.

---

## 🌟 Key Features

### 🏛️ Campus Portal Systems
- **Student Dashboard**: Live CGPA tracking, attendance analytics, upcoming tests, enrolled subjects, and semester progress.
- **Academic Timetable**: Real-time daily class schedules, period timings, room allotments, and faculty details.
- **Assignment Tracker**: Track pending deadlines, submission statuses, priority flags, and grades.
- **Leave Application System**: Digital leave applications (Medical, Academic, Personal) with real-time faculty advisor approval status and remarks.
- **Campus Events & Symposia**: Registration and details for flagship events (TEKCLUSTER, Hackathons, Cultural fests, Sports meet).
- **Faculty & HOD Portals**: Dedicated authentication and portals for advisors and department leadership.

### 🤖 KLU CampusGenie (AI Assistant)
- **Built on Google Antigravity SDK**: Autonomous agent architecture with domain-specific Python function tools.
- **Real-Time Calendar & Schedule Awareness**: Answers inquiries like *"What classes do I have today?"* or *"Give tomorrow's timetable"*.
- **Leave Approval Inquiries**: Instantly checks if faculty approved leave applications and reads advisor remarks.
- **Responsive Floating UI**: Integrated interactive chat drawer with full Markdown table parsing and one-click quick action chips.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Lucide Icons, Modern CSS Design System
- **Backend**: Python, FastAPI, Uvicorn
- **AI / Agent Engine**: Google Antigravity SDK (`google-antigravity`), Google Gemini
- **Styling**: Kalasalingam University Brand Design System (Responsive & Mobile-ready)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)
- **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/api-keys)

### 2. Clone the Repository
```bash
git clone https://github.com/PRADHNESH123/Smart-AI-Campus-Portal.git
cd Smart-AI-Campus-Portal
```

### 3. Install Dependencies

#### Frontend:
```bash
npm install
```

#### Backend:
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Run the Application

#### Option A: 1-Click Launch (Windows)
Double-click:
```bash
start_portal.bat
```

#### Option B: Manual Startup

**Terminal 1 (Backend Agent Server):**
```bash
python -m uvicorn backend.agent_server:app --host 127.0.0.1 --port 8000
```

**Terminal 2 (Frontend React App):**
```bash
npm run dev
```

Visit the portal at **`http://localhost:3000`** in your browser.

---

## 📂 Project Structure

```
Smart-AI-Campus-Portal/
├── backend/
│   ├── agent_server.py      # FastAPI server & Google Antigravity Agent tools
│   └── campus_data.json     # Mock database for students, timetable, leaves
├── public/
│   ├── kare-crest.png       # Official University Crest
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── CampusAIAssistant.jsx  # Floating AI chatbot drawer
│   │       ├── UniversityLogo.jsx     # Brand logo component
│   │       ├── Header.jsx
│   │       └── Sidebar.jsx
│   ├── pages/               # Student, Faculty, HOD, Timetable, Leave pages
│   ├── App.jsx              # Application router & layout
│   └── main.jsx
├── start_portal.bat         # 1-click launch script
├── requirements.txt         # Python dependencies
├── package.json             # Node dependencies
└── vite.config.js           # Vite configuration with API reverse proxy
```

---

## 📜 License
This project is developed for educational and campus management purposes at Kalasalingam Academy of Research and Education.
