# Employee Management System - MEAN Stack

A full-stack Employee Management System built with the MEAN stack 
(MongoDB, Express.js, Angular 17, Node.js) featuring JWT authentication 
and Docker support.

## Features
- JWT Authentication with HTTP Interceptor & Route Guards
- Full CRUD Operations (Create, Read, Update, Delete)
- Real-time Search & Filtering
- Column Sorting with Direction Indicators
- Client-side Pagination
- Toast Notifications
- Responsive SaaS-style UI
- Dockerized for one-command deployment

## Tech Stack
- Frontend: Angular 17, TypeScript, HTML/CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Auth: JWT (jsonwebtoken)
- DevOps: Docker, Docker Compose

## Quick Start (Docker)
git clone https://github.com/Shayannafees/employee-management-system
cd employee-management-system
docker-compose up --build

Visit http://localhost

## Login Credentials
Email: admin@TestBed.com
Password: 1234

## Manual Setup
### Backend
cd NodeJS
npm install
nodemon index.js

### Frontend
cd Angularapp
npm install
ng serve
