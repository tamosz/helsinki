import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([]);

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    let result = persons.filter(obj => {
      return obj.name === personObject.name //returns an array name property that matches input
    })
    if (result.length === 0){ //if the array length is 0 there are no matches
      setPersons(persons.concat(personObject)) //concat doesn't mutate state directly
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)  //event handler for new name
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value) //event handler for new number
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value) //event handler for search term
  }

   useEffect(() => {
     const results = persons.filter(person =>
       person.name.toLowerCase().includes(searchTerm))
       setSearchResults(results)
  }, [searchTerm])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSearch={handleSearchTermChange} searchTerm={searchTerm}/>
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange} />
      {/* <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange} 
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */}
      <h2>Numbers</h2>
      <ul>
      {searchResults.map(person => 
            <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
