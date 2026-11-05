<div align="center">

# 🌾 Farm Management System (FMS): MERN + AI Chat Assistant

**Final-year project (BS Computer Science, Namal University): a full-stack platform that helps small farmers manage crops, livestock and resources, with an AI assistant that answers from the farm's own data.**

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-auth-black?style=for-the-badge&logo=jsonwebtokens)

</div>

> **In one line:** plots, field activities, livestock health and production, resource stores, reminders, PDF reports and an AI chat assistant, in one MERN app built by a team of three with 170+ commits.

## Architecture

```text
React + Tailwind (frontend)  ──►  Express REST API (Node.js)  ──►  MongoDB (Mongoose)
        │                                │
        │                                ├── JWT auth + email verification (Nodemailer)
        └── jsPDF reports                └── AI assistant (see FMS-AI-ChatBot, Gemini)
```


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

## 📃 License

This project was developed as Final Year Project at Namal University and is intended for academic and demonstration purposes.

## Related

- [FMS-AI-ChatBot](https://github.com/sadaqat120/FMS-AI-ChatBot): the AI assistant (Google Gemini, English and Urdu)
- [CC-Project-CropManagement](https://github.com/sadaqat120/CC-Project-CropManagement): cloud-deployed crop module

**Keywords:** farm management system, FMS, agriculture software, MERN stack project, crop management, livestock management, final year project, FYP, React Node MongoDB, AI chatbot for farmers, agritech Pakistan

---

<div align="center">

**Built by [Sadaqat Rasool](https://sadaqatrasool.vercel.app)**, Full-Stack & AI Software Engineer (Next.js · React · Node.js · Python · LLMs)

[Portfolio](https://sadaqatrasool.vercel.app) · [LinkedIn](https://www.linkedin.com/in/sadaqatrasool/) · [Email](mailto:sadaqatrasoolmsr@gmail.com) · Open to remote roles and client projects

</div>
