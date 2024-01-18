import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'

import HeaderwithAuth from '../components/header/headerwith-auth'
import PrimaryButton from '../components/button/primary-button'
import Footer from '../components/footer/footer'
import './add-service.css'
import { useNavigate } from 'react-router-dom'
import { addContact } from '../utils/api'
import FormAddService from '../components/forms/form-addservice'

function AddService() {
  const navigate = useNavigate();
  async function onAddServiceHandler(user) {
    const { error } = await addContact(user); 
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

  return (
    <FormAddService service={onAddServiceHandler} />
  )
}

export default AddService
