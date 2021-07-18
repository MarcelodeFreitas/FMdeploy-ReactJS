import React from 'react';
import { Button } from './Button';
import './HeroSection.css';
import '../App.css';

function HeroSection() {
    return (
        <div className='hero-container'>
            <video src="/videos/video-3.mp4" autoPlay loop muted/>
            <h1>DEPLOYMENT AWAITS</h1>
            <p>What are you waiting for?</p>
            <div className='hero-btns'>
                <Button className='btns' 
                buttonStyle='btn--outline' 
                buttonSize='btn--large'>
                    GET STARTED
                </Button>
                <Button className='btns' 
                buttonStyle='btn--primary' 
                buttonSize='btn--large'>
                    SEE DOCUMENTATION <i className='far fa-play-circle'/>
                </Button>
            </div>
        </div>
    )
}

export default HeroSection
