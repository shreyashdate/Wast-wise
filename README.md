# WasteWise - Smart Waste Management System

A full-stack web application for managing waste collection in a city or local area. This project is clean, bug-free, and designed to be easy to run for a college demonstration.

- **Frontend**: React (Vite) on Port `5173`
- **Backend**: Node.js + Express on Port `5000`
- **Database**: PostgreSQL on Port `5432`

## 🚀 How to Run the Project

Follow these simple steps to start the application:

### Step 1: Start PostgreSQL
Ensure your PostgreSQL database server is running. Create a database named `waste_management`. Keep your credentials as user `postgres` and password `postgres`, or configure your `.env` file in the backend.

### Step 2: Run Backend
Open a terminal, navigate to the `backend` folder, and start the server:
```bash
cd backend
npm install
npm start
```
*The backend API will run on http://localhost:5000*

### Step 3: Run Frontend
Open a new terminal window, navigate to the `frontend` folder, and start the app:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will run on http://localhost:5173*

### Step 4: Open Browser
Open your browser and navigate to: **http://localhost:5173**


## ⚙️ Features
- **Admin Dashboard**: Manage bins, add workers, view collection history, resolve complaints.
- **Worker Dashboard**: View assigned bins, update collection status.
- **Complaint System**: Public portal to file and track area issues.
- **Simple Reset**: A dedicated Settings tab in the Admin Dashboard to easily reset or seed sample data for demonstrations.

## 🔑 Demo Credentials
If you seeded the sample data, you can log in using:

| Role   | Name         | Phone      |
|--------|--------------|------------|
| Admin  | Admin User   | 0000000000 |
| Worker | Rahul Sharma | 9876543210 |
| Worker | Priya Patel  | 9876543211 |
