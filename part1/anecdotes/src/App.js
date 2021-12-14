import React, { useState } from 'react'

const Header = (props) => (
  <h1>{props.text}</h1>
)

const Text = (props) => (
  <p>{props.text}</p>
  )


const getRandomIntInclusive = (props) => {
  let min = Math.ceil(0);
  let max = Math.floor(props);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [selected, setSelected] = useState(0)
  const mostVotes = Math.max(...votes)
  const mostVotedAnecdote = anecdotes[votes.indexOf(mostVotes)]
  return (
    <div>
      <Header text={"Anecdote of the day"} />
      <Text text={anecdotes[selected]} />
      <Text text={`has ${votes[selected]} votes`} />
      <Button text={"vote"} handleClick={() => {
        const shallowCopy = [...votes]
        shallowCopy[selected] += 1
        setVotes(shallowCopy)
        }} />
      <Button handleClick={() => {setSelected(getRandomIntInclusive(anecdotes.length - 1))}} text={"next anecdote"}/>
      <Header text={"Anecdote with most votes"} />
      <Text text={mostVotedAnecdote} />
      <Text text={`has ${mostVotes} votes`}/>
    </div>
  )
}

export default App