📝 Advanced Blogging Website with CMS

This project is a feature-rich blogging platform with a built-in Content Management System (CMS). It enables authors, editors, and administrators to create, manage, and publish blog posts seamlessly. Designed with scalability and modularity in mind, the platform supports modern web technologies, responsive design, and secure authentication.

* **Features
- CMS Dashboard for managing posts, categories, tags, and users
- Rich Text Editor with Markdown/HTML support
- Role-based Access Control (Admin, Editor, Author, Reader)
- SEO-friendly URLs and metadata management
- Responsive UI/UX optimized for desktop and mobile
- Comment System with moderation tools
- Media Management (upload images, files)
- Search & Filtering for posts and categories
- Drafts & Scheduling for future publishing
- API-first Architecture for extensibility (REST/GraphQL

## Project Structure

── client/               # Frontend code (React/Next.js)
├── server/               # Backend API (Node.js/Express)
├── config/               # Environment & configuration files
├── models/               # Database models
├── controllers/          # Business logic
├── routes/               # API routes
├── public/               # Static assets
└── README.md             # Project documentation

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
