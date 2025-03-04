import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import { BrowserRouter as Router,Routes,Route, Outlet, useParams  } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import { User } from './pages/User/User'

function App() {
  return (
    <>
   <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/user' element={<User/>}/>
    </Routes>
   </Router>
    </>
  )
}

export default App
