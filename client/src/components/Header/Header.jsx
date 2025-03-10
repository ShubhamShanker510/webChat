import React from 'react'
import videoCall from '../../assets/images/video-call.png'
import friend from '../../assets/images/friend.png'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import userImg from '../../assets/images/user.png'

const Header = () => {
    const navigate=useNavigate()
    const userData=useSelector((store)=>store.user.currentUser)
  return (
    <div className='nav'>
        <div className="left">
           <ul>
            <li> <div className="logo">
                <img src={videoCall} alt="" />
                VirtuMeet
            </div></li>
            <li><div className="my-meeting">
                <button onClick={()=>navigate('/meeting')}>Create <img  className="images" src={videoCall} alt="" /></button>
            </div></li>
           <li><div className='friends'>
            <a href="">Friends <img className="images" src={friend} alt="" /></a>
           </div></li>
           </ul>
        </div>
        <div className="right">
{
  userData ? (
    <button className='cursor-pointer hover:scale-130' onClick={()=>navigate('/user')}><img className="images" src={userImg} alt="User" /></button>
  ) : (
    <ul>
      <li>
        <div className="register-btn">
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      </li>
      <li className='login-btn'>
        <button onClick={() => navigate('/login')}>Login</button>
      </li>
    </ul>
  )
}
</div>
    </div>
  )
}

export default Header