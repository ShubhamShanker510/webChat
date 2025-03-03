import React, { useState } from 'react'
import './Register.css'
import { Typewriter } from 'react-simple-typewriter'
import spinner from '../../assets/gif/spinner.gif'
import { sendData } from '../../../api/api'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const nError = document.getElementsByClassName('name_error')
  const eError = document.getElementsByClassName('email_error')
  const pError = document.getElementsByClassName('password_error')
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: ''
  })

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      setFormData({
        ...formData,
        avatar: e.target.files[0]
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const handleSubmit = async () => {
    let isValid = true
    const { name, email, password, avatar } = formData

    nError[0].textContent = ''
    eError[0].textContent = ''
    pError[0].textContent = ''

    if (!name) {
      isValid = false
      nError[0].textContent = '⚠️ Name is required'
    }

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
        const response = await sendData(formData)
        if (response.success) {
          toast.success("User Registered Successfully", { autoClose: 2000, closeButton: true},)
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
    <div className='Register'>
      <div className="header glow">
        <Typewriter
          words={["Welcome!", "Create Your Account"]}
          loop={5}
          cursor
          cursorStyle='_'
          typeSpeed={30}
          delaySpeed={2000}
        />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="sec-1">
          <label>Name<span className='text-red-500'>*</span></label>
          <input type="text" name='name' placeholder='Enter your Name' value={formData.name} onChange={handleChange} />
          <span className='name_error text-red-500'></span>
        </div>

        <div className="sec-2">
          <label>Email<span className='text-red-500'>*</span></label>
          <input type="email" name='email' placeholder='Enter your Email' value={formData.email} onChange={handleChange} />
          <span className='email_error text-red-500'></span>
        </div>

        <div className="sec-3">
          <label>Password<span className='text-red-500'>*</span></label>
          <input type="password" name='password' placeholder='Enter your Password' value={formData.password} onChange={handleChange} />
          <span className='password_error text-red-500'></span>
        </div>

        <div className="sec-4">
          <label>Upload Your Image</label>
          <input type="file" name='avatar' onChange={handleChange} />
        </div>

        <div className="registerBtn">
          <button id='btn' disabled={loading}>
            {loading ? <img src={spinner} alt="" width={30} /> : <p>Register</p>}
          </button>
        </div>

        <div className="click_login">
          Already Register - <a href="" onClick={()=>navigate('/login')}>Click Here</a>
        </div>
      </form>
      <ToastContainer 
      autoClose={2000}
      position="top-center"
      className="toast-container"
      toastClassName="dark-toast"/>
    </div>
  )
}

export default Register
