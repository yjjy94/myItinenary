const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let mongdbUrl = "mongodb://localhost:27017";

if (process.env.MONGODB_URL) {
  mongdbUrl = process.env.MONGODB_URL;
  console.log("process.env  " + mongdbUrl);
}
let database;

async function connectDb() {
  console.log("connectDb  " + mongdbUrl);
  const client = await MongoClient.connect(mongdbUrl);
  database = client.db("my-itinenary");
  console.log("DB CONNECTED");
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
