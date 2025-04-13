// models/Favorite.js
import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true  // Es wird pro Nutzer nur ein Dokument geführt
  },
  productIds: [{
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  }]
});

export default mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);
