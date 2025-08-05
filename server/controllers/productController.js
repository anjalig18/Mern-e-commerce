const Product = require('../models/Product');

// Sample products data to ensure we have products in DB
const SAMPLE_PRODUCTS = [
  {
    _id: '674d8b8c123456789abcdef1',
    name: 'Premium Wireless Headphones',
    price: 299,
    image: '🎧',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    rating: 4.8,
    reviews: 124,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdef2',
    name: 'Smart Fitness Tracker',
    price: 199,
    image: '⌚',
    description: 'Track your fitness goals with this smart device',
    category: 'Electronics',
    rating: 4.6,
    reviews: 89,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdef3',
    name: 'Professional Camera',
    price: 899,
    image: '📸',
    description: 'Capture stunning photos with professional quality',
    category: 'Electronics',
    rating: 4.9,
    reviews: 256,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdef4',
    name: 'Gaming Laptop',
    price: 1299,
    image: '💻',
    description: 'High-performance laptop for gaming enthusiasts',
    category: 'Electronics',
    rating: 4.7,
    reviews: 178,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdef5',
    name: 'Bluetooth Speaker',
    price: 149,
    image: '🔊',
    description: 'Portable speaker with excellent sound quality',
    category: 'Electronics',
    rating: 4.5,
    reviews: 92,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdef6',
    name: 'Smart Watch',
    price: 399,
    image: '⌚',
    description: 'Stay connected with this feature-rich smartwatch',
    category: 'Electronics',
    rating: 4.8,
    reviews: 203,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfa1',
    name: 'Elegant Red Dress',
    price: 799,
    image: '👗',
    description: 'Stylish red dress for special occasions',
    category: 'Fashion',
    rating: 4.7,
    reviews: 88,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfa2',
    name: 'Classic Blue Jeans',
    price: 499,
    image: '👖',
    description: 'Comfortable and durable blue jeans',
    category: 'Fashion',
    rating: 4.5,
    reviews: 120,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfa3',
    name: 'Trendy Sneakers',
    price: 599,
    image: '👟',
    description: 'Trendy sneakers for everyday wear',
    category: 'Fashion',
    rating: 4.8,
    reviews: 150,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfa4',
    name: 'Leather Handbag',
    price: 999,
    image: '👜',
    description: 'Premium leather handbag for all occasions',
    category: 'Fashion',
    rating: 4.9,
    reviews: 60,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfa5',
    name: 'Summer Hat',
    price: 199,
    image: '👒',
    description: 'Lightweight hat for sunny days',
    category: 'Fashion',
    rating: 4.3,
    reviews: 34,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfb1',
    name: 'Modern Sofa',
    price: 2999,
    image: '🛋️',
    description: 'Comfortable modern sofa for your living room',
    category: 'Home',
    rating: 4.6,
    reviews: 45,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfb2',
    name: 'LED Table Lamp',
    price: 299,
    image: '💡',
    description: 'Energy-efficient LED table lamp',
    category: 'Home',
    rating: 4.7,
    reviews: 78,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfb3',
    name: 'Wall Clock',
    price: 149,
    image: '🕰️',
    description: 'Stylish wall clock for home decor',
    category: 'Home',
    rating: 4.4,
    reviews: 32,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfb4',
    name: 'Kitchen Set',
    price: 499,
    image: '🍽️',
    description: 'Complete kitchen utensil set',
    category: 'Home',
    rating: 4.8,
    reviews: 54,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfb5',
    name: 'Cozy Blanket',
    price: 399,
    image: '🛏️',
    description: 'Soft and cozy blanket for all seasons',
    category: 'Home',
    rating: 4.9,
    reviews: 80,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfc1',
    name: 'Football',
    price: 299,
    image: '⚽',
    description: 'Durable football for outdoor play',
    category: 'Sports',
    rating: 4.7,
    reviews: 110,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfc2',
    name: 'Tennis Racket',
    price: 799,
    image: '🎾',
    description: 'Lightweight tennis racket for all levels',
    category: 'Sports',
    rating: 4.6,
    reviews: 70,
    inStock: true
  },
  {
    _id: '674d8b8c123456789abcdfc3',
    name: 'Yoga Mat',
    price: 249,
    image: '🧘',
    description: 'Non-slip yoga mat for fitness routines',
    category: 'Sports',
    rating: 4.8,
    reviews: 95,
    inStock: true
  }
];

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const product = await Product.create({ name, price, description, category, image });
    res.status(201).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    
    // If not found in DB, check sample products
    if (!product) {
      product = SAMPLE_PRODUCTS.find(p => p._id === req.params.id);
    }
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    console.log('Product found:', product.name);
    res.json(product);
  } catch (err) {
    console.error('Get product by ID error:', err);
    
    // Try to find in sample products as fallback
    const product = SAMPLE_PRODUCTS.find(p => p._id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, image } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category, image },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Initialize sample products in database (utility function)
exports.initializeSampleProducts = async () => {
  try {
    const existingProducts = await Product.countDocuments();
    
    if (existingProducts === 0) {
      console.log('No products found, creating sample products...');
      
      for (const productData of SAMPLE_PRODUCTS) {
        await Product.create(productData);
      }
      
      console.log('Sample products created successfully');
    } else {
      console.log(`Database already has ${existingProducts} products`);
    }
  } catch (error) {
    console.error('Error initializing sample products:', error);
  }
};