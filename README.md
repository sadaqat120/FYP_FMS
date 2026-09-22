# 🌾 Farm Management System (FMS)

A full-stack web application built to help small-scale farmers digitize and manage their farming operations. The system simplifies record-keeping and farm planning for crops, livestock, and resources while also providing tools like custom reminders, interactive report generation, and chatbot assistance — all in one place.

---

## 🔍 Project Overview

The goal of this Farm Management System is to replace traditional manual practices with a centralized digital platform. This empowers farmers to:
- Manage plots and livestock data
- Track daily farming activities
- Record and export summaries
- Keep reminders for important tasks
- Use a chatbot for quick, data-driven answers

---

## 🚀 Features

### 🌱 Crop Management
- Add and manage multiple plots
- Record field activities like sowing, irrigation, fertilization, and harvesting
- Enter costs, expected yield, and actual yield
- View summaries including yield grade, satisfaction, and financial outcome

### 🐄 Livestock Management
- Register livestock by category and age
- Record health, feed type, milking data, and production details
- View visual summaries through charts by age, type, and health

### 🧪 Resource Management
- Add and track farm resources like seeds, fertilizers, equipment, etc.
- Monitor usage with date-wise and purpose-wise tracking
- Manage multiple stores/farms separately

### ⏰ Task Reminders
- Set manual reminders for key tasks (e.g., irrigation, harvesting, feeding)
- User-controlled, flexible scheduling (not automated by system logic)

### 🤖 FMS Chat Assistant
- Ask queries related to farm operations
- Chatbot responds based on the farm’s actual stored data

### 📄 Interactive Record Builder
- Generate and export crop and resource summaries
- Reports include costs, yield, satisfaction ratings, and notes
- Saved as downloadable PDF documents

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  
- jsPDF + jspdf-autotable (PDF export)  

**Backend:**  
- Node.js + Express  
- MongoDB with Mongoose  
- JWT for authentication  
- Nodemailer for email verification

---

### 1. Clone the project
```bash
git clone https://github.com/sadaqat120/FYP_FMS.git
cd FYP_FMS
```

### 2. Backend setup
```bash
cd backend
npm install
npm start
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm start
```
