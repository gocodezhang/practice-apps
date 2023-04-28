
import {useState, useEffect} from 'react';

const WordEntry = function({ word, deleteHandler, editHandler, saveHandler }) {
  const [wordDefinition, setWordDefinition] = useState(word.definition)

  const inLineHandler = (e) => {
    setWordDefinition(e.target.value)
  }

  return (
    <div className="entry container">
      <p><b>{word.text}:</b> <input value={wordDefinition} onChange={inLineHandler} onKeyDown={(e) => {saveHandler(e, word, wordDefinition)}}
      onFocus={(e) => (e.target.style.background = 'pink')} onBlur={(e) => (e.target.style.background = "")}></input></p>
      {/*<button onClick={() => (editHandler(word))}>Edit</button>*/}
      <button onClick={() => (deleteHandler(word))}>Delete</button>
    </div>
  )
}

export default WordEntry;