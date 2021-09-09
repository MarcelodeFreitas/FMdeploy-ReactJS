import './Model.css'
import TouchableOpacity from './TouchableOpacity'
import { useHistory } from "react-router-dom"

export const Model = ({ model, onDelete }) => {
    const date = new Date(model.created_in)
    const formatedDate = new Intl.DateTimeFormat().format(date)
    const history = useHistory()

    return (
        <div className={"list-item"}>
            <div className={"data-items"}>
                <div className={"item"}>
                    <p className={"item-text-colored"}>ID:</p>
                    <p className={"item-text"}>{model.ai_id}</p>
                </div>
                {/* <div className={"item"}>
                    <p className={"item-text-colored"}>AUTHOR:</p>
                    <p className={"item-text"}>{model.name}</p>
                </div> */}
                <div className={"item"}>
                    <p className={"item-text-colored"}>DATE:</p>
                    <p className={"item-text"}>{formatedDate}</p>
                </div>
                <div className={"item"}>
                    <p className={"item-text-colored"}>TITLE:</p>
                    <p className={"item-text"}>{model.title}</p>
                </div>
            </div>
            <div className={"last-item"}>
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
                        <img className={"icon"} 
                            src="images/edit.png"
                            alt="share" 
                            onClick={() => {
                                history.replace(
                                    '/edit', { ...model }
                                )
                            }}/>
                    </TouchableOpacity>
                </div>
                <div className={"icon-container"}>
                    <TouchableOpacity>
                        <img className={"icon"} 
                            src="images/share.png"
                            alt="share" />
                    </TouchableOpacity>
                </div>
                <div className={"icon-container"}>
                    <TouchableOpacity>
                        <img className={"icon"} 
                            src="images/run.png"
                            alt="run"
                            onClick={() => {
                                history.replace(
                                    '/run', { ...model }
                                )
                            }} />
                    </TouchableOpacity>
                </div>
            </div>
        </div>
    )
}
