const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let mongodbUrl = "mongodb://localhost:27017";

if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
}

let database;

async function connectDb() {
  const client = await MongoClient.connect(mongodbUrl);
  // console.log(client);
  database = client.db("my-itinenary");
  console.log("process.env  " + mongodbUrl);
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
