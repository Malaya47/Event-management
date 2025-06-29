# Event Management System

A full-featured event management REST API built with Node.js, Express.js, and MongoDB. This system allows users to create, manage, and register for events with comprehensive authentication and authorization features.

### 👤 Test User Accounts

| Name | Email | Password |
|------|-------|----------|
| Alice Johnson | alice.johnson@email.com | Password123! |
| Bob Smith | bob.smith@email.com | SecurePass456@ |
| Carol Davis | carol.davis@email.com | StrongPwd789# |
| David Wilson | david.wilson@email.com | MyPassword101$ |
| Eva Brown | eva.brown@email.com | SafePassword202% |
| Frank Miller | frank.miller@email.com | ComplexPwd303^ |
| Grace Lee | grace.lee@email.com | SecretPass404& |
| Henry Taylor | henry.taylor@email.com | PrivateKey505* |

## 🧪 Sample Data

The application includes a comprehensive seeding script that creates:
- 8 sample users with different profiles
- 8 diverse events across various categories
- Random registrations to simulate real-world usage


## 🚀 Features

### User Management
- **User Registration & Authentication** - Secure signup and login with JWT tokens
- **Password Encryption** - Bcrypt hashing for secure password storage
- **Profile Management** - User profile information handling

### Event Management
- **Create Events** - Users can create new events with detailed information
- **Edit Events** - Event creators can modify their events
- **Delete Events** - Remove events and associated registrations
- **View Events** - Browse available events (excluding user's own events)
- **Manage Events** - View and manage user's created events

### Registration System
- **Event Registration** - Users can register for events they're interested in
- **Registration Validation** - Prevents duplicate registrations and self-registration
- **Attendee Management** - Event creators can view registered attendees
- **User Registrations** - Users can view their registration history

### Security Features
- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - Comprehensive data validation and sanitization
- **Authorization** - Role-based access control for different operations
- **Data Protection** - Secure handling of sensitive information

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Custom validation utilities
- **Environment**: dotenv for configuration

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/event-management-system.git
   cd event-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/event-management
   JWT_SECRET=your-super-secret-jwt-key
   PORT=3000
   ```

4. **Seed the database (optional)**
   ```bash
   node seed.js
   ```

5. **Start the server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000` (or your specified PORT).

## 🔗 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register a new user | No |
| POST | `/login` | Login user | No |

### Event Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/event/create` | Create a new event | Yes |
| PATCH | `/event/edit/:eventId` | Edit an existing event | Yes |
| DELETE | `/event/delete/:eventId` | Delete an event | Yes |
| GET | `/event/manageEvents` | Get user's created events | Yes |
| GET | `/event/events` | Get all available events | Yes |

### Registration Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/attendees/register` | Register for an event | Yes |
| GET | `/attendees/:eventId/registered` | Get event attendees | Yes |
| GET | `/user/registrations` | Get user's registrations | Yes |


## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication system
- **Password Hashing**: Bcrypt with salt rounds for password security
- **Input Validation**: Comprehensive validation for all user inputs
- **Authorization Checks**: Users can only modify their own events
- **Data Sanitization**: Prevention of malicious data injection








