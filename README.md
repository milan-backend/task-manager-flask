Task Manager – Full Stack Application

Overview

This project is a small full-stack task management system built as part of an engineering assessment.
It allows users to create projects and manage tasks within those projects.

The system focuses on clear architecture, maintainability, and correctness rather than large feature sets.

Users can:

• Register and login securely
• Create projects
• Create tasks within projects
• Update task status (TODO → IN_PROGRESS → DONE)
• View and manage their own projects and tasks

The application follows a REST API architecture with a Flask backend and a React frontend.

---

Tech Stack

Backend

- Python
- Flask (REST API)
- SQLAlchemy (ORM)
- JWT Authentication
- Alembic (database migrations)

Frontend

- React
- Tailwind CSS
- Fetch API

Database

- PostgreSQL (any relational database compatible with SQLAlchemy can be used)

---

Architecture

The project is separated into backend and frontend for clear responsibilities.

task_manager_flask
│
├── routes/ # API route handlers
├── models/ # Database models
├── dependencies/ # Authentication helpers
├── migrations/ # Database migrations
│
├── frontend/ # React frontend
│
├── main.py # Flask app entry point
├── database.py # Database connection
└── requirements.txt

Backend Responsibilities

The Flask backend handles:

• Authentication
• Business logic
• Database access
• API responses

Frontend Responsibilities

The React frontend handles:

• UI rendering
• User interaction
• Calling backend APIs
• Managing authentication tokens

---

Database Design

The application uses a relational database with the following core models.

User

User
----
id
email
password_hash

Project

Project
-------
id
name
description
owner_id

Each project belongs to a user.

Task

Task
----
id
title
description
status
project_id
assigned_to

Task status is restricted using an Enum:

TODO
IN_PROGRESS
DONE

Enums help prevent invalid states in the system.

---

Authentication

Authentication is implemented using JWT (JSON Web Tokens).

Flow:

1. User registers with email and password
2. Password is hashed before storing in database
3. User logs in
4. Backend generates a JWT access token
5. Token is stored on the frontend
6. Token is sent with requests in the Authorization header

Example:

Authorization: Bearer <token>

Protected endpoints validate this token before processing requests.

---

API Endpoints

Authentication

POST "/auth/signup"
Register a new user

POST "/auth/login"
Authenticate user and return access token

---

Projects

GET "/projects"
Get all projects for current user

POST "/projects"
Create new project

---

Tasks

GET "/tasks/<project_id>"
Get tasks for a project

POST "/tasks"
Create a new task

PATCH "/tasks/<task_id>"
Update task status or assigned user

---

Frontend Structure

frontend/src
│
├── api/ # API communication
├── components/ # Reusable UI components
├── pages/ # Application pages
│
├── LoginPage.js
├── RegisterPage.js
├── ProjectsPage.js
└── TasksPage.js

Pages communicate with the backend through the api layer.

---

Key Technical Decisions

Flask for Backend

Flask was chosen because it provides a lightweight framework for building REST APIs with clear routing and flexibility.

SQLAlchemy ORM

SQLAlchemy simplifies database access and ensures database models remain consistent with Python objects.

JWT Authentication

JWT provides stateless authentication suitable for API-based applications.

React Frontend

React enables a component-based architecture and clean separation between UI and backend logic.

---

Error Handling

The API returns clear responses for invalid operations.

Examples:

User already exists
Invalid credentials
Unauthorized access
Project not found
Task not found

This improves observability and debugging.

---

Tradeoffs and Limitations

This project intentionally focuses on simplicity and maintainability.

Limitations:

• No role-based permissions
• No project member system
• Minimal UI validation
• No automated tests

These features could be added in future iterations.

---

Future Improvements

Possible improvements include:

• Role-based access control
• Task assignment notifications
• Drag-and-drop task boards
• API rate limiting
• Unit and integration testing
• Docker deployment

---

Running the Project

Backend

Install dependencies:

pip install -r requirements.txt

Run the server:

python main.py

---

Frontend

Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the development server:

npm start

---

AI Usage

AI tools were used to assist with:

• Frontend UI improvements
• Code structuring suggestions
• Debugging errors

All generated code was reviewed and verified manually before integration.

---

Author

Milan Charan