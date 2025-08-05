// server/scripts/seed-demo-products.js

const mongoose = require('mongoose');
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-ecommerce';

const DEMO_PRODUCTS = [
  // Electronics
  { _id: '674d8b8c123456789abcdef1', name: 'Premium Wireless Headphones', description: 'High-quality wireless headphones with noise cancellation', price: 299, image: '🎧', category: 'Electronics', rating: 4.8, reviews: 124, stock: 100 },
  { _id: '674d8b8c123456789abcdef2', name: 'Smart Fitness Tracker', description: 'Track your fitness goals with this smart device', price: 199, image: '⌚', category: 'Electronics', rating: 4.6, reviews: 89, stock: 100 },
  { _id: '674d8b8c123456789abcdef3', name: 'Professional Camera', description: 'Capture stunning photos with professional quality', price: 899, image: '📸', category: 'Electronics', rating: 4.9, reviews: 256, stock: 100 },
  { _id: '674d8b8c123456789abcdef4', name: 'Gaming Laptop', description: 'High-performance laptop for gaming enthusiasts', price: 1299, image: '💻', category: 'Electronics', rating: 4.7, reviews: 178, stock: 100 },
  { _id: '674d8b8c123456789abcdef5', name: 'Bluetooth Speaker', description: 'Portable speaker with excellent sound quality', price: 149, image: '🔊', category: 'Electronics', rating: 4.5, reviews: 92, stock: 100 },
  { _id: '674d8b8c123456789abcdef6', name: 'Smart Watch', description: 'Stay connected with this feature-rich smartwatch', price: 399, image: '⌚', category: 'Electronics', rating: 4.8, reviews: 203, stock: 100 },
  // Fashion
  { _id: '674d8b8c123456789abcdfa1', name: 'Elegant Red Dress', description: 'Stylish red dress for special occasions', price: 799, image: '👗', category: 'Fashion', rating: 4.7, reviews: 88, stock: 100 },
  { _id: '674d8b8c123456789abcdfa2', name: 'Classic Blue Jeans', description: 'Comfortable and durable blue jeans', price: 499, image: '👖', category: 'Fashion', rating: 4.5, reviews: 120, stock: 100 },
  { _id: '674d8b8c123456789abcdfa3', name: 'Trendy Sneakers', description: 'Trendy sneakers for everyday wear', price: 599, image: '👟', category: 'Fashion', rating: 4.8, reviews: 150, stock: 100 },
  { _id: '674d8b8c123456789abcdfa4', name: 'Elegant Handbag', description: 'Elegant handbag for all occasions', price: 999, image: '👜', category: 'Fashion', rating: 4.6, reviews: 70, stock: 100 },
  { _id: '674d8b8c123456789abcdfa5', name: 'Formal Shirt', description: 'Perfect for office and formal events', price: 399, image: '👔', category: 'Fashion', rating: 4.4, reviews: 65, stock: 100 },
  // Home Appliances
  { _id: '674d8b8c123456789abcdfb1', name: 'Air Purifier', description: 'Keep your home air clean and fresh', price: 499, image: '🌬️', category: 'Home Appliances', rating: 4.6, reviews: 80, stock: 100 },
  { _id: '674d8b8c123456789abcdfb2', name: 'Coffee Maker', description: 'Brew delicious coffee at home', price: 299, image: '☕', category: 'Home Appliances', rating: 4.7, reviews: 110, stock: 100 },
  { _id: '674d8b8c123456789abcdfb3', name: 'Robot Vacuum', description: 'Automatic cleaning for your home', price: 899, image: '🤖', category: 'Home Appliances', rating: 4.8, reviews: 140, stock: 100 },
  { _id: '674d8b8c123456789abcdfb4', name: 'Blender', description: 'Blend smoothies and more', price: 199, image: '🥤', category: 'Home Appliances', rating: 4.5, reviews: 60, stock: 100 },
  // Sports
  { _id: '674d8b8c123456789abcdfc1', name: 'Football', description: 'High-quality football for matches', price: 299, image: '⚽', category: 'Sports', rating: 4.6, reviews: 100, stock: 100 },
  { _id: '674d8b8c123456789abcdfc2', name: 'Badminton Racket', description: 'Lightweight and durable racket', price: 199, image: '🏸', category: 'Sports', rating: 4.7, reviews: 90, stock: 100 },
  { _id: '674d8b8c123456789abcdfc3', name: 'Yoga Mat', description: 'Comfortable mat for yoga and exercise', price: 149, image: '🧘', category: 'Sports', rating: 4.8, reviews: 120, stock: 100 },
  { _id: '674d8b8c123456789abcdfc4', name: 'Cricket Bat', description: 'Professional cricket bat for matches', price: 599, image: '🏏', category: 'Sports', rating: 4.5, reviews: 60, stock: 100 },
  { _id: '674d8b8c123456789abcdfc5', name: 'Basketball', description: 'High-quality basketball for indoor and outdoor', price: 349, image: '🏀', category: 'Sports', rating: 4.7, reviews: 85, stock: 100 },
];

async function seedProducts() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  for (const prod of DEMO_PRODUCTS) {
    // Use upsert to avoid duplicates
    const objectId = new mongoose.Types.ObjectId(prod._id);
    await Product.updateOne(
      { _id: objectId },
      { $setOnInsert: { ...prod, _id: objectId } },
      { upsert: true }
    );
  }
  console.log('Demo products seeded!');
  await mongoose.disconnect();
}

seedProducts().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
}); 