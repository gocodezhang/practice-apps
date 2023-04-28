import PageNumber from './PageNumber.jsx';

const Pagination = function ({ pageNumbers, pageHandler, currentPage }) {

  return (
    <ul className="page">
      <li>
        <span className="left arrow">&#60;</span>
      </li>
      {pageNumbers.map((number) => (
        <PageNumber number={number} pageHandler={pageHandler} currentPage={currentPage} key={number}/>
      ))}
      <li>
      <span className="right arrow">&#62;</span>
      </li>
    </ul>
  )
}

export default Pagination;