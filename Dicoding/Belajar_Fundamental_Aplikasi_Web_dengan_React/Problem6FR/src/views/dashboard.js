import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'

import HeaderwithAuth from '../components/header/headerwith-auth'
import PrimaryButton from '../components/button/primary-button'
import ArticleCard from '../components/card/article-card'
import Footer from '../components/footer/footer'
import './dashboard.css'
import { getContacts } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import List from '../components/list/List'

function Dashboard() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getContacts();
        setServices(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchData();
    const token = localStorage.getItem('accessToken');
    if (token === null) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Helmet>
        <title>Dashboard - KamiAda</title>
        <meta property="og:title" content="Dashboard - KamiAda" />
      </Helmet>
      <div className="dashboard-fixed-header">
        <HeaderwithAuth rootClassName="headerwith-auth-root-class-name4"></HeaderwithAuth>
      </div>
      <div className="dashboard-posts">
        <div className="dashboard-container1">
          <h3 className="dashboard-text Healine">
            <span className="dashboard-text1">Before I go </span>
          </h3>
          <span className="dashboard-text2 TextXL">
            We&apos;ve got time, but we are only doing what they say and want. I
            do not want to live as I will never die, cause life&apos;s too
            short, and I do not want to drown myself, as others would like.
          </span>
          <div className="dashboard-container2">
            <PrimaryButton
              rootClassName="primary-button-root-class-name15"
              button="Add Service"
              link="/add-service"
            ></PrimaryButton>
            <PrimaryButton
              rootClassName="primary-button-root-class-name16"
              button="Detail Profile"
              link="/profile"
            ></PrimaryButton>
          </div>
          <input
            type="text"
            placeholder="Silakan cari jasa"
            className="dashboard-textinput input"
          />
        </div>
        {services.length > 0 ? (
          <List services={services}/>
        ) : (
          <div>No services available.</div>
        )}
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Dashboard
