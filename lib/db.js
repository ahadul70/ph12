
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
  throw new Error("Please define MONGODB_URI and DB_NAME in .env");
}

let cachedClient = global.mongoClient;
let cachedDb = global.mongoDb;

if (!cachedClient) cachedClient = global.mongoClient = null;
if (!cachedDb) cachedDb = global.mongoDb = null;

export async function dbConnect() {
  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  const db = client.db(dbName);

  cachedClient = global.mongoClient = client;
  cachedDb = global.mongoDb = db;

  return db;
}

export async function getCollection(collectionName) {
  const db = await dbConnect();
  return db.collection(collectionName);
}