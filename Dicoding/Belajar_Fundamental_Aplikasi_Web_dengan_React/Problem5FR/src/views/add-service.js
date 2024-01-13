import React from 'react'

import { Helmet } from 'react-helmet'

import HeaderwithAuth from '../components/header/headerwith-auth'
import PrimaryButton from '../components/button/primary-button'
import Footer from '../components/footer/footer'
import './add-service.css'

function AddService() {
  return (
    <div className="add-service-container">
      <Helmet>
        <title>AddService - KamiAda</title>
        <meta property="og:title" content="AddService - KamiAda" />
      </Helmet>
      <div className="add-service-fixed-header">
        <HeaderwithAuth rootClassName="headerwith-auth-root-class-name6"></HeaderwithAuth>
      </div>
      <div className="add-service-form">
        <h1 className="add-service-text">Want to work with us?</h1>
        <span className="add-service-text1 TextXL">
          Complete this form and we will get back to you in 24 hours.
        </span>
        <span className="add-service-text2 TextXS">FULL NAME</span>
        <input
          type="text"
          placeholder="Full Name"
          className="add-service-textinput TextSM input"
        />
        <span className="add-service-text3 TextXS">EMAIL</span>
        <input
          type="text"
          placeholder="Email"
          className="add-service-textinput1 TextSM input"
        />
        <div className="add-service-container1">
          <PrimaryButton rootClassName="primary-button-root-class-name"></PrimaryButton>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name"></Footer>
    </div>
  )
}

export default AddService
