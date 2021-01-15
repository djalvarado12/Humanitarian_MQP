const admin = require('firebase-admin');
const { user } = require('firebase-functions/lib/providers/auth');
require("firebase/auth");

function signInWithEmailPassword(email, password) {
  admin.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
      return;
    })
    .catch((error) => {
      console.log(error);
    });
}

function registerUser(username, pass, phone, email) {
  admin
  .auth()
  .createUser({
    email: email,
    phoneNumber: phone,
    password: pass,
    displayName: username
  })
  .then((userRecord) => {
    console.log('Successfully created new user:', userRecord.uid);
    return;
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });
}

function sendEmailVerification() {
  admin.auth().currentUser.sendEmailVerification()
    .then(() => {
      return;
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
}

function sendPasswordReset(email) {
  admin.auth().sendPasswordResetEmail(email)
    .then(() => {
      return;
    })
    .catch((error) => {
      console.log(error)
    });
}

module.exports = {sendPasswordReset, sendEmailVerification, registerUser, signInWithEmailPassword};