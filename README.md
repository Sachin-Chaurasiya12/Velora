# 💬 Valora Chat

A secure real-time 1-to-1 chat application built using Spring Boot WebSockets and REST APIs with a frontend client. The project demonstrates a full-stack messaging system with authentication, secure communication, and real-time user-to-user chat.

## 🚀 Overview

Valora Chat is a full-stack messaging system where users can register, authenticate securely, connect via WebSocket, and send private messages in real time using a secure backend API architecture. It demonstrates real-world backend engineering concepts like authentication, WebSockets, and message routing.

## 🧰 Tech Stack

Backend:
- Spring Boot
- Spring WebSocket (STOMP protocol)
- Spring Security
- JWT Authentication
- REST APIs

Frontend:
- HTML5
- CSS3
- JavaScript
- SockJS
- STOMP.js

## 🏗️ Architecture

Frontend (Browser) → REST API + WebSocket Connection → Spring Boot Backend → Spring Security (JWT Authentication) → Message Routing Layer → Target User

## ✨ Features

- Secure user authentication using JWT
- Real-time private messaging (1-to-1 chat)
- WebSocket-based communication channel
- User session management
- Secure message routing between authenticated users
- Lightweight frontend client

## 🔐 Security Model

- Passwords encrypted using BCrypt
- JWT token-based authentication
- WebSocket handshake validation
- Protected REST API endpoints
- Authorized message delivery only between valid users

## 📡 API Endpoints

Authentication:
POST /api/auth/register → Register user  
POST /api/auth/login → Login and receive JWT token  

WebSocket:
/chat → Connection endpoint  
/app/private → Send message  
/user/queue/messages → Receive messages  

## 📁 Project Structure

chat-app/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── security/
│   ├── service/
│   ├── websocket/
│   ├── model/
│   └── Application.java
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── styles.css
└── README.md

## ⚙️ How It Works

1. User registers or logs in via REST API  
2. Server returns JWT token  
3. Frontend connects to WebSocket using token  
4. User sends message to another user  
5. Backend validates and routes message securely  
6. Receiver gets message instantly in real time  

## ▶️ Setup Instructions

git clone https://github.com/your-username/valora.git  
cd valora-chat  
cd backend  
mvn spring-boot:run  

Backend runs at: http://localhost:8080  

Open frontend/index.html in browser.

## 🧠 Learning Outcomes

- WebSocket-based real-time systems  
- Secure backend API design  
- JWT authentication flow  
- Message routing between users  
- Full-stack system architecture  
- Spring Boot backend development  

## 🚧 Future Improvements

- Group chat system  
- Database persistence  
- Online/offline status  
- React frontend upgrade  
- Push notifications  
- Redis scaling  

## 🤝 Contributing

Fork the repo, create a branch, make changes, and submit a pull request.

## 📜 License

Apache licence 2.0

## 👨‍💻 Author

Developed by Sachin Chaurasiya
GitHub: https://github.com/Sachin-Chaurasiya12
