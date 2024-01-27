import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import HeaderwithAuth from '../components/header/headerwith-auth';
import PrimaryButton from '../components/button/primary-button';
import ArticleCard from '../components/card/article-card';
import Footer from '../components/footer/footer';
import './dashboard.css';
import { getMyServices } from '../utils/api';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import List from '../components/list/List';
import SearchBar from '../components/inputs/searchbar';

function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [user, setUser] = useState({});
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('keyword') || ''
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMyServices();
        setServices(data.services);
        setUser(data);
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
        <title>Beranda {`${user.username}`} - KamiAda</title>
        <meta property="og:title" content="Dashboard - KamiAda" />
      </Helmet>
      <div className="dashboard-fixed-header">
        <HeaderwithAuth rootClassName="headerwith-auth-root-class-name4"></HeaderwithAuth>
      </div>
      <div className="dashboard-posts">
        <div className="dashboard-container1">
          <h3 className="dashboard-text Healine">
            <span className="dashboard-text1">Terima Kasih Telah menggunakan Aplikasi KamiAda</span>
          </h3>
          <span className="dashboard-text2 TextXL">
            Untuk menambahkan jasa silahkan klik tombol Add Service dibawah ini.
            Untuk melihat profil Anda silahkan klik tombol Detail Profile dibawah ini.
          </span>
          <div className="dashboard-container2">
            <Link to="/add-service">
              <PrimaryButton
                rootClassName="primary-button-root-class-name3"
                button="Add Service"
              ></PrimaryButton>
            </Link>
            <Link to="/profile">
              <PrimaryButton
                rootClassName="primary-button-root-class-name16"
                button="Detail Profile"
              ></PrimaryButton>
            </Link>
          </div>
          <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        </div>
        {filteredServices.length > 0 ? (
          <List services={filteredServices}/>
        ) : (
          <div>Tidak ada pelayanan jasa yang kamu buat atau pencarian kata kunci yang salah.</div>
        )}
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Dashboard;
