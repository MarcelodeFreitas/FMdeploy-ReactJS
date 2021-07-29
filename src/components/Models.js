import React from 'react'
import { Model } from './Model'

const Models = ({ models, onDelete }) => {

    return (
        <>
            {models.map( (model) => (
                <Model key={model.id} model={model} onDelete={onDelete}/>
            ))}
        </>
    )
}

export default Models
