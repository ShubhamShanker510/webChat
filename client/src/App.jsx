import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import { User } from './pages/User/User'
import { getUserData } from '../api/api'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/userSlice'

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation();
  const dispatch=useDispatch()

  const getData = async () => {
    const response = await getUserData();
    console.log("user data=>",response)
    if(response.success===true){
      dispatch(getUser(response.data));
    }
    else{
      dispatch(getUser(null))
    }
  };

  useEffect(() => {
    getData();
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<User />} />
      </Routes>
    </>
  );
}

export default App;
