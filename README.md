# DailyRise 🌅

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**DailyRise** is an AI-powered productivity ecosystem designed to harmonize task management with mental well-being. Unlike traditional planners, DailyRise uses the Google Gemini API to coach users, predict burnout, and provide a support system for long-term growth.

---

## ✨ Key Features

- **🧠 AI Productivity Coach**: Real-time advice, time-blocking strategies, and daily motivation powered by Gemini 3 Flash.
- **⏳ Intelligent Task Decay**: Tasks uncompleted for 3+ days visually "fade" and are marked as stale, encouraging users to either revive or reassess their priorities.
- **📈 Growth Analytics**: Beautifully visualized performance trends using Recharts to track consistency.
- **🛡️ Wellness Monitoring**: An inactivity monitor that triggers an AI-driven state assessment after 30 days of inactivity.
- **👨‍👩‍👧 Guardian Sync**: Built-in integration to send weekly progress reports to parents or guardians via WhatsApp and Email.
- **🔐 Google Authentication**: Secure, seamless login experience.

## 🛠 Tech Stack

- **Frontend**: React (v19), TypeScript
- **Styling**: Tailwind CSS (Mobile-first, Responsive)
- **AI Engine**: Google GenAI SDK (Gemini 3 Flash & Pro)
- **Visualization**: Recharts
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites
- A Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/DailyRise.git
   cd DailyRise
   ```
2. **Setup Environment**:
   Create a `.env` file in the root and add your key:
   ```env
   API_KEY=your_gemini_api_key_here
   ```
3. **Install & Run**:
   ```bash
   npm install
   npm run dev
   ```

## ☁️ Deployment

This project is optimized for **Vercel** or **Netlify**.
1. Connect your GitHub repository.
2. Add `API_KEY` to the project Environment Variables in the dashboard.
3. Deploy!

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Created with ❤️ to help people rise every single day.*
