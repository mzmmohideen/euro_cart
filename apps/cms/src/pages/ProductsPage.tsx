// apps/cms/src/pages/ProductsPage.tsx

import React, { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setProductData({ name: "", description: "", price: "", imageUrl: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        alert("✅ Product added successfully!");
        handleClose();
      } else {
        alert("❌ Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error adding product");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold">
            Products
          </Typography>
          <Button variant="contained" onClick={handleOpen}>
            Add Product
          </Button>
        </Stack>
      </Paper>

      {/* Add Product Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
