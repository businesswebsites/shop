// importProducts.js
const mongoose = require('mongoose');
const fs = require('fs');

// MongoDB URL
const mongoDBUrl = 'mongodb://127.0.0.1:27017/shop'; // Ändere dies auf deine MongoDB-Verbindung

// Produkte JSON (dieses JSON kann auch aus einer Datei geladen werden)
const productsJson = require('./products.json'); // Beispiel: ./products.json

// MongoDB Schema für Produkt
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Funktion zum Einfügen der Produkte in die DB
async function insertProducts() {
  try {
    await mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    // Leere die bestehende Collection, wenn du die Produkte überschreiben möchtest
    await Product.deleteMany({});

    // Produkte aus JSON in die MongoDB einfügen
    await Product.insertMany(productsJson.products);

    console.log('Produkte erfolgreich in die Datenbank eingefügt!');
  } catch (error) {
    console.error('Fehler beim Einfügen der Produkte:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Führe das Skript aus
insertProducts();
