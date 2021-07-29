import React from 'react'
import './NoContentCard.css'

const NoContentCard = ({ text }) => {
    return (
        <div className={"no-content-container"}>
            <div className={"no-content-card"}>
                <img className={"no-content-image"} src="images/no-content.png" 
                                alt="No Content"/>
                <h2 className={"no-content-text"}>{ text }</h2>
            </div>
        </div>
    )
}

export default NoContentCard