import React from 'react';
import { Helmet } from 'react-helmet';
import PrimaryButton from '../button/primary-button';
import Footer from '../footer/footer';
import './detailservice.css';
import { Link, useNavigate } from 'react-router-dom';
import HeaderwithAuth from '../header/headerwith-auth';
import { confirmAlert } from 'react-confirm-alert';
import { deleteService, getAccessToken } from '../../utils/api';
import { showFormattedDateTime } from '../../utils/date';
import Header from '../header/header';

function DetailServiceComponent({
	idservice,
	nameservice,
	avatarservice,
	descriptionservice,
	categoryservice,
	areaservice,
	contactservice,
	createdatservice,
	updatedatservice,
}) {
  const navigate = useNavigate();
  const handleDelete = () => {
    confirmAlert({
      title: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus layanan jasa ini?',
      buttons: [
        {
          label: 'Ya',
          onClick: async() => {
            // Add your delete logic here
            const { error } = await deleteService(idservice);
            if (!error) {
              navigate('/dashboard');
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
    <div className="detail-service-container">
      <Helmet>
        <title>{`${nameservice}`} - KamiAda</title>
        <meta property="og:title" content="DetailService - KamiAda" />
      </Helmet>
      <div className="detail-service-fixed-header">
        {
          getAccessToken() === null ? (
            <Header rootClassName="header-root-class-name"/>
          ) : (
            <HeaderwithAuth rootClassName="header-root-class-name"/>
          )
        }
      </div>
      <div className="detail-service-container1">
        <div className="detail-service-story">
          <span className="detail-service-text TextLG">
            <span>{showFormattedDateTime(createdatservice)}</span>
          </span>
          <span className="detail-service-text TextLG">{areaservice}</span>
          <span className="detail-service-text TextLG">{categoryservice}</span>
          <h3 className="detail-service-text04 Text2XL">
            {nameservice}
          </h3>
          <img
            alt="image"
            src={avatarservice}
            className="detail-service-image"
          />
          <span className="detail-service-text05 TextLG">
            <span className="detail-service-text06">{descriptionservice}</span>
            <br></br>
            <span></span>
            <br></br>
            <span className="detail-service-text09">{contactservice}</span>
            <br></br>
          </span>
          {
            getAccessToken() === null ? (
              <></>
            ) : (
              <>
                <Link to={`/myservice/update/${idservice}`}>
						      <PrimaryButton
            	      button="Edit"
            	      rootClassName="primary-button-root-class-name2"
          	      ></PrimaryButton>
					      </Link>
                <Link onClick={handleDelete}>
                  <PrimaryButton
                    button="Delete"
                    rootClassName="primary-button-root-class-name4"
                  ></PrimaryButton>
                </Link>
              </>
            )
          }
					
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default DetailServiceComponent;