import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrimaryButton from '../button/primary-button';
import './headerwith-auth.css';
import { FiHome, FiPlusCircle, FiLogOut } from 'react-icons/fi';
import { MdHomeRepairService } from "react-icons/md";
import { slide as Menu } from 'react-burger-menu';

const HeaderwithAuth = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div
      data-role="Header"
      className={`headerwith-auth-header ${props.rootClassName} `}
    >
      <div className="headerwith-auth-container">
        <Link to="/" className="headerwith-auth-navlink">
          <h1 className="headerwith-auth-heading TextSM">{props.heading1}</h1>
        </Link>
        <Link to="/profile" className="headerwith-auth-navlink">
          <div className="headerwith-auth-container1">
            <FiHome />
            <span className="header-text">Home</span>
          </div>
        </Link>
        <Link to="/profile" className="headerwith-auth-navlink">
          <div className="headerwith-auth-container1">
            <MdHomeRepairService />
            <span className="header-text">Service</span>
          </div>
        </Link>
      </div>
      <Menu
        isOpen={menuOpen}
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
        styles={{
          bmMenuWrap: {
            position: 'fixed',
            top: '0px',
            width: '100%',
            left: '0px'
          },
        }}
      >
        <Link to="/"><FiHome /> Home</Link>
        <Link to="/add"><FiPlusCircle /> Service</Link>
        <Link to="/add"><FiLogOut /> Logout</Link>
      </Menu>
      <div className="headerwith-auth-container2">
        <PrimaryButton
          rootClassName="primary-button-root-class-name1"
          button="Dashboard"
          className=""
        ></PrimaryButton>
        <PrimaryButton
          rootClassName="primary-button-root-class-name8"
          button="Logout"
          className=""
        ></PrimaryButton>
      </div>
    </div>
  )
}

HeaderwithAuth.defaultProps = {
  rootClassName: '',
  heading1: 'KamiAda',
}

HeaderwithAuth.propTypes = {
  rootClassName: PropTypes.string,
  heading1: PropTypes.string,
}

export default HeaderwithAuth;
