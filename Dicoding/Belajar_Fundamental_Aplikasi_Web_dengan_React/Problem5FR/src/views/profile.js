import React from 'react'

import { Helmet } from 'react-helmet'

import Header from '../components/header/header'
import PrimaryButton from '../components/button/primary-button'
import Footer from '../components/footer/footer'
import './profile.css'

function Profile() {
  return (
    <div className="profile-container">
      <Helmet>
        <title>Profile - KamiAda</title>
        <meta property="og:title" content="Profile - KamiAda" />
      </Helmet>
      <div className="profile-image">
        <Header></Header>
        <img alt="image" src="/gray-vector.svg" className="profile-image1" />
        <div className="profile-bg"></div>
      </div>
      <div className="profile-container1">
        <div className="profile-container2">
          <img alt="image" src="/team3-200h.jpg" className="profile-image2" />
        </div>
        <div className="profile-container3">
          <h3 className="profile-text Text2XL">Jenna_Stones</h3>
          <span className="profile-text1 TextSM">Jenna Jessica Lut</span>
          <span className="profile-text2">
            <span className="profile-text3">
              An artist of considerable range, Jenna the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and
              records all of his own music, giving it a warm, intimate feel with
              a solid groove structure. An artist of considerable range.
            </span>
          </span>
          <div className="profile-container4">
            <PrimaryButton
              rootClassName="primary-button-root-class-name17"
              button="Edit Profil"
            ></PrimaryButton>
            <PrimaryButton
              rootClassName="primary-button-root-class-name18"
              button="Hapus Akun"
            ></PrimaryButton>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Profile
