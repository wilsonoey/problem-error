import React from 'react';
import { Helmet } from 'react-helmet';
import PrimaryButton from '../button/primary-button';
import Footer from '../footer/footer';
import './detailprofile.css';
import HeaderwithAuth from '../header/headerwith-auth';
import { Link, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { deleteProfile } from '../../utils/api';

function DetailProfile({ profile }) {
  const navigate = useNavigate();
  const handleDelete = () => {
    confirmAlert({
      title: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus akun ini?',
      buttons: [
        {
          label: 'Ya',
          onClick: async() => {
            // Add your delete logic here
            const { error } = await deleteProfile();
            if (!error) {
              navigate('/');
            }
          },
        },
        {
          label: 'Tidak',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="profile-container">
      <Helmet>
        <title>Profil {`${profile.username}`} - KamiAda</title>
        <meta property="og:title" content="Profile - KamiAda" />
      </Helmet>
      <div className="profile-image">
        <HeaderwithAuth />
        <img alt="image" src="/gray-vector.svg" className="profile-image1" />
        <div className="profile-bg"></div>
      </div>
      <div className="profile-container1">
        <div className="profile-container2">
          <img alt={profile.username} src={profile.avataruser} className="profile-image2" />
        </div>
        <div className="profile-container3">
          <h3 className="profile-text Text2XL">{profile.username}</h3>
          <span className="profile-text1 TextSM">{profile.completename}</span>
          <span className="profile-text2">
            <span className="profile-text3">{profile.statususer}</span>
          </span>
          <div className="profile-container4">
            <Link to="/edit-profile">
              <PrimaryButton
                rootClassName="primary-button-root-class-name3"
                button="Edit Profil"
              ></PrimaryButton>
            </Link>
            <Link onClick={handleDelete}>
              <PrimaryButton
                rootClassName="primary-button-root-class-name18"
                button="Hapus Akun"
              ></PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default DetailProfile;