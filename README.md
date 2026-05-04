# Task Manager Application

A full-stack task management application built with **Spring Boot** and **React** that allows users to create, manage, and organize their tasks efficiently with JWT-based authentication.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure login and signup with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Responsive UI**: Modern React frontend with Tailwind CSS styling
- **RESTful API**: Complete REST API with Spring Boot
- **Form Validation**: Input validation on both client and server side
- **Secure Password Storage**: Password hashing and encryption
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠 Tech Stack

### Backend
- **Framework**: Spring Boot 3.4.5
- **Java**: JDK 21
- **Security**: Spring Security with JWT (JSON Web Tokens)
- **Database**: H2 (Development) / MySQL (Production)
- **ORM**: Spring Data JPA & Hibernate
- **Build Tool**: Gradle
- **API Documentation**: RESTful API

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: React Icons
- **Styling**: CSS

## 📁 Project Structure

```
.
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/taskmanager/
│   │   │   │   ├── controller/       # REST Controllers
│   │   │   │   ├── service/          # Business Logic
│   │   │   │   ├── entity/           # JPA Entities
│   │   │   │   ├── repository/       # Data Access Layer
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── security/         # Security Configuration
│   │   │   │   ├── config/           # Application Configuration
│   │   │   │   └── TaskManagerApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                     # Unit Tests
│   └── build.gradle
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable Components
│   │   ├── pages/              # Page Components
│   │   ├── services/           # API Services
│   │   ├── context/            # React Context for State
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 📋 Prerequisites

Before running this project, ensure you have installed:

- **Java Development Kit (JDK)**: Version 21 or higher
  - Download from [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or use [OpenJDK](https://openjdk.java.net/)
- **Node.js**: Version 16 or higher
  - Download from [Node.js Official Website](https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js
- **Git**: For version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Vipuldeshwal/Task_Management_App.git
cd Task_Management_App
```

### 2. Backend Setup

```bash
cd backend

# Make gradlew executable (macOS/Linux)
chmod +x gradlew

# Build the project
./gradlew build

# Or use Gradle directly (if installed)
gradle build
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
# or
yarn install
```

## 🎯 Running the Application

### Running the Backend

```bash
cd backend

# Start the Spring Boot application
./gradlew bootRun
```

The backend server will start on `http://localhost:8080`

### Running the Frontend

In a new terminal window:

```bash
cd frontend

# Start the development server
npm run dev
# or
yarn dev
```

The frontend will typically run on `http://localhost:5173` (Vite default)

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
./gradlew build
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get all user tasks
- `GET /api/tasks/{id}` - Get task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

## 🔐 Environment Variables

### Backend (application.properties)

```properties
spring.application.name=Task Manager
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:h2:mem:task_manager
spring.datasource.username=sa
spring.datasource.password=

# JWT Configuration
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Frontend (.env or .env.local)

```
VITE_API_URL=http://localhost:8080/api
```

## 📝 Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes and commit: `git commit -m "Add your message"`
3. Push to the branch: `git push origin feature/your-feature-name`
4. Open a Pull Request

## 🐛 Troubleshooting

### Backend Issues
- **Port 8080 already in use**: Change `server.port` in `application.properties`
- **Java version mismatch**: Ensure you have JDK 21 installed
- **Build fails**: Try `./gradlew clean build`

### Frontend Issues
- **Port conflict**: Vite will automatically use the next available port
- **Dependencies not found**: Delete `node_modules` and run `npm install` again
- **Build errors**: Check Node.js version compatibility

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [JWT Documentation](https://jwt.io)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Vipul Deshwal**

- GitHub: [@Vipuldeshwal](https://github.com/Vipuldeshwal)

## 📧 Support

If you have any questions or issues, please open an issue on GitHub or contact the maintainer.

---

**Happy Task Managing! 🚀**
