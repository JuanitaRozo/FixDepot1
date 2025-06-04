const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const salesRoutes = require('./routes/sales');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);

const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
});
