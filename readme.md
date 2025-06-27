# 📚 BookNest

BookNest is an online bookstore web application built using **Node.js**, **Express.js**, and **MongoDB**. It allows users to browse books, register/login, and place orders. Sellers can upload and manage book listings, while the admin can oversee platform activity.

---

## 🚀 Features

### 👤 User
- Register & login
- Browse available books
- View book details
- Add books to cart
- Place orders

### 🛍️ Seller
- Register/login as a seller
- Add, update, delete books
- View orders related to their books

### 🛠️ Admin
- View all users and sellers
- Remove users/sellers if needed
- Manage books across the platform

---

## 🧱 Tech Stack

- **Backend:** Node.js, Express.js (Express Generator)
- **Templating:** EJS
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT / Session-based (as per your setup)
- **File Upload (optional):** Cloudinary / Multer
- **Styling:** CSS / Bootstrap

---
## 🎥Demo Video: https://drive.google.com/file/d/1EoYCwx5ZolnbXzXHk7-qv5NrYurK3jEP/view?usp=sharing

## 📂 Project Structure (Generated via Express Generator)

booknest/
├── bin/
├── public/
│ ├── images/
│ ├── javascripts/
│ └── stylesheets/
├── routes/
│ ├── index.js
│ ├── users.js
│ └── seller.js
├── views/
│ ├── layouts/
│ ├── books/
│ ├── users/
│ └── ...
├── models/
├── controllers/
├── app.js
├── .env
└── package.json
