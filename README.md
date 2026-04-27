# 🧠 CodeSparrow

A developer-focused platform to **practice DSA, store reusable code, and build a personal knowledge system**—all in one place.

---

## 🚀 Overview

**CodeSparrow** is designed to solve a common problem:

> Developers solve problems but forget patterns and struggle to reuse solutions later.

This platform connects learning, storing, and reusing code into a single workflow:

Solve Problem → Extract Pattern → Save Snippet → Reuse Anytime

---

## 🎯 Core Idea

Instead of using multiple tools for different purposes, CodeSparrow combines:

- DSA practice  
- Code snippet storage  
- Personal knowledge management  

Into one unified system focused on **learning retention and reuse**.

---

## ✨ Features

### 📦 Code Vault
- Store reusable code snippets  
- Tag-based organization  
- Search by keyword or use-case  
- Favorite important snippets  

---

### 🧠 DSA Arena
- Practice coding problems (Easy / Medium / Hard)  
- Track attempts and solutions  
- Learn patterns through structured problems  

---

### 🔄 Learning Loop (Core Feature)
- Solve a problem  
- Save the pattern/snippet  
- Reuse it in future problems  

---

### 👥 Shared Knowledge (Friends Mode)
- Share snippets with friends or groups  
- View and reuse shared code  
- Upvote or save useful patterns  

---

### 💰 Points & Unlock System (Optional)
- Earn points by solving problems  
- Unlock:
  - Hints  
  - Approaches  
  - Solutions  

---

## 🏗️ Architecture

Frontend (React)
        ↓
API Layer (JWT Auth)
        ↓
-----------------------------------
| Code Vault Service              |
| DSA Service                     |
| Points Service                  |
-----------------------------------
        ↓
Database (MYSQL)

---

## 🧰 Tech Stack

### Backend:
- C# (.NET) / Java (Spring Boot)  
- REST APIs  
- JWT Authentication  

---

### Frontend:
- React.js  
- JavaScript  
- HTML / CSS  

---

### Database:
- MYSQL  

---

### Deployment:
- Frontend: Vercel  
- Backend: Render  
- Database: Supabase  

---

## 🔐 Security

- JWT-based authentication  
- Secure API endpoints  
- User-based data isolation  
- Protected snippet and problem access  

---

## ⚙️ How It Works

1. User logs in  
2. Solves a DSA problem  
3. Saves useful code/snippet  
4. Tags and organizes it  
5. Reuses it later or shares with friends  

---

## 📁 Project Structure

codesparrow/
├── backend/
│   ├── auth/
│   ├── snippets/
│   ├── dsa/
│   ├── points/
│   └── api/
├── frontend/
│   ├── components/
│   ├── pages/
│   └── services/
└── README.md

---

## 🧠 Learning Outcomes

- System design (modular architecture)  
- JWT authentication implementation  
- Database design for real-world apps  
- Full-stack development  
- API design and integration  

---

## 🚧 Future Improvements

- AI-based code suggestions  
- Advanced search (semantic search)  
- Interview preparation mode  
- Leaderboards and streaks  
- Mobile app version  

---

## 🎯 Vision

Build a system where developers don’t just solve problems—but **retain and reuse knowledge effectively**.

---

## 👨‍💻 Author

Developed by Sachin Chaurasiya  
GitHub: https://github.com/Sachin-Chaurasiya12  

---

## 📜 License

Apache License 2.0
