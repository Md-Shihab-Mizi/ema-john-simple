import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';




// firebase.initializeApp(firebaseConfig);
// export const initializeLoginFramework = () => {
//     firebase.initializeApp(firebaseConfig);
// }
export const initializeLoginFramework = () =>{
  if(firebase.apps.length === 0){
     firebase.initializeApp(firebaseConfig);
    }
};




export const handleGoogleSingIn = () => {

    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }
        return signedInUser ;
        // console.log(displayName, email, photoURL);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }




  export const handleFBLogin = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
   
    });
  }

  export const handleSingOut = () => {
    return firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isSignIn: false,
          name: '',
          photo: '',
          email: '',
          error: '',
          success: false,
        }
       return signOutUser ;

      })
      .catch(err => {

      })
  }

  export const createUserWithEmailAndPassword = (name, email, password) =>{
   return  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
     updateUserName(name);
     return newUserInfo;
    })
    .catch(error => {
      // Handle Errors here.
     const newUserInfo = {};
     newUserInfo.error = error.message
     newUserInfo.success = false;
     return newUserInfo;
    });
  }


  export const signInWithEmailAndPassword = (email,password) =>{
   return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
   return newUserInfo;
    })
    .catch(function(error) {
      const newUserInfo ={};
      newUserInfo.error = error.message
      newUserInfo.success = false;
       return newUserInfo;
    });
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function() {
      console.log('user name updated successfully')
    }).catch(function(error) {
     console.log(error)
    });
  }

