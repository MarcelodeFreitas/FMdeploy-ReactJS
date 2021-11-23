import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import AuthenticationButton from './AuthenticationButton'
import { useAuth0 } from '@auth0/auth0-react'

function Navbar() {
    const { isAuthenticated } = useAuth0()
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    useEffect( () => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <p style={{backgroundColor: "#0385B0", padding: "2%", borderRadius: "10%"}}>FM</p>&nbsp;deploy
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        { click ? <FontAwesomeIcon className={"fa-times"} icon={faTimes} /> : <FontAwesomeIcon className={"fa-bars"} icon={faBars} />}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
                                Documentation
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/docs" className="nav-links" onClick={closeMobileMenu}>
                                API
                            </Link>
                        </li>
                        { isAuthenticated &&
                            <li className="nav-item">
                                <Link to="/my" className="nav-links" onClick={closeMobileMenu}>
                                    App
                                </Link>
                            </li>
                        }
                        
                        <li className="nav-item nav-links-mobile">
                            <AuthenticationButton className="nav-item nav-links-mobile"/>
                        </li>
                    </ul>
                    {button && <AuthenticationButton />}
                </div>
            </nav>
        </>
    )
}

export default Navbar
