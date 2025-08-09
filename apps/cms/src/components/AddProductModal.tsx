import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onProductAdded: (product: Product) => void;
  productToEdit?: Product | null;
}

export default function AddProductModal({
  open,
  onClose,
  onProductAdded,
  productToEdit = null,
}: AddProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Prefill form fields on open or when productToEdit changes
  useEffect(() => {
    if (productToEdit && open) {
      setName(productToEdit.name);
      setPrice(productToEdit.price.toString());
      setDescription(productToEdit.description);
      setCategory(productToEdit.category);
      setImageUrl(productToEdit.imageUrl);
    } else if (open) {
      // Reset fields when adding new product
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImageUrl("");
    }
  }, [productToEdit, open]);

  const handleSubmit = () => {
    const productData = {
      name,
      price: parseFloat(price),
      description,
      category,
      imageUrl,
    };

    if (productToEdit) {
      // Edit existing product - PUT request
      fetch(`http://localhost:5000/api/products/${productToEdit._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })
        .then((res) => res.json())
        .then((data) => {
          onProductAdded(data);
          onClose();
        })
        .catch((err) => {
          console.error("Failed to update product:", err);
          alert("Failed to update product");
        });
    } else {
      // Add new product - POST request
      fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })
        .then((res) => res.json())
        .then((data) => {
          onProductAdded(data);
          onClose();
        })
        .catch((err) => {
          console.error("Failed to add product:", err);
          alert("Failed to add product");
        });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{productToEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Product Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Price"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Image URL"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {productToEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
