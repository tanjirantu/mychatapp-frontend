export default {
  databaseConnection: {
    protocol: "mongodb",
    hostname: process.env.MONGO_DB_HOSTNAME || "localhost",
    port: process.env.MONGO_DB_PORT || 2017,
    database: process.env.MONGO_DB_DATABASE || "boilerplate",
    uri() {
      return (
        this.protocol +
        "://" +
        this.hostname +
        ":" +
        this.port +
        "/" +
        this.database
      );
    },
  },
  auth: {
    authSource: process.env.MONGO_DB_AUTHDB || "admin",
    user: process.env.MONGO_DB_USER || "test",
    pass: process.env.MONGO_DB_PASSWORD || "12345",
  },
};