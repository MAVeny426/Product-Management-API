import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3},
    description: { type: String, required: true, minlength: 10, maxlength: 50 },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true, lowercase: true },
    productId: { type: String, required: true, unique: true }
});

const Product = mongoose.model('Product', productSchema);


export default { User, Product };
