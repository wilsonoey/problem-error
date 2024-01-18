import React from 'react'

import { Helmet } from 'react-helmet'

import Header from '../components/header/header'
import PrimaryButton from '../components/button/primary-button'
import Footer from '../components/footer/footer'
import './detail-servicewith-auth.css'

function DetailServicewithAuth() {
  return (
    <div className="detail-servicewith-auth-container">
      <Helmet>
        <title>DetailServicewithAuth - KamiAda</title>
        <meta property="og:title" content="DetailServicewithAuth - KamiAda" />
      </Helmet>
      <div className="detail-servicewith-auth-fixed-header">
        <Header rootClassName="header-root-class-name"></Header>
      </div>
      <div className="detail-servicewith-auth-container1">
        <div className="detail-servicewith-auth-story">
          <span className="detail-servicewith-auth-text TextLG">
            <span>March 1, 2019</span>
          </span>
          <span className="detail-servicewith-auth-text02 TextLG">Area</span>
          <span className="detail-servicewith-auth-text03 TextLG">
            Category
          </span>
          <h3 className="detail-servicewith-auth-text04 Text2XL">
            The Castle Looks Different at Night...
          </h3>
          <img
            alt="image"
            src="/new-york-city-1400w.jpg"
            className="detail-servicewith-auth-image"
          />
          <span className="detail-servicewith-auth-text05 TextLG">
            <span className="detail-servicewith-auth-text06">
              This is the paragraph where you can write more details about your
              product. Keep you user engaged by providing meaningful
              information. Remember that by this time, the user is curious,
              otherwise he wouldn&apos;t scroll to get here. Add a button if you
              want the user to see more. We are here to make life better.
            </span>
            <br></br>
            <span></span>
            <br></br>
            <span className="detail-servicewith-auth-text09">
              And now I look and look around and there’s so many Kanyes
              I&apos;ve been trying to figure out the bed design for the master
              bedroom at our Hidden Hills compound... and thank you for turning
              my personal jean jacket into a couture piece.
            </span>
            <br></br>
          </span>
          <PrimaryButton
            button="Edit"
            rootClassName="primary-button-root-class-name6"
          ></PrimaryButton>
          <PrimaryButton
            button="Delete"
            rootClassName="primary-button-root-class-name7"
          ></PrimaryButton>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default DetailServicewithAuth
