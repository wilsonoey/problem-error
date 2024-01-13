import React from 'react'

import { Helmet } from 'react-helmet'

import HeaderwithAuth from '../components/header/headerwith-auth'
import PrimaryButton from '../components/button/primary-button'
import ArticleCard from '../components/card/article-card'
import Footer from '../components/footer/footer'
import './dashboard.css'

function Dashboard() {
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
            <span className="dashboard-text1">Before I go </span>
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
            ></PrimaryButton>
            <PrimaryButton
              rootClassName="primary-button-root-class-name16"
              button="Detail Profile"
            ></PrimaryButton>
          </div>
          <input
            type="text"
            placeholder="Silakan cari jasa"
            className="dashboard-textinput input"
          />
        </div>
        <ArticleCard avatar_src="/team3-200h.jpg"></ArticleCard>
        <ArticleCard
          name="Paul Smith"
          time="Drawn on 23 April"
          title="MateLabs mixes learning with IFTTT"
          image_src="/team5-1400w.jpg"
          avatar_src="/team1-200h.jpg"
        ></ArticleCard>
        <ArticleCard
          name="Jasmine Taylor"
          time="Drawn on 23 April"
          title="US venture investment ticks up in Q2"
          image_src="/team3-200h.jpg"
          avatar_src="/team41-200h.png"
        ></ArticleCard>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Dashboard
