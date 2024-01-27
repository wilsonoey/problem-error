import React from 'react'
import { Helmet } from "react-helmet";
import useInput from "../../hooks/useInput";
import Header from "../header/header";
import Inputs from "../inputs/inputs";
import PrimaryButton from "../button/primary-button";
import Footer from "../footer/footer";
import './form.css';

function FormRegister({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    register({
      username: name,
      emailuser: email,
      passworduser: password,
      avataruser: 'https://d17ivq9b7rppb3.cloudfront.net/small/avatar/pp.jpg',
      roleuser: 'user',
      statususer: 'active',
    });
  };

  return (
    <form className="edit-form-container" onSubmit={onSubmitHandler}>
      <Helmet>
        <title>Register - KamiAda</title>
        <meta property="og:title" content="EditService - KamiAda" />
      </Helmet>
      <div className="edit-form-fixed-header">
        <Header rootClassName="header-root-class-name"></Header>
      </div>
      <div className="edit-form-form">
        <h1 className="edit-form-text">Apakah Anda belum daftar akun KamiAda?</h1>
        <span className="edit-form-text1 TextXL">
          Jika belum, silahkan daftar dengan mengisi form dibawah ini.
        </span>
        <Inputs
          objectinput="Username"
          type="text"
          placeholder="Contoh : tester123"
          value={name}
          onChange={onNameChange}
        />
        <Inputs
          objectinput="Email"
          type="email"
          placeholder="Contoh: test@tester.testing"
          value={email}
          onChange={onEmailChange}
        />
        <Inputs
          objectinput="Password"
          type="password"
          placeholder=""
          value={password}
          onChange={onPasswordChange}
        />
        <div className="edit-form-container1">
          <PrimaryButton rootClassName="primary-button-root-class-name13" button="Daftar"></PrimaryButton>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name"></Footer>
    </form>
  )
}

export default FormRegister;
