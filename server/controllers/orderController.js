const Order = require('../models/Order');

// Place a new order
exports.placeOrder = async (req, res) => {
  try {
    console.log('Received order request:', req.body);
    
    const { userId, items, totalAmount, address, paymentMethod, deliveryDate } = req.body;
    
    // Validate required fields
    if (!userId || !items || !totalAmount || !address || !paymentMethod || !deliveryDate) {
      console.log('Missing required fields:', { userId, items: !!items, totalAmount, address: !!address, paymentMethod, deliveryDate });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate address fields
    if (!address.street || !address.city || !address.state || !address.postalCode) {
      console.log('Incomplete address:', address);
      return res.status(400).json({ message: 'Complete address is required' });
    }

    // Set payment status based on payment method
    const paymentStatus = paymentMethod === 'cod' ? 'cod_pending' : 'pending';

    // Add price to each item
    const itemsWithPrice = items.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price || 0
    }));

    console.log('Creating order with data:', {
      user: userId,
      userType: typeof userId,
      items: itemsWithPrice.length,
      totalAmount,
      paymentMethod,
      paymentStatus
    });

    const order = await Order.create({
      user: userId,
      items: itemsWithPrice,
      totalAmount,
      address,
      paymentMethod,
      paymentStatus,
      deliveryDate: new Date(deliveryDate),
      orderStatus: 'processing'
    });

    console.log('Order created with user field:', order.user);
    console.log('Order user field type:', typeof order.user);
    console.log('Order user field toString:', order.user.toString());

    console.log('Order created successfully:', order._id);
    
    // Verify the order was saved by fetching it back
    const savedOrder = await Order.findById(order._id);
    console.log('Saved order verification:', {
      id: savedOrder._id,
      user: savedOrder.user,
      userType: typeof savedOrder.user,
      userToString: savedOrder.user.toString()
    });

    await order.populate('items.product');
    
    console.log('Order populated and ready to send');
    
    res.status(201).json({ 
      order,
      message: paymentMethod === 'cod' 
        ? 'Order placed successfully! Pay on delivery.' 
        : 'Order placed successfully!' 
    });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log('getUserOrders called with userId:', userId);
    
    if (!userId) {
      console.log('No userId provided in query');
      return res.status(400).json({ message: 'userId is required' });
    }
    
    console.log('Searching for orders with user:', userId);
    console.log('User ID type:', typeof userId);
    
    // First, let's check if there are any orders at all in the database
    const totalOrders = await Order.countDocuments();
    console.log('Total orders in database:', totalOrders);
    
    // Get all orders to see what's in the database
    const allOrders = await Order.find().limit(5);
    console.log('Sample orders in database:', allOrders.map(o => ({
      id: o._id,
      user: o.user,
      userType: typeof o.user,
      orderNumber: o.orderNumber
    })));
    
    // Try both string and ObjectId search
    let orders = await Order.find({ user: userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    console.log('Found orders with string search:', orders.length);
    
    // If no orders found, try with ObjectId
    if (orders.length === 0) {
      const mongoose = require('mongoose');
      try {
        const objectId = new mongoose.Types.ObjectId(userId);
        orders = await Order.find({ user: objectId })
          .populate('items.product')
          .sort({ createdAt: -1 });
        console.log('Found orders with ObjectId search:', orders.length);
      } catch (err) {
        console.log('Invalid ObjectId format:', err.message);
      }
    }
    
    // If still no orders, try a broader search
    if (orders.length === 0) {
      console.log('Trying broader search...');
      const allUserOrders = await Order.find().populate('items.product');
      console.log('All orders in database:', allUserOrders.length);
      console.log('All order users:', allUserOrders.map(o => o.user));
    }
    
    console.log('Final orders found:', orders.length);
    console.log('Orders:', orders.map(o => ({ 
      id: o._id, 
      orderNumber: o.orderNumber, 
      status: o.orderStatus,
      user: o.user,
      totalAmount: o.totalAmount
    })));
    
    res.json({ orders });
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get all orders (for admin)
exports.getAllOrders = async (req, res) => {
  try {
    console.log('Getting all orders...');
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    console.log('Total orders in database:', orders.length);
    console.log('Orders with user info:', orders.map(o => ({
      id: o._id,
      user: o.user,
      orderNumber: o.orderNumber,
      status: o.orderStatus
    })));
    
    res.json({ orders });
  } catch (err) {
    console.error('Error fetching all orders:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;
    
    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    
    const order = await Order.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    ).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ order });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ message: err.message });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    console.log('cancelOrder function called with:', {
      params: req.params,
      body: req.body,
      url: req.url,
      method: req.method
    });
    
    const { id } = req.params;
    const { reason } = req.body;
    
    console.log('Looking for order with ID:', id);
    console.log('Reason:', reason);
    
    const order = await Order.findById(id);
    console.log('Order found:', order ? 'Yes' : 'No');
    if (!order) {
      console.log('Order not found with ID:', id);
      return res.status(404).json({ message: 'Order not found' });
    }
    console.log('Order details:', {
      id: order._id,
      status: order.orderStatus,
      user: order.user
    });
    
    // Check if order can be cancelled (not delivered)
    if (order.orderStatus === 'delivered') {
      return res.status(400).json({ message: 'Cannot cancel delivered order' });
    }
    
    if (order.orderStatus === 'cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }
    
    order.orderStatus = 'cancelled';
    order.cancellationReason = reason || 'Cancelled by user';
    await order.save();
    
    await order.populate('items.product');
    
    res.json({ 
      order,
      message: 'Order cancelled successfully' 
    });
  } catch (err) {
    console.error('Error cancelling order:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err.stack : 'Internal server error'
    });
  }
};

// Delete an order (admin only)
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // Only allow if user is owner or admin
    if (req.user.role !== 'admin' && order.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Not authorized to delete this order' });
    }
    await Order.findByIdAndDelete(id);
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate('user', 'name email')
      .populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ order });
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ message: err.message });
  }
};