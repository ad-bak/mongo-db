const mongoose = require("mongoose");

const env = require("dotenv").config();

const Product = require("./models/product");

mongoose
  .connect(
    `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.gii5srf.mongodb.net/${process.env.db}?retryWrites=true&w=majority`
  )
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();
  res.json(result);
};

exports.createProduct = createProduct;
