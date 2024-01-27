import React, { useEffect, useState } from 'react'
import FormEditService from '../components/forms/form-editservice'
import { useNavigate, useParams } from 'react-router-dom';
import { editservice } from '../utils/api';

function EditService() {
  const navigate = useNavigate();
  const { idservice } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token === null) {
      navigate('/login');
    }
  });

  function onEditServiceHandler(service) {
    editservice(idservice, service);
    navigate(`/myservice/${idservice}`);
  }

  return (<FormEditService service={onEditServiceHandler}/>);
}

export default EditService