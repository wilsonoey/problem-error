import React from 'react'
import { login } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import FormLogin from '../components/forms/form-login'

function Login({ loginSuccess, auth }) {
  const navigate = useNavigate();
  async function onLoginHandler(user) {
    const { error, data } = await login(user);
    if (!error) {
      loginSuccess(data);
      navigate('/');
    } else if (auth !== (undefined || null)) {
      alert("User already logged in!");
      navigate('/homewith-auth');
    }
  }

  return (<><FormLogin login={onLoginHandler} /></>);
}

export default Login;
