const expressSession = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: "my-itinenary",
    collection: "sessions",
  });

  return store;
}

function createSessionConfig() {
  console.log("SESSION SESSION CREATE");
  return {
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 24 * 2 * 60 * 60 * 1000,
    },
  };
}

module.exports = createSessionConfig;
