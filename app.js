const express = require("express");
const mongoPractice = require("./mongo");

const app = express();

app.use(express.json());

app.post("/products", mongoPractice.createProduct);

app.get("/products", mongoPractice.getProducts);

app.listen(3000);
