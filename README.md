# 📝  Task Manager App

It is a full-stack task management app built with **React**, **Context API**, **Tailwind CSS**, **Node.js**, and **MongoDB**. It allows users to create, edit(locally), and manage tasks with auto-save support and tags.

---

## 🚀 Tech Stack

- **Frontend**: React, Context API, Tailwind CSS, Axios  
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)

---

## ✨ Features

- Create and edit tasks with title, description, and tags (edit and deletion Loaclly) 
- Auto-save form data (title, description, tags) to localStorage every 5 seconds  
- Tasks displayed in reverse chronological order  
- Responsive and modern UI  
- Tag chips shown on task cards  

---

## 💡 Capability Task 2 - Auto-Save Draft

- When user types in the form, title/desc/tags are auto-saved to `localStorage` every 5 seconds  
- Key used: `task_draft`  
- On mount, form checks for this draft and preloads it  
- Purpose: Evaluates proactive user-centric thinking  
- Example:
```js
useEffect(() => {
  const interval = setInterval(() => {
    localStorage.setItem("task_draft", JSON.stringify({ title, desc, tags }));
  }, 5000);
  return () => clearInterval(interval);
}, [title, desc, tags]);
```

---

## 📦 Project Structure

```
tasknetic/
├── backend/
│   ├── controller/taskController.js
│   ├── db
|   |   ├──db.js
|   |   ├──taskSchema.js
│   ├── routes/taskRoutes.js
│   └── server.js
├── frontend/
│   ├── components/cardEdit.jsx
│   ├── components/Card.jsx
|   ├── components/CardList.jsx
│   ├── context/TaskContext.jsx
|   ├── service/api.js
│   ├── App.jsx
│   └── main.jsx
```

---

## 🛠️ API Endpoints

- **POST /api/task** — Create task  
- **GET /api/tasks** — Get all tasks  

Request body:
```json
{
  "title": "Sample Title",
  "desc": "Some description",
  "tags": "urgent,react"
}
```

---

## 🧪 Run Locally

```bash
# Clone project
git clone https://github.com/Shivankkumar09/WorkElate_Task_day2.git

# Backend setup
cd backend
npm install
# Create .env with MONGO_URI & PORT
npm start

# Frontend setup
cd ../frontend
npm install
npm run dev
```

---

## 📌 Future Improvements

- ⬜ Add filters, search, priority 
- ⬜ Add backend Routes for edit and delete tasks   
- ⬜ Add auth and user-specific tasks   
- ⬜ Better mobile support

---

