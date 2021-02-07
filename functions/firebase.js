const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://area-454ce.firebaseio.com",
});

const db = admin.firestore();
exports.admin = admin;
exports.db = db;
