import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticate } from "../Middleware/auth.js";

dotenv.config();

const userRoute = Router();
const productRoute = Router();

const secretKey = process.env.secretkey;
const userStore = new Map();  // You should define this or replace with your actual storage.
const productStore = new Map();  // Define your product store similarly.

userRoute.post('/signup', async (req, res) => {
    try {
        const { firstName, email, userName, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (userStore.has(userName)) {
            return res.status(400).json({ message: "User already exists" });
        }

        userStore.set(userName, { firstName, email, userName, password: hashedPassword, role });
        console.log(userStore.get(userName));
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRoute.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = userStore.get(userName);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            const token = jwt.sign({ userName: user.userName, userRole: user.role }, secretKey, { expiresIn: '1h' });
            res.cookie('authToken', token, { httpOnly: true });
            console.log(token);
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(400).json({ message: "Invalid password" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


let productCounter = 1;

productRoute.post('/addproduct', authenticate, (req, res) => {
    try {
        const role = req.userType; // Use `req.userType` as per your middleware logic
        if (role !== "admin") {
            return res.status(403).json({ message: "You don't have permission" });
        }

        let { name, description, price, image, category } = req.body;

        if (!name || name.length < 3) {
            return res.status(400).json({ message: "Name must have at least 3 characters" });
        }
        if (!description || description.length < 10 || description.length > 50) {
            return res.status(400).json({ message: "Description must be between 10 and 50 characters" });
        }
        if (typeof price !== 'number') {
            return res.status(400).json({ message: "Price must be a number" });
        }
        if (!image) {
            return res.status(400).json({ message: "Image path required" });
        }
        if (!category) {
            return res.status(400).json({ message: "Category required" });
        }

        category = category.toLowerCase();

        // Generate Product ID
        const productId = `PROD${String(productCounter).padStart(3, '0')}`;
        productCounter++;

        if (productStore.has(name)) {
            return res.status(400).json({ message: "Product already exists" });
        }

        productStore.set(name, { name, description, price, image, category, productId });
        console.log(productStore.get(name));

        res.status(201).json({ message: "Product added successfully", productId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productRoute.get('/viewproducts', (req, res) => {
    try {
        if (productStore.size === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.send(Array.from(productStore.entries()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productRoute.get('/getproduct/:name', (req, res) => {
    try {
        const product = productStore.get(req.params.name);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productRoute.delete('/deleteproduct', authenticate, (req, res) => {
    try {
        const role = req.userType; // Use `req.userType` here
        const { name } = req.query;

        if (role !== "admin") {
            return res.status(403).json({ message: "You don't have permission" });
        }

        if (!productStore.has(name)) {
            return res.status(404).json({ message: "Product not found" });
        }

        productStore.delete(name);
        res.json({ message: `Product ${name} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export { userRoute, productRoute };
