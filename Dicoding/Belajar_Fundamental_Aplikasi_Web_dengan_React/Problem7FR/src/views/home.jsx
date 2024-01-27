import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './home.css';
import ServiceCard from '../components/card/service-card';
import { MdCleaningServices, MdOutlineElectricalServices, MdWheelchairPickup } from 'react-icons/md';
import { GiMetalPlate } from "react-icons/gi";
import { SiRenovatebot } from "react-icons/si";
import { FaTools, FaTruckPickup } from "react-icons/fa";
import { getAccessToken } from '../utils/api';
import HeaderwithAuth from '../components/header/headerwith-auth';

function Home() {
  return (
    <div className="home-container">
      <Helmet>
        <title>KamiAda</title>
        <meta property="og:title" content="KamiAda" />
      </Helmet>
      <div className="home-hero">
        <div className="home-bg"></div>
        {
          getAccessToken() === null ? <Header /> : <HeaderwithAuth />
        }
        <div className="home-container1">
          <div className="home-container2">
            <h1 className="home-text">Kami Memahami Kebutuhan Anda</h1>
            <span className="home-text01">
              <span></span>
              <span>
                Website yang bergerak dalam bidang pelayanan berbagai macam kebutuhan
              </span>
            </span>
          </div>
          <img alt="image" src="/gray-vector.svg" className="home-image" />
          <img alt="image" src="/white-vector.svg" className="home-image1" />
        </div>
      </div>
      <div className="home-section1">
        <div className="home-container3">
          <div className="home-container4">
            <h3 className="home-text07 Healine">Katalog apa yang kami tawarkan?</h3>
            <span className="home-text08 TextXL">
              <span className="home-text09">
                Kami menawarkan jasa sesuai kebutuhan Anda berdasarkan kategori berikut ini: 
              </span>
            </span>
          </div>
          <div className="home-cards-container">
            <ServiceCard
              icon={<MdOutlineElectricalServices color='black' />}
              heading='Utilitas'
              text='Perbaikan dan pemeliharaan peralatan elektronik di rumah anda, seperti pembersihan AC, servis Kulkas, TV, mesin cuci, dan lain-lain'
            />
            <ServiceCard
              icon={<SiRenovatebot color='black' />}
              heading='Renovasi'
              text='Pembangunan dan perbaikan elemen dan ruang di rumah anda, seperti pengecatan, penggantian pintu/kaca jendela, perbaikan perabot, dan lain-lain'
            />
            <ServiceCard
              icon={<MdCleaningServices color='black' />}
              heading='Bersih-bersih'
              text='Jasa pembersihan dan perawatan rumah anda, seperti pembersihan seluruh rumah, pembersihan halaman dan taman, pencucian spring bed, dan semacamnya'
            />
            <ServiceCard
              icon={<FaTools color='black' />}
              heading='Utilitas'
              text='Perbaikan dan pemeliharaan utilitas di rumah anda, seperti perbaikan drainase, WC buntu, kuras sumur, dan pekerjaan sejenis'
            />
            <ServiceCard
              icon={<FaTruckPickup color='black' />}
              heading='Jasa angkut'
              text='Layanan jasa angkut dan kirim barang untuk pengiriman barang atau pindah rumah/kost'
            />
            <ServiceCard
              icon={<GiMetalPlate color='black' />}
              heading='Metal Works'
              text='Layanan pekerjaan besi dan pengelasan'
            />
            <ServiceCard
              icon={<MdWheelchairPickup color='black' />}
              heading='Disabilitas'
              text='Layanan khusus untuk disabilitas, seperti perbaikan kursi roda, perbaikan alat bantu jalan, dan lain-lain'
            />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home;
