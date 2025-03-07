// const admin = require("firebase-admin");
// const serviceAccount = require("./justforrecreate-firebase-adminsdk-fbsvc-f4b9ffd718.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();
// module.exports = db;


require("dotenv").config(); // Load environment variables
const admin = require("firebase-admin");
const fs = require("fs");

// Get Firebase credentials path from .env
const serviceAccountPath = process.env.FIREBASE_CREDENTIALS_PATH;

if (!fs.existsSync(serviceAccountPath)) {
    console.error("Firebase credentials file not found. Check the path in .env");
    process.exit(1); // Stop execution if file is missing
}

// Load credentials dynamically
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
