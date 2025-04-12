// app/models/UserCart.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true }, // Füge das Bildfeld hinzu
});

const userCartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
});

const UserCart = mongoose.models.UserCart || mongoose.model('UserCart', userCartSchema);

export default UserCart;
