import React from 'react'
import './About.css'
import videoCall from '../../assets/images/video-call.png'

const About = () => {
  return (
    <div className='about mt-2'>
        <div className="about_title">
            VirtuMeet
        </div>
        <div className="paragraph">
            <p>VirtuMeet is an innovative web-based video conferencing application designed to provide seamless virtual communication experiences. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), VirtuMeet enables users to host, join, and manage video meetings with ease. The platform offers secure authentication, dynamic meeting room creation, and real-time video streaming using WebRTC technology.

With VirtuMeet, users can connect with others remotely for personal, professional, or collaborative purposes. The application ensures privacy and data security through JWT-based authentication and role-based access control. Whether it's for team meetings, online classes, or casual conversations, VirtuMeet delivers high-quality video calls with a user-friendly interface.

Our goal is to make virtual communication more accessible, efficient, and engaging. With future plans to integrate screen sharing, chat functionality, and multi-user meeting rooms, VirtuMeet is a step toward redefining the way people connect online.

Stay connected anytime, anywhere — with VirtuMeet!</p>
        </div>
    </div>
  )
}

export default About