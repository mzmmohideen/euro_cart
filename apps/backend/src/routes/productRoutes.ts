import { Router } from "express";
import { Product } from "../models/Product";

const router = Router();

// Product Category
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/products - Add new product
router.post("/", async (req, res) => {
  try {
    const { name, price, description, category, imageUrl } = req.body;

    if (!name || !price || !description || !category || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({ name, price, description, category, imageUrl });
    await newProduct.save();

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, imageUrl } = req.body;

    if (!name || !price || !description || !category || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category, imageUrl },
      { new: true } // return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
