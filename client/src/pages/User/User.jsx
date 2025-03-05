import React from 'react'
import './User.css'
import userImg from '../../assets/images/default-user.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../../api/api'
import { getUser } from '../../../redux/userSlice'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const User = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store)=>store.user.currentUser)
  console.log("User data",userData)

  const handleLogOut=async()=>{
    const response=await logOutUser();
    console.log("Logout user error=>",response)

    if(response.data.success===true){
      dispatch(getUser(null));
      navigate('/login')
    }else{
      toast.error('Something went wrong')
    }

  }

  return (
    <div className='show_user'>
      <div className="user_left">
        <img src={userData!==null ?userData.image:userImg} alt="" />
      </div>
      <div className="user_right">
        <div className="user_details">
        <div className="user_name">
          <label htmlFor=""> Name: </label>
          <p>{userData!==null?userData.name:''}</p>
        </div>
        <div className="email">
          <label htmlFor=""> Email: </label>
          <p>{userData!==null ?userData.email:''}</p>
        </div>
        </div>
        <div className="logout-btn">
          <button onClick={handleLogOut}>Logout</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
