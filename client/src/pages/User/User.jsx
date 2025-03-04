import React from 'react'
import './User.css'
import userImg from '../../assets/images/default-user.jpg'

export const User = () => {
  return (
    <div className='show_user'>
      <div className="user_left">
        <img src={userImg} alt="" />
      </div>
      <div className="user_right">
        <div className="user_details">
        <div className="user_name">
          <label htmlFor=""> Name: </label>
          <p>John Doe</p>
        </div>
        <div className="email">
          <label htmlFor=""> Email: </label>
          <p>jondoe@gmail.com</p>
        </div>
        </div>
        <div className="logout-btn">
          <button>Logout</button>
        </div>
      </div>
    </div>
  )
}
