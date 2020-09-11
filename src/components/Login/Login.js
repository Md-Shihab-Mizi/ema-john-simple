import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleFBLogin, handleGoogleSingIn, handleSingOut, initializeLoginFramework } from './loginManager';



function Login() {
  const [newUser,setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();


const [loggedInUser,setLoggedInUser] = useContext(UserContext);
const history = useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };

const googleSingIn = () => {
  handleGoogleSingIn()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
  })
}
const fbLogin = () => {
  handleFBLogin()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
  })
  

}

const singOut = ()=>{
  handleSingOut()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
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
      
       
    }

if(!newUser && user.email && user.password){
 
}


    e.preventDefault();

  }
 


  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignIn ? <button onClick={singOut}>Sign Out</button> : <button onClick={googleSingIn}>Sign In</button>
      }
      <br/>

      <button onClick={fbLogin}>Log in Using Facebook</button>

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
