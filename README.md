# EduNudge – AI-Powered Personalized Education Platform

EduNudge is an AI-driven learning assistant designed to personalize education through adaptive quizzes, flashcards, and study recommendations. Built for students, teachers, and institutions, it transforms static learning into interactive and tailored learning experiences using OpenAI's GPT.

---

## Features

-  **Topic-Based Quiz Generation** (GPT API powered)
-  **Flashcards Creator** for revision
-  **Personalized Dashboard** showing performance
-  **User Login & Progress Tracking**
-  AI-generated content based on difficulty & topic

---

## Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Frontend    | React, Tailwind CSS, Vite   |
| Backend     | Node.js, Express.js         |
| AI Model    | OpenAI GPT (via API)        |
| Database    | MongoDB (MongoDB Atlas)     |
| Hosting     | Vercel (Frontend), Render (Backend) |

---

## Project Structure

project/<br>
├── frontend/<br>
│ ├── src/<br>
│ ├── public/<br>
│ └── vite.config.ts<br>
├── backend/<br>
│ ├── server.js<br>
│ └── routes/, controllers/, models/<br>



---

## How to Run

### Backend Setup

```bash
cd backend
npm install
# Add your OpenAI API key in a `.env` file as:
# OPENAI_API_KEY=your_key_here
npm start


