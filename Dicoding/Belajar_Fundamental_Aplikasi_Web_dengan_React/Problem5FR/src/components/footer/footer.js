import React from 'react'

import PropTypes from 'prop-types'

import './footer.css'

const Footer = (props) => {
  return (
    <div className={`footer-container ${props.rootClassName} `}>
      <div className="footer-container1">
        <div className="footer-container2">
          <h1 className="footer-text TextXL">
            <span className="">Let&apos;s keep in touch</span>
          </h1>
          <span className="footer-text2">
            Find out on any of these platforms, we respond 1-2 business days.
          </span>
          <div className="footer-container3">
            <div className="footer-container4">
              <svg viewBox="0 0 877.7142857142857 1024" className="footer-icon">
                <path
                  d="M585.143 857.143c-5.714-33.143-27.429-147.429-80-284.571-0.571 0-1.714 0.571-2.286 0.571 0 0-222.286 77.714-294.286 234.286-3.429-2.857-8.571-6.286-8.571-6.286 65.143 53.143 148 85.714 238.857 85.714 52 0 101.143-10.857 146.286-29.714zM479.429 510.286c-9.143-21.143-19.429-42.286-30.286-63.429-193.143 57.714-378.286 53.143-384.571 53.143-0.571 4-0.571 8-0.571 12 0 96 36.571 184 96 250.286v0c102.286-182.286 304.571-247.429 304.571-247.429 5.143-1.714 10.286-2.857 14.857-4.571zM418.286 389.143c-65.143-115.429-134.286-209.143-139.429-216-104.571 49.143-182.286 145.714-206.857 261.714 9.714 0 166.286 1.714 346.286-45.714zM809.143 571.429c-8-2.286-112.571-35.429-233.714-16.571 49.143 135.429 69.143 245.714 73.143 268 84-56.571 143.429-146.857 160.571-251.429zM349.143 148c-0.571 0-0.571 0-1.143 0.571 0 0 0.571-0.571 1.143-0.571zM686.286 230.857c-65.714-58.286-152.571-93.714-247.429-93.714-30.286 0-60 4-88.571 10.857 5.714 7.429 76.571 100.571 140.571 218.286 141.143-52.571 194.286-133.714 195.429-135.429zM813.714 508c-1.143-88.571-32.571-170.286-85.143-234.286-1.143 1.143-61.143 88-209.143 148.571 8.571 17.714 17.143 36 25.143 54.286 2.857 6.286 5.143 13.143 8 19.429 129.143-16.571 256.571 11.429 261.143 12zM877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"
                  className=""
                ></path>
              </svg>
            </div>
            <div className="footer-container5">
              <svg viewBox="0 0 1024 1024" className="footer-icon2">
                <path
                  d="M928 0h-832c-52.8 0-96 43.2-96 96v832c0 52.8 43.2 96 96 96h416v-448h-128v-128h128v-64c0-105.8 86.2-192 192-192h128v128h-128c-35.2 0-64 28.8-64 64v64h192l-32 128h-160v448h288c52.8 0 96-43.2 96-96v-832c0-52.8-43.2-96-96-96z"
                  className=""
                ></path>
              </svg>
            </div>
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
