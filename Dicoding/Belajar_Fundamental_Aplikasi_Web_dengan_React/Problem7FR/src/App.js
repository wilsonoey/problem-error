import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import './style.css'
import Dashboard from './views/dashboard'
import Profile from './views/profile'
import DetailService from './views/detail-service'
import Home from './views/home'
import AddService from './views/add-service'
import EditService from './views/edit-service'
import EditProfile from './views/edit-profile'
import NotFound from './views/not-found'
import Register from './views/register'
import Login from './views/login'
import { getUserLogged, putAccessToken } from './utils/api'
import Services from './views/services'

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    async function getData() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
    }
    getData();
  });
 
  async function onLoginSuccess(user) {
    putAccessToken(user.accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }
 
  function onLogout() {
    setAuthedUser(null);
    putAccessToken('');
  }
  
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/service/:idservice" element={<DetailService />} />
      <Route path="/" element={<Home />} />
      <Route path="/service" element={<Services />} />
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Login loginSuccess={onLoginSuccess} />} />
      <Route path="/add-service" element={<AddService />} />
      <Route path="/myservice/update/:idservice" element={<EditService />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;