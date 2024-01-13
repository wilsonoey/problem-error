import React from 'react'

import { Helmet } from 'react-helmet'

import HeaderwithAuth from '../components/header/headerwith-auth'
import PrimaryButton from '../components/button/primary-button'
import Footer from '../components/footer/footer'
import './edit-profile.css'

function EditProfile() {
  return (
    <div className="edit-profile-container">
      <Helmet>
        <title>EditProfile - KamiAda</title>
        <meta property="og:title" content="EditProfile - KamiAda" />
      </Helmet>
      <div className="edit-profile-fixed-header">
        <HeaderwithAuth rootClassName="headerwith-auth-root-class-name8"></HeaderwithAuth>
      </div>
      <div className="edit-profile-form">
        <h1 className="edit-profile-text">Want to work with us?</h1>
        <span className="edit-profile-text1 TextXL">
          Complete this form and we will get back to you in 24 hours.
        </span>
        <span className="edit-profile-text2 TextXS">FULL NAME</span>
        <input
          type="text"
          placeholder="Full Name"
          className="edit-profile-textinput TextSM input"
        />
        <span className="edit-profile-text3 TextXS">EMAIL</span>
        <input
          type="text"
          placeholder="Email"
          className="edit-profile-textinput1 TextSM input"
        />
        <div className="edit-profile-container1">
          <PrimaryButton rootClassName="primary-button-root-class-name14"></PrimaryButton>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name2"></Footer>
    </div>
  )
}

export default EditProfile
