const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: quantity || 1 }]
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({ productId, quantity: quantity || 1 });
      }
    }

    await cart.save();

    // Populate products to calculate total price
    await cart.populate('items.productId', 'price');

    // Calculate total items & price
    const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.items.reduce((acc, item) => acc + (item.quantity * item.productId.price), 0);

    res.json({
      message: "Product added to cart",
      totalItems,
      totalPrice,
      cart
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find the cart for this user and populate product details
    const cart = await Cart.findOne({ userId })
      .populate('items.productId', 'name price');

    if (!cart) {
      return res.json({
        totalItems: 0,
        totalPrice: 0,
        items: []
      });
    }

    // Calculate totals
    const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.items.reduce((acc, item) => acc + (item.quantity * item.productId.price), 0);

    res.json({
      totalItems,
      totalPrice,
      items: cart.items
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
