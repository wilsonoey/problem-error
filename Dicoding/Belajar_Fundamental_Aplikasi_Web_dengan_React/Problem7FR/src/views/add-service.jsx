import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addService } from '../utils/api';
import FormAddService from '../components/forms/form-addservice';

function AddService() {
  const navigate = useNavigate();
  async function onAddServiceHandler(user) {
    const { error } = await addService(user); 
    if (!error) {
      navigate('/dashboard');
    }
  }
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token === null) {
      navigate('/login');
    }
  });

  return (<FormAddService service={onAddServiceHandler} />);
}

export default AddService;
