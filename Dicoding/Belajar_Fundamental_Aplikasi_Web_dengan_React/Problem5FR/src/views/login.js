import React, { useEffect } from 'react'
import { login } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import FormLogin from '../components/forms/form-login'

function Login({ loginSuccess }) {
  const navigate = useNavigate();
  async function onLoginHandler(user) {
    const { error, data } = await login(user);
    if (!error) {
      loginSuccess(data);
      navigate('/dashboard');
    }
  }
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/dashboard');
    }
  });

  return (<><FormLogin login={onLoginHandler} /></>);
}

export default Login;
