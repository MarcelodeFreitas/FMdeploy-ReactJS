import React from 'react'
import './Model.css'
import TouchableOpacity from './TouchableOpacity'

export const Model = ({ model, onDelete }) => {
    const date = new Date(model.created_in)

    return (
        <div className={"list-item"}>
            <div className={"item"}>
                <p className={"item-text-colored"}>ID:</p>
                <p className={"item-text"}>{model.ai_id}</p>
            </div>
            <div className={"item"}>
                <p className={"item-text-colored"}>NAME:</p>
                <p className={"item-text"}>{model.title}</p>
            </div>
            <div className={"item"}>
                <p className={"item-text-colored"}>AUTHOR:</p>
                <p className={"item-text"}>{model.name}</p>
            </div>
            <div className={"item"}>
                <p className={"item-text-colored"}>DATE:</p>
                <p className={"item-text"}>{new Intl.DateTimeFormat().format(date)}</p>
            </div>
            <div className={"item"}>
                <div className={"icon-container"}>
                    <TouchableOpacity>
                        <img className={"icon"} 
                        onClick={() => onDelete(model.ai_id)} 
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
