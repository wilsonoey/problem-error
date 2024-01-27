import React, { useEffect, useState } from 'react'
import { getServicebyID } from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import DetailServiceComponent from '../components/details/detailservice';

function DetailService() {
  const navigate = useNavigate();
  const { idservice } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    getServicebyID(idservice).then(({ data }) => {
      setService(data);
    });
  }, [idservice]);

  return (<DetailServiceComponent {...service}/>)
}

export default DetailService;
