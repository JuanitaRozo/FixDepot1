const Sale = require('../models/Sale');

exports.createSale = async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json({ message: 'Venta registrada', sale });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSalesReport = async (req, res) => {
  try {
    const sales = await Sale.find().populate('user', 'name').populate('products.product', 'name');
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
