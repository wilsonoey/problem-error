import React from 'react'
import { Helmet } from "react-helmet";
import useInput from "../../hooks/useInput";
import Header from "../header/header";
import Inputs from "../inputs";
import PrimaryButton from "../button/primary-button";
import Footer from "../footer/footer";
import './form-login.css';

function FormLogin({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({
      emailuser: email,
      passworduser: password,
    });
  };

  return (
    <form className="edit-service-container" onSubmit={onSubmitHandler}>
      <Helmet>
        <title>Login - KamiAda</title>
        <meta property="og:title" content="EditService - KamiAda" />
      </Helmet>
      <div className="edit-service-fixed-header">
        <Header rootClassName="header-root-class-name"></Header>
      </div>
      <div className="edit-service-form">
        <h1 className="edit-service-text">Apakah Anda sudah daftar akun KamiAda?</h1>
        <span className="edit-service-text1 TextXL">
          Jika sudah, silahkan login dengan akun yang sudah Anda daftarkan.
        </span>
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
        <div className="edit-service-container1">
          <PrimaryButton rootClassName="primary-button-root-class-name13" button="Masuk"></PrimaryButton>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name1"></Footer>
    </form>
  )
}

export default FormLogin;
