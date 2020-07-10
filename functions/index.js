const functions = require("firebase-functions");
const app = require("express")();
const  FBAuth = require("./util/fbAuth");

const { getAllScreams, postOneScream } = require("./handlers/screams");
const { signup, login } = require("./handlers/users");

//Screams routes.
app.get("/screams", getAllScreams);
//Create new scream
app.post("/scream",FBAuth, postOneScream);

//User routes
//Signup route
app.post("/signup", signup);

app.post("/login", login);

exports.api = functions.https.onRequest(app);
