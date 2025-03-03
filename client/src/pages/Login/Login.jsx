import React, { useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import './Login.css'
import spinner from '../../assets/gif/spinner.gif'
import { loginData } from '../../../api/api'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

  const eError = document.getElementsByClassName('email_error')
  const pError = document.getElementsByClassName('password_error')
   const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    })
  
    const handleChange = (e) => {  
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
    }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
      const handleSubmit = async () => {
        let isValid = true
        const {email, password } = formData
    
        eError[0].textContent = ''
        pError[0].textContent = ''
    
        if (!email || !emailRegex.test(email)) {
          isValid = false
          eError[0].textContent = '⚠️ Valid Email is required'
        }
    
        if (!password) {
          isValid = false
          pError[0].textContent = '⚠️ Password is required'
        }
    
        if (isValid) {
          setLoading(true)
          try {
            const response = await loginData(formData)
            if (response.success) {
              toast.success("User Login Successfully", { autoClose: 2000, closeButton: true},)
            } else {
              toast.error(response.message, { autoClose: 2000, closeButton: true })
            }
          } catch (err) {
            toast.error("Something went wrong!", { autoClose: 2000, closeButton: true })
          }
          setLoading(false)
        }
      }
  return (
     <div className='login'>
            <div className="header glow">
                <Typewriter
                  words={["Welcome Back!","It's good to see you again"]}
                  loop={5}
                  cursor
                  cursorStyle='_'
                  typeSpeed={30}
                  delaySpeed={2000}
                />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="sec-2">
                    <label htmlFor="email">Email<span className='text-red-500'>*</span></label>
                    <input type="email" name='email' id='email' placeholder='Enter your Email' value={formData.email} onChange={handleChange}/>
                    <span className='email_error text-red-500'></span>
                </div>
                <div className="sec-3">
                    <label htmlFor="password">Password<span className='text-red-500'>*</span></label>
                    <input type="password" name='password' id='email' placeholder='Enter your Password' value={formData.password} onChange={handleChange}/>
                    <span className='password_error text-red-500'></span>
                </div>
                <div className="loginBtn">
                  <button id='btn'>
                    {loading ? <img src={spinner} alt="" width={30} /> : <p>Login</p>}
                  </button>
                </div>
            </form>
            <ToastContainer autoClose={2000}
            position="top-center"
            className="toast-container"
            toastClassName="dark-toast"/>
        </div>
  )
}

export default Login