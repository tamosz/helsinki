import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/backendCommunication'
import Notification from './components/Notification'
import Error from './components/Error'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setSearchResults(response.data)
      })
  }, [])

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
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setSearchResults(persons.concat(response.data)) //live update
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
      })
    } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){ 
      let oldObject = (persons.find(obj => obj.name === personObject.name))
      personObject.id = oldObject.id
      personService
          .update(personObject.id, personObject)
          .then(response => {
            setNotificationMessage(`${newName}'s number has been updated to ${newNumber}`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            setSearchResults(persons.map(person => person.id !== personObject.id ? person : response.data))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
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

  const handleDeleteClick = (event) => {
    if (window.confirm(`Delete ${event.name}?`)){
      personService.remove(event.id)
      setSearchResults(persons.filter(person => person.id !== event.id))
    }
  }

   useEffect(() => {
     const results = persons.filter(person =>
       person.name.toLowerCase().includes(searchTerm.toLowerCase()))
       setSearchResults(results)
  }, [searchTerm])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter onSearch={handleSearchTermChange} searchTerm={searchTerm} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange} />
        
      <h2>Numbers</h2>
      <ul>
      {searchResults.map(person =>
        <div><Person key={person.id} person={person} clickDelete={handleDeleteClick}/></div>
        )}
      </ul>
    </div>
  )
}

export default App
