const MongoClient = require("mongodb").MongoClient;
const env = require("dotenv").config();

//use user and password from .env file

const url = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.gii5srf.mongodb.net/${process.env.db}?retryWrites=true&w=majority`;
const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("products").insertOne(newProduct);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Could not store data." });
  }
  client.close();

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    console.log(error);
    return res.json({ message: "Could not retrieve products" });
  }
  client.close();

  res.json(products);
};

module.exports = { createProduct, getProducts };
