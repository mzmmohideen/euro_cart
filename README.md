# Euro Cart - Hacthon eCommerce B2B Application

A modern, scalable, and feature-rich Hacthon eCommerce web application built to deliver seamless B2B application. This project includes user authentication, product browsing, cart management, order processing, and admin controls.

## Features

- User Authentication (Sign Up, Login)
- Product Catalog with Categories and Filters
- Search Functionality
- Shopping Cart and Wishlist
- Secure Checkout
- Order Management
- Admin Dashboard for Product and Order Management
- Responsive Design for Mobile and Desktop

## Tech Stack

| Layer         | Technology                         |
|--------------|-------------------------------------|
| Frontend     | React
| Backend      | Node.js + Express
| Database     | MongoDB
| Authentication | OAuth2
| Payment      | Business recommendation
| Deployment   | Local

Which includes,

 - Admin Dashboard (CMS)
 - End Business User Application
 - Backend Service

Admin dashboard for managing products and categories with admin authentication.

---

## Features

- User registration and login with JWT authentication
- Role-based protected routes
- Add, edit, delete products
- Add product categories
- Responsive Material UI frontend
- Shows logged-in username on dashboard
- Logout functionality

---

## Tech Stack

- Frontend: React, TypeScript, Material UI, React Router DOM
- Backend: Node.js, Express, MongoDB (Mongoose)
- Authentication: JWT, bcrypt

---

## Architecture
<img width="1321" height="304" alt="euro_cart_architecture" src="https://github.com/user-attachments/assets/1163add4-695d-4cee-b5b0-ace9f7df5868" />

## Live Screenshot
- CMS Panel Login
<img width="539" height="401" alt="image" src="https://github.com/user-attachments/assets/1bd9da0a-50de-48c8-a102-4e5170f99dd2" />

- CMS Panel Register
<img width="554" height="454" alt="image" src="https://github.com/user-attachments/assets/4b4062e8-ba9d-4f85-a421-c26af5aa89a2" />   

- CMS Panel after Loggedin
<img width="1896" height="796" alt="image" src="https://github.com/user-attachments/assets/e2dfd67c-1469-40f8-b6a1-acee6c394f38" />

- Add Product
<img width="1674" height="844" alt="image" src="https://github.com/user-attachments/assets/85849e25-93a0-4eb8-8b4c-8c8fdb63c3b7" />

- After Adding Product
<img width="1919" height="685" alt="image" src="https://github.com/user-attachments/assets/783c7c4c-dd1b-45b4-bf12-80c0e88627cf" />

- Edit Option
<img width="858" height="796" alt="image" src="https://github.com/user-attachments/assets/afb2f4bb-3a46-4432-88ec-03dc2f3e435e" />

- Delete Option
<img width="1283" height="392" alt="image" src="https://github.com/user-attachments/assets/5b346772-332f-4ae7-8eef-699e8520d86b" />


---

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB instance (local or cloud)

---

### Application Setup

2. Install dependencies:

```bash
yarn install```

3. Create a .env file in project Root with:
```ini
PORT=5000
MONGO_URI=mongo_connection_string
JWT_SECRET=jwt_secret_key
SALT_ROUNDS=10
```

4. Run the Application Service:
```bash
yarn start
```
The backend API server will run at http://localhost:5000
The frontend Application server will run at http://localhost:5173
The CMS Application will run at http://localhost:5174

## API Endpoints

# Auth

| Method | Endpoint        | Description         | Request Body                    |
| ------ | --------------- | ------------------- | ------------------------------- |
| POST   | `/api/register` | Register a new user | `{ username, email, password }` |
| POST   | `/api/login`    | Login and get token | `{ email, password }`           |

# Product

| Method | Endpoint            | Description          | Request Body                                       |
| ------ | ------------------- | -------------------- | -------------------------------------------------- |
| GET    | `/api/products`     | Get all products     | —                                                  |
| POST   | `/api/products`     | Add new product      | `{ name, price, description, category, imageUrl }` |
| PUT    | `/api/products/:id` | Update product by id | `{ name, price, description, category, imageUrl }` |
| DELETE | `/api/products/:id` | Delete product by id | —                                                  |

## License

- HCL Euro Cart © 2025