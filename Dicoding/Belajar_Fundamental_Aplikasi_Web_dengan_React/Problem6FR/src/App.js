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
import DetailServicewithAuth from './views/detail-servicewith-auth'
import Home from './views/home'
import BlogPost from './views/blog-post'
import DetailService from './views/detail-service'
import HomewithAuth from './views/homewith-auth'
import AddService from './views/add-service'
import EditService from './views/edit-service'
import EditProfile from './views/edit-profile'
import NotFound from './views/not-found'
import Register from './views/register'
import Login from './views/login'
import { getUserLogged, putAccessToken } from './utils/api'
import isLogin from './views/isLogin'

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
      <Route path="/detail-servicewith-auth" element={<DetailServicewithAuth />} />
      <Route path="/" element={<Home />} />
      <Route path="/blog-post" element={<BlogPost />} />
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Login loginSuccess={onLoginSuccess} />} />
      <Route path="/detail-service" element={<DetailService />} />
      <Route path="/homewith-auth" element={<HomewithAuth />} />
      <Route path="/add-service" element={<AddService />} />
      <Route path="/edit-service" element={<EditService />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;