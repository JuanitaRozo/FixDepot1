const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: String,
  image: String,
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ratings: [{ userId: mongoose.Schema.Types.ObjectId, score: Number }],
  comments: [{ userId: mongoose.Schema.Types.ObjectId, text: String, date: Date }]
});

module.exports = mongoose.model('Product', ProductSchema);
