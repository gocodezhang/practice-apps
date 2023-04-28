import {useState, useEffect} from 'react';

const Search = function({ setFilter }) {
  const [entry, setEntry] = useState('')

  const clickHandler = function () {
    setFilter(entry)
    setEntry('')
  }

  const resetHandler = function () {
    setEntry('')
    setFilter(entry)
  }

  return (
    <div className="search container">
      <input value={entry} onChange={(e) => (setEntry(e.target.value))} placeholder='Search word here'></input>
      <button onClick={clickHandler}>Search</button>
      <button onClick={resetHandler}>Reset</button>
    </div>
  )
}

export default Search;