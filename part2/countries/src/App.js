import React, { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchTermChange = (event) =>{
    setSearchTerm(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))


  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      find countries <input 
       value={searchTerm}
       onChange={handleSearchTermChange}/>
      <div>
        {countriesToShow.length < 9 &&
        countriesToShow.map(country => 
        <div>{country.name.common}</div>
        )}
        {countriesToShow.length >= 9 &&
        <div>Too many results, please refine your search</div>}
        {countriesToShow.length === 1 &&
        countriesToShow.map(country =>
        <div>{country.name.common}</div>)}
      </div>
    </div>
  );
}

export default App;
