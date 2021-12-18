import React from 'react'

const Course = (props) => {
    return (
      <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const exerciseArr = course.parts.map(part => part.exercises)
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const exerciseSum = exerciseArr.reduce(reducer, 0)
    return (
      <p>{`Total of ${exerciseSum} exercises`}</p>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.course.parts.map(part =>
          <Part key={part.id} part={part} />
          )}
      </div>
    )
  }

  export default Course