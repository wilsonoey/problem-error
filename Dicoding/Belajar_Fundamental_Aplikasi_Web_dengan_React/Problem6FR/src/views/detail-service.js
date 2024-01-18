import React from 'react'

import { Helmet } from 'react-helmet'

import Header from '../components/header/header'
import PrimaryButton from '../components/button/primary-button'
import Footer from '../components/footer/footer'
import './detail-service.css'

function DetailService() {
  return (
    <div className="detail-service-container">
      <Helmet>
        <title>DetailService - KamiAda</title>
        <meta property="og:title" content="DetailService - KamiAda" />
      </Helmet>
      <div className="detail-service-fixed-header">
        <Header rootClassName="header-root-class-name1"></Header>
      </div>
      <div className="detail-service-container1">
        <div className="detail-service-story">
          <span className="detail-service-text TextLG">
            <span>March 1, 2019</span>
          </span>
          <span className="detail-service-text02 TextLG">Area</span>
          <span className="detail-service-text03 TextLG">Category</span>
          <h3 className="detail-service-text04 Text2XL">
            The Castle Looks Different at Night...
          </h3>
          <img
            alt="image"
            src="/new-york-city-1400w.jpg"
            className="detail-service-image"
          />
          <span className="detail-service-text05 TextLG">
            <span className="detail-service-text06">
              This is the paragraph where you can write more details about your
              product. Keep you user engaged by providing meaningful
              information. Remember that by this time, the user is curious,
              otherwise he wouldn&apos;t scroll to get here. Add a button if you
              want the user to see more. We are here to make life better.
            </span>
            <br></br>
            <span></span>
            <br></br>
            <span className="detail-service-text09">
              And now I look and look around and there’s so many Kanyes
              I&apos;ve been trying to figure out the bed design for the master
              bedroom at our Hidden Hills compound... and thank you for turning
              my personal jean jacket into a couture piece.
            </span>
            <br></br>
          </span>
          <PrimaryButton
            rootClassName="primary-button-root-class-name11"
            button="Edit"
          ></PrimaryButton>
          <PrimaryButton
            rootClassName="primary-button-root-class-name12"
            button="Delete"
          ></PrimaryButton>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default DetailService
