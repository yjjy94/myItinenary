const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let database;

async function connectDb() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("my-itinenary");
}

function getDb() {
  if (!database) {
    throw new Error("Counldnt connect to DB");
  }
  return database;
}

module.exports = {
  connectDb: connectDb,
  getDb: getDb,
};
