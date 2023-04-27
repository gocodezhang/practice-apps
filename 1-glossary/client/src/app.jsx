import Search from './Search.jsx';
import AddWord from './AddWord.jsx';
import WordList from './WordList.jsx';
import {useState, useEffect} from 'react';
import axios from 'axios';

// const wordsArr = [
//   {text: 'beautiful', definition: 'pleasing the senses or mind aesthetically'},
//   {text: 'ugly', definition: 'unpleasant or repulsive, especially in appearance'}
// ]

const App = function() {
  const [words, setWords] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('/words')
    .then((response) => {
      setWords(response.data);
    })
    .catch((err) => {
      console.log(err)
    })
  },[refresh])

  const addHandler = function (word) {
    // Assume format: "word: definition"
    // Parse the word into object
    const text = word.split(':')[0];
    const definition = word.split(':')[1].trim();
    const obj = {
      text: text,
      definition: definition
    }
    // Send POST to server
    axios.post('/words', obj)
    .then(() => {
      setRefresh(refresh ? 0 : 1)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const deleteHandler = function (word) {
    console.log({data: word});
    axios.delete('/words', {data: word})
    .then(() => {
      setRefresh(refresh ? 0 : 1)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const editHandler = function (word) {
    const updatedDefinition = prompt('Please update the word definition. In case you would like to update the word itself, please delete this word and add new words')
    const updatedWord = {
      _id: word._id,
      text: word.text,
      definition: updatedDefinition
    }
    axios.put('/words', updatedWord)
    .then(() => {
      setRefresh(refresh ? 0 : 1)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <Search setFilter={setFilter}/>
      <AddWord addHandler={addHandler} />
      <WordList words={words} filter={filter} deleteHandler={deleteHandler} editHandler={editHandler}/>
    </div>
  )
}

export default App;