# RoktoDaan

RoktoDaan is a platform designed to streamline and simplify the process of blood donation and request management. It connects donors and recipients efficiently, providing a robust system for a noble cause.

## IMPORTANT NOTE:

This project is still in development and my current project

## Technologies Used

### Backend

- **Framework:** Express.js
- **Language:** JavaScript
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Other Tools:** JOI (for validation), Mongoose

### Frontend

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Other Tools:** Framer Motion (for animations), Zod, Shadcn

---

## Features

### Backend

- User Authentication (JWT-based): Sign-up, Login, and Role-based access (Donor/Recipient).
- CRUD operations for:
  - Blood Requests
  - Donor Registrations
- Search and Filter functionality for blood requests.
- Secure API endpoints with input validation.
- Modularized and scalable code structure.

### Frontend

- Intuitive and user-friendly UI for:
  - Donor and recipient registration.
  - Viewing, creating, and responding to blood donation requests.
- Responsive design with cross-browser compatibility.
- Integration with backend APIs.
- Interactive animations to enhance user experience.

---

## Installation and Setup

### Prerequisites

- Node.js and npm/yarn installed.
- MongoDB installed and running locally or in the cloud.

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/KshSiaan/roktodaan.git
   cd roktodaan/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure:
   ```env
   PORT=5000
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Run the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and configure:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Access the application at `http://localhost:3000`.

---

## Contact

For inquiries or feedback, reach out to me at [kshsiaan@gmail.com](mailto:kshsiaan@gmail.com).

---

### Acknowledgments

- Open-source contributors and communities.
- Developers and designers who inspired the project.

---

Happy Coding! ❤️
