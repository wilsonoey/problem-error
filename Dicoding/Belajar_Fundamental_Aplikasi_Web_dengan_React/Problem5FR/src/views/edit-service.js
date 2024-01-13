import React from 'react'

import { Helmet } from 'react-helmet'

import HeaderwithAuth from '../components/header/headerwith-auth'
import PrimaryButton from '../components/button/primary-button'
import Footer from '../components/footer/footer'
import './edit-service.css'

function EditService() {
  return (
    <div className="edit-service-container">
      <Helmet>
        <title>EditService - KamiAda</title>
        <meta property="og:title" content="EditService - KamiAda" />
      </Helmet>
      <div className="edit-service-fixed-header">
        <HeaderwithAuth rootClassName="headerwith-auth-root-class-name7"></HeaderwithAuth>
      </div>
      <div className="edit-service-form">
        <h1 className="edit-service-text">Want to work with us?</h1>
        <span className="edit-service-text1 TextXL">
          Complete this form and we will get back to you in 24 hours.
        </span>
        <span className="edit-service-text2 TextXS">FULL NAME</span>
        <input
          type="text"
          placeholder="Full Name"
          className="edit-service-textinput TextSM input"
        />
        <span className="edit-service-text3 TextXS">EMAIL</span>
        <input
          type="text"
          placeholder="Email"
          className="edit-service-textinput1 TextSM input"
        />
        <div className="edit-service-container1">
          <PrimaryButton rootClassName="primary-button-root-class-name13"></PrimaryButton>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name1"></Footer>
    </div>
  )
}

export default EditService
