import React from 'react'
import { Helmet } from "react-helmet";
import useInput from "../../hooks/useInput";
import Header from "../header/header";
import Inputs from "../inputs";
import PrimaryButton from "../button/primary-button";
import Footer from "../footer/footer";
import './form-register.css';

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
    });
  };

  return (
    <form className="edit-service-container" onSubmit={onSubmitHandler}>
      <Helmet>
        <title>Register - KamiAda</title>
        <meta property="og:title" content="EditService - KamiAda" />
      </Helmet>
      <div className="edit-service-fixed-header">
        <Header rootClassName="header-root-class-name"></Header>
      </div>
      <div className="edit-service-form">
        <h1 className="edit-service-text">Apakah Anda belum daftar akun KamiAda?</h1>
        <span className="edit-service-text1 TextXL">
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
          placeholder="Contoh: Test12345678"
          value={password}
          onChange={onPasswordChange}
        />
        <div className="edit-service-container1">
          <PrimaryButton rootClassName="primary-button-root-class-name13" button="Daftar"></PrimaryButton>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name1"></Footer>
    </form>
  )
}

export default FormRegister;