import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onCategoryAdded: (newCategory: string) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ open, onClose, onCategoryAdded }) => {
  const [category, setCategory] = useState("");

  const handleAddCategory = () => {
    if (!category.trim()) return alert("Category name cannot be empty");

    // Call backend API to save category (or just pass back to parent)
    onCategoryAdded(category.trim());
    setCategory("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Category Name"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAddCategory}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;
