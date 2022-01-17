import React from 'react'

const Filter = ({onSearch, searchTerm}) => (
    <div>
    filter shown with <input 
    value = {searchTerm}
    onChange = {onSearch}/>
  </div>
)

export default Filter