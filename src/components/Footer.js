import React from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom';
import './Footer.css'

function Fotter() {
    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join the FMdeploy community, don't let your hard work
                    die in Jupyter Notebooks.
                </p>
                <p className='footer-subscription-text'>
                    You can start in just five minutes.
                </p>
                <div className='input-areas'>
                    <form>
                        <input type="email" name="email" 
                        placeholder="Your Email"
                        className="footer-input"/>
                    </form>
                    <Button buttonStyle='btn--outline'>
                        Join Now!
                    </Button>
                </div>
            </section>
            <div class='footer-links'>
            <div className='footer-link-wrapper'>
            <div class='footer-link-items'>
                <h2>About Us</h2>
                <Link to='/sign-up'>How it works</Link>
                <Link to='/'>Testimonials</Link>
                <Link to='/'>Terms of Service</Link>
            </div>
            <div class='footer-link-items'>
                <h2>Contact Us</h2>
                <Link to='/'>Contact</Link>
                <Link to='/'>Support</Link>
                <Link to='/'>Sponsorships</Link>
            </div>
            </div>
            <div className='footer-link-wrapper'>
            <div class='footer-link-items'>
                <h2>Videos</h2>
                <Link to='/'>Tutorial</Link>
            </div>
            <div class='footer-link-items'>
                <h2>Social Media</h2>
                <Link to='/'>Instagram</Link>
                <Link to='/'>Facebook</Link>
                <Link to='/'>Youtube</Link>
                <Link to='/'>Twitter</Link>
            </div>
            </div>
        </div>
        <section class='social-media'>
            <div class='social-media-wrap'>
                <div class='footer-logo'>
                    <Link to='/' className='social-logo'>
                        <p style={{backgroundColor: "#E76300", padding: "2%", borderRadius: "10%"}}>FM</p>&nbsp;deploy  
                    {/* <i class='fab fa-typo3' /> */}
                    </Link>
                </div>
                <small class='website-rights'>FMdeploy © 2021</small>
                <div class='social-icons'>
                    <Link
                    class='social-icon-link facebook'
                    to='/'
                    target='_blank'
                    aria-label='Facebook'
                    >
                    <i class='fab fa-facebook-f' />
                    </Link>
                    <Link
                    class='social-icon-link instagram'
                    to='/'
                    target='_blank'
                    aria-label='Instagram'
                    >
                    <i class='fab fa-instagram' />
                    </Link>
                    <Link
                    class='social-icon-link youtube'
                    to='/'
                    target='_blank'
                    aria-label='Youtube'
                    >
                    <i class='fab fa-youtube' />
                    </Link>
                    <Link
                    class='social-icon-link twitter'
                    to='/'
                    target='_blank'
                    aria-label='Twitter'
                    >
                    <i class='fab fa-twitter' />
                    </Link>
                    <Link
                    class='social-icon-link twitter'
                    to='/'
                    target='_blank'
                    aria-label='LinkedIn'
                    >
                    <i class='fab fa-linkedin' />
                    </Link>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Fotter
