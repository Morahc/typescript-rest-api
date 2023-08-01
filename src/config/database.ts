import mongoose from 'mongoose';

const database = async () => {
  const MONGO_URI = process.env.MONGO_URI as string;
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    process.exit(1);
  }
};

export default database;
