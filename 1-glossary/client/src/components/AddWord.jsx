import {useState, useEffect} from 'react';

const AddWord = function({ addHandler }) {
  const [entry, setEntry] = useState('');

  const clickHandler = function () {
    addHandler(entry)
    setEntry('')
  }
  return (
    <div className="add container">
      <input onChange={(e) => (setEntry(e.target.value))} value={entry} placeholder='Enter <word>: <definition>'></input>
      <button onClick={clickHandler}>Add</button>
    </div>
  )
}

export default AddWord;