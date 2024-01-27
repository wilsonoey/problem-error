import React from 'react'

import PropTypes from 'prop-types'

import './footer.css'
import { TfiLayoutSidebarNone } from "react-icons/tfi";

const Footer = (props) => {
  return (
    <div className={`footer-container ${props.rootClassName} `}>
      <div className="footer-container1">
        <div className="footer-container2">
          <h1 className="footer-text TextXL">
            <span className="">Let&apos;s keep in touch</span>
          </h1>
          <span className="footer-text2">
            Find out on any of these platforms
          </span>
          <div className="footer-container3">
            <div className="footer-container4"><TfiLayoutSidebarNone color='black' /></div>
          </div>
        </div>
        <div className="footer-container6">
          <div className="footer-container7">
            <span className="footer-text3 TextXS">Petunjuk</span>
            <span className="footer-text4 TextSM">Syarat &amp; Ketentuan</span>
            <span className="footer-text5 TextSM">Privasi</span>
          </div>
        </div>
      </div>
      <div className="footer-container8"></div>
      <span className="footer-text6 TextSM">Copyright © 2023 KamiAda.</span>
    </div>
  )
}

Footer.defaultProps = {
  rootClassName: '',
}

Footer.propTypes = {
  rootClassName: PropTypes.string,
}

export default Footer
