import React from 'react'
import { Helmet } from 'react-helmet';
import HeaderwithAuth from '../header/headerwith-auth';
import PrimaryButton from '../button/primary-button';
import Footer from '../footer/footer';
import './form-addservice.css'
import useInput from '../../hooks/useInput';
import Inputs from '../inputs';

function FormAddService({ service }) {
  const [name, onNameChange] = useInput('');
  const [avatar, onAvatarChange] = useInput('');
  const [description, onDescriptionChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [area, onAreaChange] = useInput('');
  const [contact, onContactChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    service({
      nameservice: name,
      avatarservice: avatar,
      descriptionservice: description,
      categoryservice: category,
      areaservice: area,
      contactservice: contact,
      statusservice: 'Active',
    });
  };

  return(
    <form className="add-service-container" onSubmit={onSubmitHandler}>
      <Helmet>
        <title>AddService - KamiAda</title>
        <meta property="og:title" content="AddService - KamiAda" />
      </Helmet>
      <div className="add-service-fixed-header">
        <HeaderwithAuth rootClassName="headerwith-auth-root-class-name6"></HeaderwithAuth>
      </div>
      <div className="add-service-form">
        <h1 className="add-service-text">Want to work with us?</h1>
        <span className="add-service-text1 TextXL">
          Complete this form and we will get back to you in 24 hours.
        </span>
        <Inputs
          objectinput="Nama Jasa"
          type="text"
          placeholder="Contoh: Jasa Servis Elektronik"
          value={name}
          onChange={onNameChange}
        />
        <Inputs
          objectinput="Gambar (URL)"
          type="text"
          placeholder="Contoh: https://d17ivq9b7rppb3.cloudfront.net/small/avatar/pp.jpg"
          value={avatar}
          onChange={onAvatarChange}
        />
        <Inputs
          objectinput="Deskripsi"
          type="text"
          placeholder="Contoh: Jasa servis elektronik terbaik di kota Bandung"
          value={description}
          onChange={onDescriptionChange}
        />
        <Inputs
          objectinput="Kategori"
          type="text"
          placeholder="Contoh: Elektronik"
          value={category}
          onChange={onCategoryChange}
        />
        <Inputs
          objectinput="Domisili"
          type="text"
          placeholder="Contoh: Kota bandung"
          value={area}
          onChange={onAreaChange}
        />
        <Inputs
          objectinput="Kontak"
          type="text"
          placeholder="Contoh: Instagram: @kamiservice"
          value={contact}
          onChange={onContactChange}
        />
        <div className="add-service-container1">
          <PrimaryButton rootClassName="primary-button-root-class-name" button="Tambah Jasa"></PrimaryButton>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name"></Footer>
    </form>
  );
}

export default FormAddService;
