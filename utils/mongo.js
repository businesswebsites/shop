// utils/mongo.js
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://127.0.0.1:27017/shop'; // MongoDB URL

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Datenbank verbunden');
  } catch (error) {
    console.error('Fehler bei der Verbindung zur Datenbank', error);
  }
}
