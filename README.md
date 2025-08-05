# 🛒 MERN eCommerce

A full-stack eCommerce web application built with the **MERN stack**: MongoDB, Express.js, React.js, and Node.js.

---

## 🚀 Features

### 👤 User
- Sign Up / Login
- Browse products
- Add items to cart
- Checkout

### 🛡️ Admin
- Login with admin credentials
- Add, update, delete products
- Manage users/orders (extendable)

---

## 🧱 Tech Stack

| Category    | Technology            |
|-------------|------------------------|
| Frontend    | React.js               |
| Backend     | Node.js, Express.js    |
| Database    | MongoDB + Mongoose     |
| Auth        | bcryptjs, JWT (optional) |
| Styling     | CSS / Bootstrap        |

---

## 📁 Project Structure

mern-ecommerce/
├── client/                   # React frontend
├── models/                  # Mongoose schemas (optional)
├── routes/                  # Express route handlers (optional)
├── test-admin-login.js      # Admin login test
├── test-password.js         # Password hashing test
├── verify-admin.js          # Admin validation via DB
├── package.json             # Backend dependencies
├── client/package.json      # Frontend dependencies
└── .env                     # Environment variables (not included)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd mern-ecommerce

2️⃣ Install Dependencies

Backend

npm install

Frontend

cd client
npm install


⸻

3️⃣ Create .env File

In the root directory:

PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-ecommerce
JWT_SECRET=your_jwt_secret_key

Make sure MongoDB is running locally or use MongoDB Atlas.

⸻

4️⃣ Run the App

Backend

npm start
# or
node index.js

Frontend

cd client
npm start

Access the app at http://localhost:3000

⸻

🔐 Authentication

User Signup/Login
	•	User credentials stored in MongoDB
	•	Passwords hashed using bcryptjs

Admin Login
	•	Can be verified via:
	•	verify-admin.js (checks MongoDB)
	•	test-admin-login.js (manual test script)

⸻

📬 API Endpoints (Expected)

Method	Route	Purpose
POST	/user/signup	Register a user
POST	/user/login	Login a user
POST	/admin/login	Login as admin
GET	/products	View all products
POST	/products	Add product (admin)
PUT	/products/:id	Update product
DELETE	/products/:id	Delete product
GET	/cart	View cart
POST	/cart/add	Add item to cart
POST	/checkout	Place an order


⸻

📌 Notes
	•	You can expand the app with:
	•	Product reviews
	•	Payment integration (Stripe, Razorpay)
	•	Admin dashboard
	•	This project is meant for educational/demo purposes.

⸻

🤝 License

This project is open-source and free to use under the MIT License.

---
