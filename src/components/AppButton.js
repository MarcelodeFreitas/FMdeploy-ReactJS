import React from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./AppButton.css"

const AppButton = ( {path, button, buttonIcon} ) => {
    return (
        <Link to={path} className={"main-button"}>
            {button}
            <FontAwesomeIcon className={"btn-icon"} icon={buttonIcon} />
        </Link>
    )
}

export default AppButton