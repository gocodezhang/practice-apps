

const PageNumber = function ({ number, pageHandler, currentPage }) {

  const clickHandler = function (e) {
    pageHandler(e.target.value)
  }
  return (
    <li onClick={clickHandler} style={{backgroundColor: currentPage === number ? 'grey' : ''}} value={number}>{number}</li>
  )
}

export default PageNumber;