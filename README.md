# 📝 Blog Backend API

This is a full-featured **Express.js + MongoDB** backend for a personal blog website, supporting user authentication, blog post management, and admin-based access control (RBAC).

---

## 📁 Folder Structure

```
blog-backend/
├── src/
│   ├── controllers/          # Route logic (auth, posts)
│   ├── middlewares/          # Auth + upload middlewares
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Route definitions
│   ├── utils/                # Markdown, readTime, slugify
│   ├── app.ts                # Express app setup
│   └── server.ts             # Entry point, DB connection
├── .env                      # Environment variables (not committed)
├── package.json              # NPM scripts and dependencies
├── tsconfig.json             # TypeScript config
└── README.md                 # You are here
```

---

## 🚀 Getting Started

### 1. **Clone the repo**

```bash
git clone https://github.com/its-kundan/blog-backend01 .git
cd blog-backend
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Create ****`.env`**** file**

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/blog
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 4. **Run in Dev Mode**

```bash
npm run dev
```

### 5. **Build and Run for Production**

```bash
npm run build
npm start
```

---

## 🌐 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register new user    |
| POST   | `/api/auth/login`    | Login, get JWT token |

### 📚 Blog Routes

| Method | Endpoint           | Auth   | Description           |
| ------ | ------------------ | ------ | --------------------- |
| GET    | `/api/posts/`      | Public | Get all blog posts    |
| GET    | `/api/posts/:slug` | Public | Get blog post by slug |
| POST   | `/api/posts/`      | Admin  | Create new blog post  |
| PUT    | `/api/posts/:id`   | Admin  | Update blog post      |
| DELETE | `/api/posts/:id`   | Admin  | Delete blog post      |

---

## 🔐 Authentication

* Login returns a **JWT token**:

```json
{
  "token": "<JWT_TOKEN>"
}
```

* Add this token in your frontend or Postman under headers:

```http
Authorization: Bearer <JWT_TOKEN>
```

* Protected routes check if user is authenticated and if their `role` is `admin`

---

## 📦 Middleware & Utils

* `authMiddleware.ts` — Verifies token and role
* `upload.ts` — Uploads blog images to Cloudinary
* `markdownToHtml.ts` — Converts markdown to HTML
* `readTime.ts` — Calculates estimated read time
* `slugify.ts` — Converts titles to URL-safe slugs

---

## 🛠 Tech Stack

* Express.js
* MongoDB + Mongoose
* TypeScript
* JWT (Authentication)
* Cloudinary (Image upload)
* Marked (Markdown rendering)

---

## ✅ Deployment Notes

### Render Setup

* Set build command: `npm run build`
* Start command: `npm start`
* Add environment variables from `.env`

---

## ✍️ License

This project is open source and free to use under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests and feedback are welcome!
