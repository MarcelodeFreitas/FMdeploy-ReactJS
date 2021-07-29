import React from 'react'

const models = [
    {
        id: 1,
        name: 'OB MASKS',
        author: "Francisca",
        date: "08/07/2021",
    },
    {
        id: 2,
        name: 'OB MASKS',
        author: "Francisca",
        date: "08/07/2021",
    },
    {
        id: 3,
        name: 'OB MASKS',
        author: "Francisca",
        date: "08/07/2021",
    },
    {
        id: 4,
        name: 'OB MASKS',
        author: "Francisca",
        date: "08/07/2021",
    },
]

const Models = () => {
    return (
        <>
            {models.map( (model) => (<h3>{model.id}</h3>))}
        </>
    )
}

export default Models
