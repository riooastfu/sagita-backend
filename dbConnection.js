// FIREBASE CONFIG
/*const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
*/
const mysql = require("mysql");
const admin = mysql.createConnection({
  host: "localhost", user: "root", password: "", database: "db_pasien"
});

admin.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = admin;