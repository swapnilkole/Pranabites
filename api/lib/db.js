import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedDb) return cachedDb;

    if (!uri) {
        throw new Error("MONGODB_URI environment variable is not set");
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("pranabites");

    cachedClient = client;
    cachedDb = db;

    return db;
}
