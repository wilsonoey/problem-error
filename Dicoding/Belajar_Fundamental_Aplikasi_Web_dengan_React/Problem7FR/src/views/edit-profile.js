import React, { useEffect } from 'react'
import FormUpdateProfile from '../components/forms/form-editprofil'
import { useNavigate } from 'react-router-dom';
import { editservice } from '../utils/api';

function EditProfile() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await editservice();
  //       setServices(data);
  //     } catch (error) {
  //       console.error('Error fetching contacts:', error);
  //     }
  //   };

  //   fetchData();
  //   const token = localStorage.getItem('accessToken');
  //   if (token === null) {
  //     navigate('/login');
  //   }
  // }, []);

  return (<><FormUpdateProfile /></>)
}

export default EditProfile
