import React from 'react'
import './Hero.css'
import meet_image1 from '../../assets/images/meet1.png'
import meet_image2 from '../../assets/images/meet2.png'
import meet_image3 from '../../assets/images/meet3.png'
import { Typewriter } from 'react-simple-typewriter'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="left-hero">
            <div className="hero-header">
                <Typewriter
                  words={["Video calls with anyone , anywhere and anytime"]}
                  loop={1}
                  cursor
                  cursorStyle='_'
                  typeSpeed={80}
                  delaySpeed={1000}/>
            </div>
            <div className="hero-text">
                <p>Stay connected and collaborate with friends, family and colleagues, no matter where you are.</p>
            </div>
            <div className="meeting-id">
                <input type="text" placeholder='Enter meeting code..' />
                <div className="join-btn">
                <button>Join</button>
                </div>
            </div>
        </div>
        <div className="right-hero">
                <div className="hero-img">
                    <div className="img1">
                        <img src={meet_image1} alt="" />
                    </div>
                    <div className="img2">
                        <img src={meet_image2} alt="" />
                    </div>
                    <div className="img3">
                        <img src={meet_image3} alt="" />
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Hero