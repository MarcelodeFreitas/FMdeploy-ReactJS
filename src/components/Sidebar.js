import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faFolder, faFolderOpen, faGlobeAmericas, faUserCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {

    return(
        <>
            <nav className="sidebar">
                <ul className="sidebar-side">
                    <li className="logo">
                        <a href="#" className="side-link">
                        <span className="link-text logo-text">FMdeploy</span>
                        <FontAwesomeIcon className="icon" icon={faBrain} />
                        </a>
                    </li>

                    <li className="side-item">
                        <a href="#" className="side-link">
                        <FontAwesomeIcon className="icon" icon={faFolder} />
                        <span className="link-text">My Models</span>
                        </a>
                    </li>

                    <li className="side-item">
                        <a href="#" className="side-link">
                        <FontAwesomeIcon className="icon" icon={faFolderOpen} />
                        <span className="link-text">Shared Models</span>
                        </a>
                    </li>

                    <li className="side-item">
                        <a href="#" className="side-link">
                        <FontAwesomeIcon className="icon" icon={faGlobeAmericas} />
                        <span className="link-text">Public Models</span>
                        </a>
                    </li>

                    <li className="side-item">
                        <a href="#" className="side-link">
                        <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                        <span className="link-text">Logout</span>
                        </a>
                    </li>

                    <li className="side-item" id="themeButton">
                        <a href="#" className="side-link">
                        <FontAwesomeIcon className="icon" icon={faUserCog} />
                        <span className="link-text">Settings</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidebar;