import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrimaryButton from '../button/primary-button';
import './header.css';
import { FiHome, FiPlusCircle } from 'react-icons/fi';
import { MdHomeRepairService } from "react-icons/md";
import { slide as Menu } from 'react-burger-menu';
import { FaRegHand } from "react-icons/fa6";

const Header = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div data-role="Header" className={`header-header ${props.rootClassName}`}>
      <div className="header-container">
        <Link to="/" className="header-navlink">
          <FaRegHand style={{marginRight:'5px'}}/>
          <h1 className="header-heading TextSM">{props.heading1}</h1>
        </Link>
        <Link to="/" className="header-navlink1">
          <div className="header-container1">
            <FiHome />
            <span className="header-text">Beranda</span>
          </div>
        </Link>
        <Link to="/service" className="header-navlink1">
          <div className="header-container1">
            <MdHomeRepairService />
            <span className="header-text">Jasa</span>
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
        <Link to="/"><FiHome /> Beranda</Link>
        <Link to="/service"><FiPlusCircle /> Jasa</Link>
      </Menu>
      <div className="header-container2">
        <Link to="/login">
          <PrimaryButton
            button="Login"
            rootClassName="primary-button-root-class-name1"
          ></PrimaryButton>
        </Link>
        <Link to="/register">
          <PrimaryButton
            button="Register"
            rootClassName="primary-button-root-class-name1"
          ></PrimaryButton>
        </Link>
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
