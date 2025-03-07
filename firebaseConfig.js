const admin = require("firebase-admin");
const serviceAccount = require("./justforrecreate-firebase-adminsdk-fbsvc-f4b9ffd718.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
