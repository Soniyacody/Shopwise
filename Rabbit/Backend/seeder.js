const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../Backend/models/Product");
const User = require("../Backend/models/User");
const Cart = require("../Backend/models/Cart");
const products = require("./data/products");
dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to send data
const seedData = async (req, res) => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    // Create a deafult admin user
    const createdUser = await User.create({
      name: "Admin user",
      email: "admin@example.com",
      password: "pass1234",
      role: "admin",
    });
    // Assign the default user ID each product
    const userId = createdUser._id;
    const sampleProduct = products.map((product) => {
      return { ...product, user: userId };
    });
    // Insert the product into database
    await Product.insertMany(sampleProduct);
    console.log("Product data seeded successfullly");
    process.exit();
  } catch (error) {
    console.log("Error seeding the data", error);
    process.exit(1);
  }
};
seedData();
