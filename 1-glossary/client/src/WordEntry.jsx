import axios from 'axios';

const WordEntry = function({ word, deleteHandler, editHandler }) {

  return (
    <div className="entry container">
      <p><b>{word.text}:</b> {word.definition}</p>
      <button onClick={() => (editHandler(word))}>Edit</button>
      <button onClick={() => (deleteHandler(word))}>Delete</button>
    </div>
  )
}

export default WordEntry;