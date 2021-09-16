import React from 'react'
import { Model } from './Model'

const Models = ({ models, onDelete, handlePrivacy }) => {

    return (
        <>
            {models.map( (model) => (
                <Model key={model.ai_id} model={model} onDelete={onDelete} handlePrivacy={handlePrivacy}/>
            ))}
        </>
    )
}

export default Models
