import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
    return mongoose.connection; // Return the connection object directly
  } catch (e) {
    console.error("MongoDB connection error:", e);
    throw e;
  }
};

export default connectToMongoDB;
