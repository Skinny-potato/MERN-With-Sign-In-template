# 🛡️ Full-Stack Authentication Template (Monorepo)

A complete, production-ready authentication template with:

- 🔐 User Registration & Login  
- 📧 Password Reset via Gmail using Nodemailer  
- 🧱 Structured Monorepo with Frontend + Backend  
- 🧪 Easily extendable for future features  

---

## 📁 Project Structure

```
/project-root
│
├── /Frontend     # React frontend (Vite or CRA)
│   ├── src/
│   └── ...
│
├── /Backend      # Express.js backend
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   └── ...
│
├── package.json  # Root workspace (optional)
└── README.md
```

---

## 🚀 Features

- ✅ JWT-based authentication  
- ✅ Secure password hashing with bcrypt  
- ✅ Email verification & reset password via Gmail (Nodemailer)  
- ✅ Environment-based config  
- ✅ Monorepo setup (frontend & backend together)  
- ✅ Clean codebase with modular structure  

---

## 🧰 Tech Stack

### Frontend:
- **React.js**
- **Axios**
- **React Router DOM**
- **Vite

### Backend:
- **Node.js & Express**
- **MongoDB + Mongoose**
- **Nodemailer** (Gmail SMTP)
- **bcrypt**
- **JWT**

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Skinny-potato/MERN-With-Sign-In-template.git
cd your-repo-name
```

---

### 2. Setup Environment Variables

Create `.env` files in both `Frontend/` and `Backend/` folders.

#### 🔒 Backend `.env` example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> ⚠️ You must enable **"App Passwords"** in Gmail and use that instead of your Gmail password.

---

### 3. Install Dependencies

```bash
# From project root
cd Frontend && npm install
cd ../Backend && npm install
```
---

## 🔐 Authentication Flow

1. **Register** — User signs up with email/password.  
2. **Login** — User gets JWT token on successful login.  
3. **Forgot Password** — Sends reset link via Gmail (Nodemailer).  
4. **Reset Password** — User updates password using secure token.  

---

## 📬 Email Setup (Gmail + Nodemailer)

- Use Gmail SMTP
- Use App Passwords (from Google Account > Security > App Passwords)
- Make sure “Less secure app access” is enabled or App Password is used

---

## 🧪 Future Improvements -IF im not lazy - i will add this setups too

- Add Google / GitHub OAuth  
- 2FA with OTP  
- Rate limiting on auth routes  
- Email templates using Handlebars or MJML  
- Dockerize the app  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 💬 Questions?

Feel free to reach out via [issues][(https://github.com/Skinny-potato/MERN-With-Sign-In-template/issues)].

---
