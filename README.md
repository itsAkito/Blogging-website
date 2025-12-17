
# AI Blogs - Full Stack Blogging Application

A modern full-stack blogging platform built with **React**, **Vite**, and **Node.js/Express**, featuring an admin dashboard for content management and image optimization with ImageKit.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Scripts](#project-scripts)
- [Key Dependencies](#key-dependencies)
- [Contributing](#contributing)

## ✨ Features

### Client (Frontend)
- **Responsive Design**: Built with Tailwind CSS for modern, mobile-friendly UI
- **Blog Viewing**: Browse and read blogs with beautiful formatting
- **Rich Text Support**: Quill editor for rich text content display
- **Comment System**: View and manage comments on blog posts
- **Admin Dashboard**: Secure login and admin panel for content management
- **Blog Management**: Add, edit, and delete blog posts
- **Real-time Notifications**: Toast notifications with react-hot-toast
- **Image Optimization**: ImageKit integration for optimized image delivery
- **Smooth Animations**: Motion animations for enhanced UX

### Server (Backend)
- **RESTful API**: Comprehensive API endpoints for blog and admin operations
- **Authentication**: JWT-based authentication for admin access
- **Database**: MongoDB for scalable data storage
- **Image Management**: ImageKit integration for image upload and optimization
- **File Upload**: Multer middleware for file handling
- **Admin Login**: Secure admin credentials with JWT tokens
- **CORS Enabled**: Cross-origin resource sharing for frontend-backend communication

## 🛠️ Tech Stack

### Frontend
- **React 19.1** - UI library
- **Vite 7.1** - Build tool and dev server
- **React Router DOM 7.9** - Client-side routing
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Quill 2.0** - Rich text editor
- **Axios 1.12** - HTTP client
- **Motion 12.23** - Animation library
- **React Hot Toast 2.6** - Toast notifications
- **Moment.js 2.30** - Date formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1** - Web framework
- **MongoDB with Mongoose 8.18** - Database
- **JWT (jsonwebtoken 9.0)** - Authentication
- **ImageKit** - Image optimization and storage
- **Multer 2.0** - File upload handling
- **Nodemon** - Development server with auto-reload

## 📁 Project Structure

```
AI-Blogs/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Home.jsx            # Home page
│   │   │   ├── Blog.jsx            # Single blog page
│   │   │   └── admin/
│   │   │       ├── Layout.jsx      # Admin layout wrapper
│   │   │       ├── DashBoard.jsx   # Admin dashboard
│   │   │       ├── AddBlog.jsx     # Create new blog
│   │   │       ├── ListBlog.jsx    # List all blogs
│   │   │       ├── Comment.jsx     # Comments management
│   │   │       ├── Login.jsx       # Admin login
│   │   │       └── Sidebar.jsx     # Admin navigation
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── BlogCard.jsx
│   │   │   ├── Bloglist.jsx
│   │   │   ├── BlogTable.jsx
│   │   │   ├── CommentTable.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Newsletter.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx      # Global state management
│   │   ├── assets/
│   │   │   ├── assets.js
│   │   │   └── rich-text-css.txt
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── index.html
│
├── server/                          # Backend Express application
│   ├── configs/
│   │   ├── db.js                   # MongoDB connection
│   │   └── imagekit.js             # ImageKit configuration
│   ├── controllers/
│   │   ├── adminlogin.js           # Admin authentication logic
│   │   └── blogControllers.js      # Blog CRUD operations
│   ├── middlewares/
│   │   ├── auth.js                 # JWT authentication middleware
│   │   └── multer.js               # File upload middleware
│   ├── models/
│   │   ├── Blog.js                 # Blog schema
│   │   └── Comment.js              # Comment schema
│   ├── routes/
│   │   ├── adminRoutes.js          # Admin routes
│   │   └── blogRoutes.js           # Blog routes
│   ├── uploads/                    # Temporary file storage
│   ├── server.js                   # Main server file
│   ├── package.json
│   └── .env                        # Environment variables
│
└── README.md                        # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or MongoDB Atlas account)
- **ImageKit account** (for image optimization)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd AI-Blogs
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
```

### 3. Install Backend Dependencies
```bash
cd ../server
npm install
```

## ⚙️ Environment Setup

### Server Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Database Configuration
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/database?retryWrites=true&w=majority"

# JWT Configuration
JWT_SECRET="your_super_secret_key_here"

# Admin Credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your_secure_password"

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY="your_imagekit_public_key"
IMAGEKIT_PRIVATE_KEY="your_imagekit_private_key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_endpoint"

# Server Port (optional, defaults to 4000)
PORT=4000
```

### ImageKit Setup
1. Create an account at [ImageKit.io](https://imagekit.io)
2. Get your API credentials from the dashboard
3. Add them to the `.env` file

### MongoDB Setup
1. Create a MongoDB Atlas account or use local MongoDB
2. Create a database and get your connection string
3. Add the connection string to `.env` as `MONGODB_URI`

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Start the Backend Server:**
```bash
cd server
npm run server
```
The server will run on `http://localhost:4000` with auto-reload enabled via nodemon.

**Terminal 2 - Start the Frontend Development Server:**
```bash
cd client
npm run dev
```
The frontend will typically run on `http://localhost:5173`.

### Production Mode

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## 📡 API Endpoints

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `GET /dashboard` - Get dashboard data
- Additional admin endpoints as defined in `adminRoutes.js`

### Blog Routes (`/api/add`)
- `GET /` - Get all blogs
- `GET /:id` - Get single blog
- `POST /` - Create new blog (admin only)
- `PUT /:id` - Update blog (admin only)
- `DELETE /:id` - Delete blog (admin only)
- `POST /:id/comments` - Add comment
- `GET /:id/comments` - Get comments

For detailed API documentation, refer to the route files in `server/routes/`.

## 📝 Project Scripts

### Client Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Server Scripts
```bash
npm run server   # Start with nodemon (auto-reload)
npm start        # Start production server
```

## 📦 Key Dependencies

### Frontend
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.1.1 | UI library |
| vite | ^7.1.6 | Build tool |
| react-router-dom | ^7.9.1 | Routing |
| tailwindcss | ^4.1.13 | CSS framework |
| quill | ^2.0.3 | Rich text editor |
| axios | ^1.12.2 | HTTP client |
| react-hot-toast | ^2.6.0 | Notifications |
| motion | ^12.23.16 | Animations |

### Backend
| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.1.0 | Web framework |
| mongoose | ^8.18.3 | MongoDB ODM |
| jsonwebtoken | ^9.0.2 | JWT authentication |
| imagekit | ^6.0.0 | Image service |
| multer | ^2.0.2 | File upload |
| cors | ^2.8.5 | CORS support |
| dotenv | ^17.2.3 | Environment variables |

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for admin authentication:
1. Admin logs in via `/api/admin/login`
2. JWT token is issued and stored in the client
3. Token is included in subsequent requests via headers
4. Auth middleware validates tokens on protected routes

## 🌟 Features in Detail

### Blog Management
- Create blogs with rich text formatting using Quill editor
- Upload images via ImageKit for optimization
- View blog statistics and comments
- Delete and update existing blogs

### Comment System
- Users can comment on blog posts
- Comments are displayed below each blog
- Admin can manage and moderate comments

### Admin Dashboard
- Secure login page
- Dashboard overview
- Blog management interface
- Comment moderation

### Image Optimization
- All images are optimized via ImageKit
- Automatic format conversion and compression
- CDN delivery for fast loading

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the dist folder to your hosting service
```

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables on hosting platform
2. Deploy the server folder
3. Update API endpoints in frontend configuration

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Express.js](https://expressjs.com)
- [Mongoose Docs](https://mongoosejs.com)
- [ImageKit Documentation](https://docs.imagekit.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Quill Editor](https://quilljs.com)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 💡 Tips & Best Practices

- Always keep your `.env` file secure and never commit it to version control
- Use environment-specific configurations for development and production
- Run `npm run lint` regularly to maintain code quality
- Test API endpoints using tools like Postman
- Keep dependencies updated for security patches

---

**Made with ❤️ by the AI Blogs Team**
======
