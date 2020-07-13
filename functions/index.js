const functions = require("firebase-functions");
const app = require("express")();
const  FBAuth = require("./util/fbAuth");

const { getAllScreams, postOneScream } = require("./handlers/screams");
const { signup, login, uploadImage } = require("./handlers/users");

//get Screams routes.
app.get("/screams", getAllScreams);
//Create new scream
app.post("/scream",FBAuth, postOneScream);

//User routes

//Signup route
app.post("/signup", signup);
//Login route
app.post("/login", login);
//upload images route
app.post('/users/image', FBAuth ,uploadImage);

exports.api = functions.https.onRequest(app);
