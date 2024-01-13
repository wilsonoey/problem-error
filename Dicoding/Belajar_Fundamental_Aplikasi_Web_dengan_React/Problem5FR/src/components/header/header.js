import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrimaryButton from '../button/primary-button';
import './header.css';
import { FiHome, FiPlusCircle } from 'react-icons/fi';
import { MdHomeRepairService } from "react-icons/md";
import { slide as Menu } from 'react-burger-menu';

const Header = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div data-role="Header" className={`header-header ${props.rootClassName} `}>
      <div className="header-container">
        <Link to="/" className="header-navlink">
          <h1 className="header-heading TextSM">{props.heading1}</h1>
        </Link>
        <Link to="/profile" className="header-navlink1">
          <div className="header-container1">
            <FiHome />
            <span className="header-text">Home</span>
          </div>
        </Link>
        <Link to="/profile" className="header-navlink1">
          <div className="header-container1">
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
      </Menu>
      <div className="header-container2">
        <PrimaryButton
          button="Login"
          rootClassName="primary-button-root-class-name4"
          className=""
        ></PrimaryButton>
        <PrimaryButton
          button="Register"
          rootClassName="primary-button-root-class-name5"
          className=""
        ></PrimaryButton>
      </div>
    </div>
  )
}

Header.defaultProps = {
  rootClassName: '',
  heading1: 'KamiAda',
}

Header.propTypes = {
  rootClassName: PropTypes.string,
  heading1: PropTypes.string,
}

export default Header;
