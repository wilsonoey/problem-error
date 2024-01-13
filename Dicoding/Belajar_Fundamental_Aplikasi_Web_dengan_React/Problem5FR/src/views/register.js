import React from 'react'
import { register } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import FormRegister from '../components/forms/form-register';

function Register() {
  const navigate = useNavigate();
  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }

  return(<><FormRegister register={onRegisterHandler} /></>);
}

export default Register;
