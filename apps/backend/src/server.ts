import express from "express";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cors from "cors";
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS before routes
app.use(cors({
  origin: "http://localhost:5174", // Allow frontend dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Euro Cart API is running");
});

app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
