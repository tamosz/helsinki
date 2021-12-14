import React, { useState } from 'react'

const Header = ({ text }) => (<h1>{text}</h1>)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  let allRatings = good + neutral + bad
  let averageRating = ((good * 1 + neutral * 0 + bad * -1) / 3)
  let positivePercentage = ((good / (good + neutral + bad)) * 100)
  
  if(allRatings === 0){
    return (<p>No feedback given</p>)
  }
  return(
    <table>
      <tbody>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value = {bad} />
      <StatisticLine text="all" value = {allRatings} />
      <StatisticLine text="average" value={averageRating} />
      <StatisticLine text="positive" value={positivePercentage} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={() => setGood(good + 1)}  text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)}  text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)}  text={"bad"} />
      <Header text={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App