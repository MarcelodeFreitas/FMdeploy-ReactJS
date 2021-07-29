import React from 'react'
import './Model.css'
import TouchableOpacity from './TouchableOpacity'

export const Model = ({ key, model, onDelete }) => {
    return (
        <div className={"list-item"}>
            <div className={"item"}>
                <p className={"item-text-colored"}>ID:</p>
                <p className={"item-text"}>{model.id}</p>
            </div>
            <div className={"item"}>
                <p className={"item-text-colored"}>NAME:</p>
                <p className={"item-text"}>{model.name}</p>
            </div>
            <div className={"item"}>
                <p className={"item-text-colored"}>AUTHOR:</p>
                <p className={"item-text"}>{model.author}</p>
            </div>
            <div className={"item"}>
                <p className={"item-text-colored"}>DATE:</p>
                <p className={"item-text"}>{model.date}</p>
            </div>
            <div className={"item"}>
                <div className={"icon-container"}>
                    <TouchableOpacity>
                        <img className={"icon"} 
                        onClick={() => onDelete(model.id)} 
                        src="images/trash.png"
                        alt="delete" />
                    </TouchableOpacity>
                </div>
                <div className={"icon-container"}>
                    <TouchableOpacity>
                        <img className={"icon"} src="images/share.png" 
                            alt="share"/>
                    </TouchableOpacity>
                </div>
                <div className={"icon-container"}>
                    <TouchableOpacity>
                        <img className={"icon"} src="images/run.png" 
                            alt="run"/>
                    </TouchableOpacity>
                </div>
            </div>
        </div>
    )
}
