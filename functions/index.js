const functions = require("firebase-functions");
const {db: db} = require("./firebase.js");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.initUserAccount = functions.auth.user().onCreate((user) => {
  db.collection("users").doc(user.uid).set({
    createdAt: new Date(),
    bio: "Une biographie",
    name: "Un pseudo",
    id: user.uid,
    firstConnection: true,
    allowStatsTracking: true,
    isAdmin: false,
  });
});


exports.deleteUserAccount = functions.auth.user().onDelete((user) => {
  db.collection("users").doc(user.uid).delete();
});
