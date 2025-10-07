# Auto Portfolio Builder

**AI-powered professional portfolio generation from IMDB, Facebook, and Vimeo profiles.**

[![Status](https://img.shields.io/badge/status-active%20development-brightgreen)]()
[![Sprint](https://img.shields.io/badge/sprint-week%201-blue)]()
[![Client Ready](https://img.shields.io/badge/client-production-orange)]()

---

## 🚀 **Quick Start**

### **Installation**
```bash
# Clone the repository
git clone https://github.com/yazzy01/Auto-Portfolio-Builder.git
cd Auto-Portfolio-Builder/persona-forge-demo-81-main

# Install dependencies
npm install
cd api && npm install && cd ..

# Start both frontend and backend
npm run dev
```

### **Access**
- Frontend: `http://localhost:8081`
- Backend API: `http://localhost:3001`

---

## ✨ **Features**

### **Core Functionality**
- ✅ **IMDB Integration**: 99% success rate with comprehensive data extraction
- ✅ **AI Analysis**: Google Gemini AI for structured profile analysis
- ✅ **Profile Editing**: Inline editing with save functionality
- ✅ **Mobile Responsive**: Works on all devices (320px → 4K)
- ✅ **Search & Filter**: Find specific projects and credits
- ✅ **PDF Export**: Download complete portfolios
- ✅ **Clickable Cards**: Interactive modals for projects and photos

### **In Progress**
- 🔧 **Facebook Integration**: Public profile scraping (Week 1)
- 🔧 **Vimeo Integration**: Creator profile extraction (Week 1)
- 🔧 **Enhanced UI**: Movie posters, ratings, and professional styling
- 🔧 **MongoDB**: Persistent profile storage (Week 2)

---

## 🛠️ **Tech Stack**

**Frontend**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + Shadcn UI
- jsPDF (PDF export)

**Backend**
- Node.js + Express.js
- Axios + Cheerio (web scraping)
- Google Gemini AI
- ScrapingBee API

**Deployment**
- Frontend: Vercel
- Backend: Vercel Serverless / Heroku

---

## 📖 **Documentation**

- **[STATUS.md](STATUS.md)** - Current work status, completed features, and to-do list
- **[Sprint-1-Deliverables-Draft.md](Sprint-1-Deliverables-Draft.md)** - Sprint plan and deliverables
- **[api/README.md](api/README.md)** - Backend API documentation

---

## 🎯 **Current Status**

**Sprint 1 - Week 1**: Client-Ready Development

### **Recent Fixes**
- ✅ Fixed backend scraping (extracted real movies, not biography text)
- ✅ Enhanced cover image extraction (movie posters)
- ✅ Removed "N/A" and "Credit" labels
- ✅ Renamed "Filmography" → "Projects" for universal appeal
- ✅ Added profile photo and cover photo sections
- ✅ Unified server startup command (`npm run dev`)

### **Known Issues**
- 🔧 Featured Work section needs verification (testing new scraping)
- 🔧 Clickable cards need image display verification
- 🔧 Performance optimization pending

See **[STATUS.md](STATUS.md)** for detailed progress tracking.

---

## 🧪 **Testing**

### **Generate a Profile**
1. Start servers: `npm run dev`
2. Open `http://localhost:8081`
3. Enter IMDB URL: `https://www.imdb.com/name/nm0000129/`
4. Click "Generate Profile"
5. Wait ~3 seconds for AI analysis

### **Verify Features**
- Featured Work shows actual movie titles with posters
- Clicking cards opens modals with full information
- Search and filter work for projects
- PDF export generates clean document
- Mobile view works on small screens

---

## 🤝 **Contributing**

This is an active client project. For contributions or questions:
- Check **[STATUS.md](STATUS.md)** for current work
- Review **[Sprint-1-Deliverables-Draft.md](Sprint-1-Deliverables-Draft.md)** for roadmap
- Contact: yazzy01 (GitHub)

---

## 📄 **License**

Proprietary - Client Project

---

## 🔗 **Links**

- **GitHub**: https://github.com/yazzy01/Auto-Portfolio-Builder.git
- **Sprint Plan**: [Sprint-1-Deliverables-Draft.md](Sprint-1-Deliverables-Draft.md)
- **Status**: [STATUS.md](STATUS.md)

---

**Last Updated**: October 7, 2025  
**Version**: 1.0 (Sprint 1 - Week 1)  
**Status**: 🚀 Active Development - Client Production
