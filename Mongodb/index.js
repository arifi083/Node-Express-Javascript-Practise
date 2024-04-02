const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/shop");
        console.log("db is connected");
    } catch (error) {
        console.log("db is not connected")
        console.log(error.message);
        process.exit(1);
    }
};

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        reuired: true,
    },
    description: {
        type: String,
        reuired: true,
    },
    price: {
        type: Number,
        reuired: true,
    },
    rating: {
        type: Number,
        reuired: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("Products", productSchema);



app.get("/", (req, res) => {
    res.send("Hello I am home route");
});


// create product
app.post("/products", async (req, res) => {
    try {
        // get data from the request body
        const title = req.body.title;
        const price = req.body.price;
        const description = req.body.description;
        const rating = req.body.rating;

        const newProduct = new Product({
            title: title,
            price: price,
            description: description,
            rating: rating
        });
        const productData = await newProduct.save();

        // const productData = await Product.insertMany([
        //     {
        //         "title": "samsung",
        //         "price": 45433,
        //         "description": "it is good"
        //     },

        //     {
        //         "title": "oppo",
        //         "price": 4533,
        //         "description": "it is bad"
        //     }

        // ])

        res.status(201).send(productData)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


// read products 
//http://localhost:3000/products?price=2000
//http://localhost:3000/products?price=22000&rating=3

app.get("/products", async (req, res) => {
    try {
        const price = req.query.price;
        const rating = req.query.rating;
        let products;

        if (rating && price) {
            products = await Product.find({
                $nor: [
                    { price: { $gt: price } },
                    { rating: { $gt: rating } }
                ]
            }).sort({ price: -1 }).select({ title: 1 });
        }
        else {
            products = await Product.find().sort({ price: -1 }).select({ title: 1, _id: 0 });
        }
        if (products) {
            res.status(200).send({
                success: true,
                message: "return All product",
                data: products
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "products not found"
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


// read data using id

app.get("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const product = await Product.findOne({ _id: id }).select({ title: 1, _id: 0, price: 1 });
        if (product) {
            res.status(200).send({
                success: true,
                message: "return single product",
                data: product
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "products not found"
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})



app.delete("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete({ _id: id })
        if (product) {
            res.status(200).send({
                success: true,
                message: "delete single product",
                data: product
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "products was not delete with this id"
            })
        }

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


app.put("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateProduct = await Product.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    title: req.body.title,
                    price: req.body.price,
                    rating: req.body.rating,
                    description: req.body.description
                }

            },
            { new: true }
        );
        if (updateProduct) {
            res.status(200).send({
                success: true,
                message: "updated single product",
                data: updateProduct
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "products was not update with this id"
            })
        }

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})




app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectDB();
});