import WordEntry from './WordEntry.jsx';

const WordList = function({ words, filter, deleteHandler, editHandler }) {
  let filteredWords;
  if (filter.length === 0) {
    filteredWords = words
  } else {
    filteredWords = words.filter((word) => {
      return word.text.indexOf(filter) !== -1
    })
  }

  return (
    <div className="list container">
      <h3>Glossary</h3>
      {filteredWords.length === 0 ? <div>No words found</div> : filteredWords.map((word) => {
        return <WordEntry deleteHandler={deleteHandler} editHandler={editHandler} word={word} key={word.text}/>
      })}
    </div>
  )
}

export default WordList;