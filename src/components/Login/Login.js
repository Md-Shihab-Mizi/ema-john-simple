import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';

firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser,setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });


const [loggedInUser,setLoggedInUser] = useContext(UserContext);



  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSingIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser)
        console.log(displayName, email, photoURL);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }
const handleFBLogin = () =>{
  firebase.auth().signInWithPopup(fbProvider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
  const handleSingOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isSignIn: false,
          name: '',
          photo: '',
          email: '',
          error: '',
          success: false,
        }
        setUser(signOutUser)

      })
      .catch(err => {

      })
  }

  const handleBlur = (e) => {


let isFieldValid = true ;

    console.log(e.target.name, e.target.value);
    if (e.target.name === 'email') {
      isFieldValid= /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber ;

    }
    if(isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    // console.log(user.email , user.password)
    if( newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
       setUser(newUserInfo);
       updateUserName(user.name);
      })
      .catch(error => {
        // Handle Errors here.
       const newUserInfo ={...user};
       newUserInfo.error = error.message
       newUserInfo.success = false;
        setUser(newUserInfo);
        // ...
      });
       
    }

if(!newUser && user.email && user.password){
  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(res =>{
    const newUserInfo = {...user};
    newUserInfo.error = '';
    newUserInfo.success = true;
   setUser(newUserInfo);
   setLoggedInUser(newUserInfo);
   console.log('sing in user info', res.user)
  })
  .catch(function(error) {
    const newUserInfo ={...user};
    newUserInfo.error = error.message
    newUserInfo.success = false;
     setUser(newUserInfo);
  });
}


    e.preventDefault();

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


  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignIn ? <button onClick={handleSingOut}>Sign Out</button> : <button onClick={handleSingIn}>Sign In</button>
      }
      <br/>

      <button onClick={handleFBLogin}>Log in Using Facebook</button>

      {
        user.isSignIn && <div>
          <p>Name: {user.name}</p>
          <p>Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }


      <h1>Our own Authentication System</h1>
<input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
<label htmlFor="newUser"> New User Sign Up</label>


 
      <form onSubmit={handleSubmit}>
        <br/>
       {newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="Your Name"/>}
        <br/>
        <input onBlur={handleBlur} type="text" name="email" placeholder="Your Email Address" required />
        <br />
        <input onBlur={handleBlur} type="password" name="password" placeholder="Your Password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' :'Sign In' } />
      </form>

    <p style={{color: 'red'}}>{user.error}</p>
    {
      user.success && <p style={{color: 'green'}}>User successfully{newUser ? ' Created': 'Logged In'}</p>
    }
    


    </div>
  );
}

export default Login;
