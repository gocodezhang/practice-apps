import Search from './components/Search.jsx';
import AddWord from './components/AddWord.jsx';
import WordList from './components/WordList.jsx';
import Pagination from './components/Pagination.jsx';
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
  const [maxPage, setMaxPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  let pageNumbers = [];

  for (var i = 1; i <= maxPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    console.log('Client send refresh request');

    Promise.all([axios.get('/words', {params: {currentPage: currentPage}}),
    axios.get('/page')])
    .then((responses) => {
      setWords(responses[0].data)
      setMaxPage(responses[1].data)
    })
    .catch((err) => {
      console.log(err)
    })
    // axios.get('/words', {params: {currentPage: currentPage}})
    // .then((response) => {
    //   setWords(response.data);
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
  },[refresh, currentPage])

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

  /* -------------------------WordEntry Event handlers--------------------------------
  --------------------------------------------------------------*/

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

  const saveHandler = function (e, word, updatedDefinition) {
    if (e.key === 'Enter') {
      e.target.blur()
      const updatedWord = {
        _id: word._id,
        text: word.text,
        definition: updatedDefinition
      }
      console.log('Client send PUT request');
      axios.put('/words', updatedWord)
      .then(() => {
        setRefresh(refresh ? 0 : 1)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

    /* -------------------------Page Event handlers--------------------------------
  --------------------------------------------------------------*/

  const pageHandler = function (pageNumber) {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <Search setFilter={setFilter}/>
      <AddWord addHandler={addHandler} />
      <WordList words={words} filter={filter} deleteHandler={deleteHandler} editHandler={editHandler} saveHandler={saveHandler}/>
      <Pagination pageNumbers={pageNumbers} pageHandler={pageHandler} currentPage={currentPage}/>
    </div>
  )
}

export default App;