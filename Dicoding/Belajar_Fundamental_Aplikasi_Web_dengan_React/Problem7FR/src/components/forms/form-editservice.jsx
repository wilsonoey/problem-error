import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import HeaderwithAuth from '../header/headerwith-auth';
import PrimaryButton from '../button/primary-button';
import Footer from '../footer/footer';
import './form.css';
import Inputs from '../inputs/inputs';
import useInput from '../../hooks/useInput';
import DropdownInput from '../inputs/dropdown';

function FormEditService({ service }) {
  const options = [
    'Servis Elektronik', 'Renovasi', 'Bersih-bersih', 
    'Utilitas', 'Jasa Angkut', 'Metal Works', 'Disabilitas'
  ];
  const [name, onNameChange] = useInput(undefined);
  const [avatar, onAvatarChange] = useInput(undefined);
  const [description, onDescriptionChange] = useInput(undefined);
  const [category, onCategoryChange] = useState('');
  const [area, onAreaChange] = useInput(undefined);
  const [contact, onContactChange] = useInput(undefined);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Create an object with non-null and non-undefined values
    const editedService = {
      nameservice: name,
      avatarservice: avatar,
      descriptionservice: description,
      categoryservice: category.value,
      areaservice: area,
      contactservice: contact,
    };

    // Filter out properties with null or undefined values
    const filteredEditedService = Object.fromEntries(
      Object.entries(editedService).filter(([_, value]) => value !== '' && value !== null)
    );

    // Call the service function with the filtered object
    service(filteredEditedService);
  };

  return (
    <form className="edit-form-container" onSubmit={onSubmitHandler}>
      <Helmet>
        <title>EditService - KamiAda</title>
        <meta property="og:title" content="EditService - KamiAda" />
      </Helmet>
      <div className="edit-form-fixed-header">
        <HeaderwithAuth rootClassName="headerwith-auth-root-class-name7"></HeaderwithAuth>
      </div>
      <div className="edit-form-form">
        <h1 className="edit-form-text">Edit Jasa</h1>
        <span className="edit-form-text1 TextXL">
          Silakan lengkapi form berikut untuk mengubah jasa Anda
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
        <DropdownInput
          objectinput="Kategori"
          options={options}
          value={category.value}
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
        <div className="edit-form-container1">
          <PrimaryButton rootClassName="primary-button-root-class-name13" button="Simpan"></PrimaryButton>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name"></Footer>
    </form>
  )
}

export default FormEditService;
