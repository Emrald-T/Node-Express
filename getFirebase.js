const admin = require("firebase-admin")
const firebaseAuth = require("./firebaseAuth.json")

// Firebase (firestore) configuration
const firebaseConfig = {
  credential: admin.credential.cert(firebaseAuth),
  databaseURL: "https://nodeexpressdata.firebaseio.com",
  projectId: "nodeexpressdata"
}
admin.initializeApp(firebaseConfig)
let db = admin.firestore()

module.exports = db
