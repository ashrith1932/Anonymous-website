const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  if (db) return db; // reuse existing connection

  await client.connect();
  db = client.db(process.env.DB_NAME); // e.g. "Anonymous"

  console.log("MongoDB connected");
  return db;
}

module.exports = {
  connectDB,
  client
};
