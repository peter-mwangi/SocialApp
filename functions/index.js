const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();

admin.initializeApp();



const firebaseConfig = {
    apiKey: "AIzaSyBrqUXX9I1GA9kO5c-R8IeZ30ZBgGU1SRc",
    authDomain: "social-app-fd2ec.firebaseapp.com",
    databaseURL: "https://social-app-fd2ec.firebaseio.com",
    projectId: "social-app-fd2ec",
    storageBucket: "social-app-fd2ec.appspot.com",
    messagingSenderId: "886638614723",
    appId: "1:886638614723:web:252d385a851148fbebaa76",
    measurementId: "G-K232220BSX"
  };




const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello World!");
// });

app.get("/screams", (req, res) => {
  admin
    .firestore()
    .collection("screams")
    .orderBy('createdAt','desc')
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
            screamId: doc.id,
            body: doc.data().body,
            userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt,
            likeCount: doc.data().likeCount,
            commentCount: doc.data().commentCount

        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
});

app.post("/scream", (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  admin
    .firestore()
    .collection("screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
});

//Signup route

app.post('/signup', (req, res) =>{
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle

    };

    //TODO: Valid data.
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data =>{
        return res.status(201).json({message: `user ${data.user.uid} signed up successfully`});
    })
    .catch(err =>{
        console.error(err);
        return res.status(500).json({error: err.code});
    });
});

exports.api = functions.https.onRequest(app);
