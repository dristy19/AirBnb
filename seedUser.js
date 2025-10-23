require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user"); // adjust path if needed

// --- USERS DATA (20 users) ---
const users = [
  { username: "Alice", email: "alice@example.com", password: "password1" },
  { username: "Bob", email: "bob@example.com", password: "password2" },
  { username: "Charlie", email: "charlie@example.com", password: "password3" },
  { username: "David", email: "david@example.com", password: "password4" },
  { username: "Eve", email: "eve@example.com", password: "password5" },
  { username: "Frank", email: "frank@example.com", password: "password6" },
  { username: "Grace", email: "grace@example.com", password: "password7" },
  { username: "Hannah", email: "hannah@example.com", password: "password8" },
  { username: "Ivan", email: "ivan@example.com", password: "password9" },
  { username: "Judy", email: "judy@example.com", password: "password10" },
  { username: "Karl", email: "karl@example.com", password: "password11" },
  { username: "Laura", email: "laura@example.com", password: "password12" },
  { username: "Mike", email: "mike@example.com", password: "password13" },
  { username: "Nina", email: "nina@example.com", password: "password14" },
  { username: "Oscar", email: "oscar@example.com", password: "password15" },
  { username: "Paula", email: "paula@example.com", password: "password16" },
  { username: "Quinn", email: "quinn@example.com", password: "password17" },
  { username: "Robert", email: "robert@example.com", password: "password18" },
  { username: "Sophia", email: "sophia@example.com", password: "password19" },
  { username: "Tom", email: "tom@example.com", password: "password20" },
];

// --- SEED FUNCTION ---
const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("✅ Connected to MongoDB Atlas");

    // Drop old username index if it exists (avoid duplicate null username)
    const indexes = await mongoose.connection.collection("users").indexes();
    const usernameIndex = indexes.find(idx => idx.key.username === 1);
    if (usernameIndex) {
      await mongoose.connection.collection("users").dropIndex("username_1");
      console.log("🗑️ Dropped old username index");
    }

    // Clear existing users
    await User.deleteMany({});
    console.log("🗑️ Cleared existing users");

    // Insert new users
    for (const u of users) {
      const user = new User({ username: u.username, email: u.email });
      await User.register(user, u.password); // register sets username & hashed password
    }

    console.log(`🎉 Seeded ${users.length} users successfully!`);
  } catch (err) {
    console.error("❌ MongoDB operation error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("👋 Connection closed");
  }
};

seedUsers();
