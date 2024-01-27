import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrimaryButton from '../button/primary-button';
import './headerwith-auth.css';
import { FiHome, FiPlusCircle, FiLogOut } from 'react-icons/fi';
import { MdHomeRepairService } from "react-icons/md";
import { slide as Menu } from 'react-burger-menu';
import { FaRegHand } from "react-icons/fa6";

const HeaderwithAuth = (props) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Create a function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div
      data-role="Header"
      className={`headerwith-auth-header ${props.rootClassName} `}
    >
      <div className="headerwith-auth-container">
        <Link to="/" className="headerwith-auth-navlink">
          <FaRegHand style={{marginRight:'5px'}}/>
          <h1 className="headerwith-auth-heading TextSM">{props.heading1}</h1>
        </Link>
        <Link to="/" className="headerwith-auth-navlink">
          <div className="headerwith-auth-container1">
            <FiHome />
            <span className="header-text">Beranda</span>
          </div>
        </Link>
        <Link to="/service" className="headerwith-auth-navlink">
          <div className="headerwith-auth-container1">
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
        <Link onClick={handleLogout}><FiLogOut /> Logout</Link>
      </Menu>
      <div className="headerwith-auth-container2">
        <Link to="/dashboard">
          <PrimaryButton
            rootClassName="primary-button-root-class-name1"
            button="Dashboard"
          ></PrimaryButton>
        </Link>
        <Link onClick={handleLogout}>
          <PrimaryButton
            rootClassName="primary-button-root-class-name8"
            button="Logout"
          ></PrimaryButton>
        </Link>
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
