# 🩺 MedAssist | Cyber-Clinical AI Healthcare Assistant

MedAssist is a high-fidelity, secure AI-powered medical triage and wellness dashboard. It provides patients with real-time symptom triage, medication tracking, and health metrics monitoring through a sleek, modern, and HIPAA-inspired interface.

![MedAssist Dashboard Mockup](https://raw.githubusercontent.com/AbhishekArjun/MedAssist/main/public/vite.svg) *Note: Replace with actual screenshot once deployed*

## 🚀 Features

- **AI Medical Triage**: Smart symptom analysis and guidance using a dual-mode engine (Express Backend + Frontend Fallback).
- **Offline Resilience**: Automatically switches to an offline wellness engine if the clinical database is unreachable.
- **Health Metrics Dashboard**: Track Heart Rate, Blood Pressure, Sleep, and upcoming appointments.
- **Consultation Reports**: Generate and export official clinical reports of your consultation.
- **Voice Assistant**: Integrated text-to-speech for accessible healthcare guidance.
- **Medication & Habit Tracking**: Stay on top of your prescriptions and water intake.

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, React Router 7
- **Backend**: Node.js, Express 5
- **Styling**: Vanilla CSS with Cyber-Clinical "Glassmorphism" Aesthetics
- **Intelligence**: Rule-based Triage Engine with keyword pattern matching

## 📋 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (v9 or higher)

### Getting Started
1. **Clone the repository**:
   ```bash
   git clone https://github.com/AbhishekArjun/MedAssist.git
   cd MedAssist
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   Start both the frontend and the AI server simultaneously:
   ```bash
   npm run start:all
   ```

## 🧠 AI Triage Logic

The MedAssist AI uses a sophisticated triage matrix to categorize symptoms:
- **Critical (Red)**: Immediate referral to emergency care for "Worst headache of life" or severe localized pain.
- **Warning (Yellow)**: Guidance for fevers, persistent nausea, or respiratory congestion.
- **Supportive (Blue)**: General wellness advice for stress, fatigue, and minor discomfort.

## 👨‍💻 Development

### Project Structure
- `/src`: React frontend components and logic.
- `/server`: Express.js backend for AI triage logic.
- `/public`: Static assets and icons.

### Linting
To maintain code quality:
```bash
npm run lint
```

---

*Disclaimer: MedAssist is an AI-generated guidance tool and does not substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.*
