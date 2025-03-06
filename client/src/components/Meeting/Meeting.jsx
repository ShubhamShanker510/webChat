import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import './Meeting.css';
import { createMeeting } from '../../../api/api';
import { getMeetingId } from '../../../redux/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';


const Meeting = () => {
   const dispatch=useDispatch()
    const navigate=useNavigate();
  const userData = useSelector((store) => store.user.currentUser);
  const [meeting,setMeeting]=useState('')

  const HandleMeeting=async()=>{
    try {
        const response=await createMeeting(userData.userId);
        console.log(response);
        if(response.success===true){
            setMeeting(response.meetingId);
            dispatch(getMeetingId(response.meetingId))
            toast.success('Meeting Id created successfully',{position: "top-center"})
        }else{
            toast.error("Something went wrong",{position: "top-center"})
        }
        
    } catch (error) {
        console.log("Handle Meeting error=>",error);
        toast.error('Something went wrong',{position: "top-center"})
    }
  }

  const HandleJoinMeeting=async()=>{
        navigate(`/meeting/${meeting}`)
        console.log("Meeting id=>",meeting)
  }

  return (
    <div className="meeting-container">
      <div className="user-info">
        <div className="user-avatar">
          <img src="https://via.placeholder.com/80" alt="user" />
        </div>
        <div className="user-details">
          <div className="user-name">
            <label>Name:</label>
            <p>{userData !== null ? userData.name : ''}</p>
          </div>
          <div className="user-email">
            <label>Email:</label>
            <p>{userData !== null ? userData.email : ''}</p>
          </div>
          <div className="user-id">
            <label>ID:</label>
            <p>{userData !== null ? userData.userId : ''}</p>
          </div>
        </div>
      </div>

      <div className="meeting-buttons">
        <button onClick={HandleMeeting}>Generate Meeting Id</button>
      </div>

        <div className="meeting-id">
                <input type="text" placeholder='Enter meeting code..' value={meeting}/>
                <div className="join-btn">
                <button onClick={HandleJoinMeeting}>Join</button>
                </div>
            </div>
            <ToastContainer/>
    </div>
  );
}

export default Meeting;
