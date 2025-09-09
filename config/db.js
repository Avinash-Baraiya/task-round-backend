import mongoose from 'mongoose';
import autoIncrement from "mongoose-id-autoIncrement"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    // autoIncrement.initialize(connection);
    console.log(`MongoDB Connected: `);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
