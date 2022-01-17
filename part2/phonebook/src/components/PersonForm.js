import React from 'react'

const PersonForm = ({addPerson, newName, onNameChange, newNumber, onNumberChange}) => (
    <div>
    <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={onNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
)

export default PersonForm