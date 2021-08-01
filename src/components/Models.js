import React from 'react'
import { Model } from './Model'

const Models = ({ models, onDelete }) => {

    return (
        <>
            {models.map( (model) => (
                <Model key={model.ai_id} model={model} onDelete={onDelete}/>
            ))}
        </>
    )
}

export default Models
