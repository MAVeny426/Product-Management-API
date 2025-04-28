import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ProductManagement')
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server is listening to ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // stop the app if DB connection fails
  });
