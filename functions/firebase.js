const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://getcontest-caa97.firebaseio.com",
});

const db = admin.firestore();
exports.admin = admin;
exports.db = db;
