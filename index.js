const express = require('express');
const mongoose = require('mongoose');

const Product = require('./models/product.model.js');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes
app.use("/api/products", productRoute);

const port = 3000;

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api/products', async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server at running at ${port}`);
});

//update a product
app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: "Product is not found" });
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {

        const { id } = req.params;

      const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect("mongodb+srv://sujan000:sujan000@test000.dbgebe7.mongodb.net/?retryWrites=true&w=majority&appName=test000")
    .then(() => {
        console.log("Connected to database");
    })
    .catch(() => {
        console.log("Connection failed");
    });