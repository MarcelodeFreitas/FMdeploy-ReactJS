import React from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPlus, faGlobeAmericas, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import './AppHeader.css'

library.add(fab, faPlus, faGlobeAmericas, faShareAlt)

const AppHeader = ({title, button, buttonIcon, path}) => {
    return (
        <>
            <div className={"header"}>
                <h1 className={"title"}>{title}</h1>
                <Link to={path} className={"main-button"}>
                    {button}
                    <FontAwesomeIcon className={"btn-icon"} icon={buttonIcon} />
                </Link>
            </div>
            <hr className={"line"} />
        </>
    )
}

export default AppHeader
