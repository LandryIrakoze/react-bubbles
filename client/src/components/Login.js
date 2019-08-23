import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/login', userInfo)
      .then(res => {
          console.log('response', res);
          localStorage.setItem('token', res.data.payload);
          props.history.push('/bubbles');
      })
      .catch(err => {
          console.error('error', err);
      })
  }

  return (
    <>
      <form onSubmit={event => handleSubmit(event)}>
        <label>
            Username:
            <input type="text" name="username" value={userInfo.username} onChange={event => handleChange(event)}/>
        </label>
        <label>
            Password:
            <input type="password" name="password" value={userInfo.password} onChange={event => handleChange(event)}/>
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
