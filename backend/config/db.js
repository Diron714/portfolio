import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio'

export async function connectDB() {
  await mongoose.connect(MONGO_URI)
  console.log('MongoDB connected')
}
