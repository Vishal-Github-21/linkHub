// testMongo.js
const mongoose = require("mongoose");
require("dotenv").config();

// 1️⃣ Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

// 2️⃣ Define a simple schema/model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// 3️⃣ Test insert + find
async function runDemo() {
  await connectDB();

  // Insert dummy data
  const newUser = new User({
    name: "Vishal Test",
    email: "vishal@example.com",
  });

  await newUser.save();
  console.log("✅ Dummy user inserted!");

  // Fetch all users to verify
  const users = await User.find();
  console.log("📦 All users in DB:", users);

  // Close connection
  mongoose.connection.close();
  console.log("🔒 MongoDB connection closed.");
}

runDemo();
