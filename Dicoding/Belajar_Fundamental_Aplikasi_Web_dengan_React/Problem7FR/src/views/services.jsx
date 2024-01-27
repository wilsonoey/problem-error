import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { Helmet } from 'react-helmet';
import { getAccessToken, getServices } from '../utils/api';
import Header from '../components/header/header';
import HeaderwithAuth from '../components/header/headerwith-auth';
import SearchBar from '../components/inputs/searchbar';
import List from '../components/list/List';
import Footer from '../components/footer/footer';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('keyword') || ''
  });
  
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await getServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }

    getData();
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  // Filter services based on keyword
  const filteredServices = services.filter(service => {
    return service.nameservice.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <div className="dashboard-container">
      <Helmet>
        <title>Jasa - KamiAda</title>
        <meta property="og:title" content="Dashboard - KamiAda" />
      </Helmet>
      <div className="dashboard-fixed-header">
      {
        getAccessToken() === null ? (
          <Header rootClassName="header-root-class-name1"/>
        ) : (
          <HeaderwithAuth rootClassName="headerwith-auth-root-class-name4"/>
        )
      }
      </div>
      <div className="dashboard-posts">
        <div className="dashboard-container1">
          <h3 className="dashboard-text Healine">
            <span className="dashboard-text1">Terima Kasih Telah menggunakan Aplikasi KamiAda</span>
          </h3>
          <span className="dashboard-text2 TextXL">
            Untuk menambahkan dan mengubah jasa, silakan login terlebih dahulu. Jika belum memiliki akun, silakan register terlebih dahulu.
          </span>
          <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        </div>
        {filteredServices.length > 0 ? (
          <List services={filteredServices}/>
        ) : (
          <div>Tidak ada pelayanan jasa yang tersedia secara publik.</div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Services;