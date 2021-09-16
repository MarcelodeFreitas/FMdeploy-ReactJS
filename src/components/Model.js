import './Model.css'
import TouchableOpacity from './TouchableOpacity'
import { useHistory } from "react-router-dom"
import Tooltip from '@material-ui/core/Tooltip'

export const Model = ({ model, actionButtons, onDelete, handlePrivacy }) => {
    const date = new Date(model.created_in)
    const formatedDate = new Intl.DateTimeFormat().format(date)
    const history = useHistory()

    const RenderButtons = () => {
        if (actionButtons === "all") {
            return (
                <div className={"last-item"}>
                    <div className={"icon-container"}>
                        <TouchableOpacity>
                            <Tooltip title="Delete" arrow>
                                <img className={"icon"}
                                    onClick={() => onDelete(model.ai_id)}
                                    src="images/trash.png"
                                    alt="delete" />
                            </Tooltip>
                        </TouchableOpacity>
                    </div>
                    <div className={"icon-container"}>
                        <TouchableOpacity>
                            <Tooltip title="Edit" arrow>
                                <img className={"icon"}
                                    src="images/edit.png"
                                    alt="share"
                                    onClick={() => {
                                        history.replace(
                                            '/edit', { ...model }
                                        )
                                    }} />
                            </Tooltip>
                        </TouchableOpacity>
                    </div>
                    {model.is_private ?
                        <div className={"icon-container"}>
                            <TouchableOpacity>
                                <Tooltip title="Private" arrow>
                                    <img className={"icon"}
                                        src="images/private.png"
                                        alt="private"
                                        onClick={() => {
                                            handlePrivacy(model.ai_id, !model.is_private)
                                        }} />
                                </Tooltip>
                            </TouchableOpacity>
                        </div>
                        :
                        <div className={"icon-container"}>
                            <TouchableOpacity>
                                <Tooltip title="Public" arrow>
                                    <img className={"icon"}
                                        src="images/public.png"
                                        alt="share"
                                        onClick={() => {
                                            handlePrivacy(model.ai_id, !model.is_private)
                                        }} />
                                </Tooltip>
                            </TouchableOpacity>
                        </div>
                    }

                    <div className={"icon-container"}>
                        <TouchableOpacity>
                            <Tooltip title="Share" arrow>
                                <img className={"icon"}
                                    src="images/share.png"
                                    alt="share"
                                    onClick={() => {
                                        history.replace(
                                            '/share', { ...model }
                                        )
                                    }} />
                            </Tooltip>
                        </TouchableOpacity>
                    </div>
                    <div className={"icon-container"}>
                        <TouchableOpacity>
                            <Tooltip title="Run" arrow>
                                <img className={"icon"}
                                    src="images/run.png"
                                    alt="run"
                                    onClick={() => {
                                        history.replace(
                                            '/run', { ...model }
                                        )
                                    }} />
                            </Tooltip>
                        </TouchableOpacity>
                    </div>
                </div>
            )
        }

        if (actionButtons === "run") {
            return (
                <div className={"last-item"}>
                    <div className={"icon-container"}>
                        <TouchableOpacity>
                            <Tooltip title="Run" arrow>
                                <img className={"icon"}
                                    src="images/run.png"
                                    alt="run"
                                    onClick={() => {
                                        history.replace(
                                            '/run', { ...model }
                                        )
                                    }} />
                            </Tooltip>
                        </TouchableOpacity>
                    </div>
                </div>
            )
        }

        
    }

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
            <RenderButtons />
        </div>
    )
}
