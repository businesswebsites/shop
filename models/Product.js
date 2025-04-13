import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  productId: { type: Number, unique: true, required: true },
  description: { type: String }, 
  options: [{ type: String }],
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
