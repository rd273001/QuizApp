# QuizApp

This is a full-stack online quiz application that allows users to register, log in, and participate in multiple-choice quizzes. Users can view available quizzes, take quizzes, and view their results. This project includes both the frontend (built with React, Vite, and Tailwind CSS) and the backend (built with Node.js, Express, and MongoDB).

## Check Live Demo

You can check the live version of the project here : [QuizApp](https://quizapp4.netlify.app)

## Features

- User Authentication (Login, Register, Logout)
- Protected routes and sessions management
- Create, view, and participate in multiple-choice quizzes
- Display quiz results and scores
- Responsive design for various devices
- Error handling and notifications

## Technologies Used

- **React.js** [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react)](https://react.dev)
- **Node.js** [![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=nodedotjs&logoColor=white)](https://nodejs.org)
- **Express.js** [![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&labelColor=2e2e2e)](https://expressjs.com/)
- **MongoDB** [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/docs/atlas/)
- **Mongoose**  [![Mongoose](https://img.shields.io/badge/Mongoose-47A248?logo=mongoose&logoColor=red&labelColor=2e2e2e)](https://mongoosejs.com/)
- **TanStack Query** [![TanStack Query](https://img.shields.io/badge/TanStack_Query-ff3e00?logo=react%20query&logoColor=white&labelColor=2e2e2e)](https://tanstack.com/query/latest/docs/framework/react/overview)
- **React Hook Form** [![React Hook Form](https://img.shields.io/badge/React_Hook_Form-%23EC5990.svg?logo=reacthookform&logoColor=white)](https://www.react-hook-form.com/)
- **React Router** [![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com)
- **React Toastify** [![React Toastify](https://img.shields.io/badge/React_Toastify-F1D902?logo=react&logoColor=white&labelColor=2e2e2e)](https://fkhadra.github.io/react-toastify/introduction)
- **Zod** [![Zod](https://img.shields.io/badge/Zod-006b8f?logo=zod&logoColor=white)](https://zod.dev)

---

## Setup Instructions

### Prerequisites

- **Node.js** and **npm** installed globally
- **MongoDB** database (local or remote)

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rd273001/QuizApp.git
   cd QuizApp
   ```

2. **Install backend dependencies:**
   Using npm: ```npm install```
   OR
   Using yarn: ```yarn```

3. **Create a .env file in the server folder:**
   - PORT=5000
   - MONGO_URI=mongodb+srv://<your_mongo_uri>
   - JWT_SECRET=your_jwt_secret

4. **Start the server:**
   Using npm: ```npm run dev```
   OR
   Using yarn: ```yarn dev```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../client
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

3. **Create a .env file in the client folder with the following:**

   ```bash
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the frontend development server:**

   ```bash
   npm run dev
   ```

5. **Access the application by navigating to <http://localhost:3000> in your browser.**

---

## Libraries and Dependencies

### Backend

- **Node.js:** Runtime environment for JavaScript.
- **Express:** Server framework for handling API routes and requests.
- **Mongoose:** ODM for MongoDB, used to manage data models and interactions with the MongoDB database.
- **jsonwebtoken:** For creating and verifying JWT tokens, enabling secure sessions for user authentication.
- **bcryptjs:** Password hashing for securely storing and comparing passwords.
- **dotenv:** For loading environment variables securely.

### Frontend

- **Vite:** Fast and lightweight development server for building and serving the frontend application.
- **React:** Component-based library for building the user interface.
- **React Router:** Handles navigation and routing between pages.
- **TanStack Query:** Data-fetching library that manages caching, refetching, and synchronization.
- **React Toastify:** Provides toast notifications for real-time feedback (e.g., login success, error messages).
- **Zod:** JavaScript schema validation library used for form validation.
- **axios:** HTTP client used for making API requests to the backend.
- **react-hook-form:** Library for managing form state and validation.

---

## Folder Structure

### Backend (server folder)

- **controllers/:** Contains logic for handling requests to specific routes (e.g., authController, quizController).
- **models/:** Defines data models with Mongoose schemas.
- **routes/:** API route definitions for user authentication, quiz management, etc.
- **middleware/:** Custom middleware for authorization and error handling.

### Frontend (client folder)

- **src/components/:** Reusable UI components such as LoadingIndicator, Header, ProtectedRoute, etc.
- **src/context/:** Provides context for managing global states like authentication.
- **src/pages/:** Page components for Home, Login, Register, QuizList, etc.
- **src/services/:** Contains helper functions for making API requests.

---

## API Endpoints

### Authentication

| Method | Endpoint          | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | `/auth/register` | Register new user      |
| POST   | `/auth/login`    | Log in user            |
| GET    | `/auth/restore`  | Restore user session   |

### Quiz Management

| Method | Endpoint         | Description              |
| ------ | ----------------- | ------------------------ |
| GET    | `/quiz/all`      | Fetch all quizzes       |
| GET    | `/quiz/:id`     | Fetch quiz details      |
| POST   | `/quiz/create`  | Create a new quiz       |
| GET    | `/quiz/:id/submit` | Submit quiz & fetch quiz results |

---

## Usage and Workflow

1. User Registration: New users can sign up, and their details are securely stored in MongoDB.
2. Login and Session Management: Users log in, receive a token, and can resume sessions on page refresh.
3. Protected Routes: Certain routes (e.g., QuizList, CreateQuiz) are protected and accessible only when logged in.
4. Quiz Management: Logged-in users can view available quizzes, create new ones, and view detailed quiz results.
5. Session Restore: If a user has an active session (JWT token), they are redirected away from login/register pages.

---

## Contributing

1. Fork the repository
2. Create a new branch: git checkout -b feature/YourFeature
3. Commit your changes: git commit -m 'New feature added'
4. Push to the branch: git push origin feature/YourFeature
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

Special thanks to any contributors, library authors, or tutorials that helped in the creation of this project.
