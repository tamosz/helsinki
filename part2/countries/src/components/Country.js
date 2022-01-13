import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }

    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${params.query}&appid=${params.access_key}`)
      .then(response => {
        const apiResponse = response.data;
        setWeather([apiResponse])
      }).catch(error => {
        console.log(error);
    })
  })

  if (weather.length > 0) {
      const currentWeather = weather[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h2>Spoken languages</h2>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt="Country flag"></img>
        <h2>Weather in {country.capital}</h2>
        <p>temperature: {currentWeather.main.temp}° Kelvin</p>
        <p>wind: {currentWeather.wind.speed} mph direction {currentWeather.wind.deg}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="Country flag"></img>
    </div>
  )
}

export default Country