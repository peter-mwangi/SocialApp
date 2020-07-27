const functions = require("firebase-functions");
const app = require("express")();
const  FBAuth = require("./util/fbAuth");

const { getAllScreams, postOneScream, getScream } = require("./handlers/screams");
const { signup, login, uploadImage , addUserDetails, getAuthenticatedUserDetails} = require("./handlers/users");

//get Screams routes.
app.get("/screams", getAllScreams);
//Create new scream
app.post("/scream",FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);
// TODO: delete scream
// TODO: like a scream
// TODO unlike a scream
// TODO: comment on scream

//User routes

//Signup route
app.post("/signup", signup);
//Login route
app.post("/login", login);
//upload images route
app.post('/users/image', FBAuth ,uploadImage);
//add and get user profile details route.
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUserDetails);


exports.api = functions.https.onRequest(app);
