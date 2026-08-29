import mongoose from "mongoose";

const globalCache = global.mongooseCache || { connection: null, promise: null };
global.mongooseCache = globalCache;

export const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (globalCache.connection) return globalCache.connection;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });
  }

  try {
    globalCache.connection = await globalCache.promise;
  } catch (error) {
    globalCache.promise = null;
    throw error;
  }

  return globalCache.connection;
};
