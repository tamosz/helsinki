import React from 'react'

const Person = ({ person, clickDelete }) => {
    return (
        <li>{person.name} {person.number} <button onClick={() => clickDelete(person)}>delete</button></li>
    )
}

export default Person