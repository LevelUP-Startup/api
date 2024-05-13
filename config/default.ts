export default {
    port: 3000,
    dbUri: process.env.DB_URI || "mongodb://localhost:27017/level-up",
    env: "development",
};
