const HomePgae = function ({ homeHandler, username }) {

  return (
    <div>
      <h3>Hello {username}</h3>
      <button onClick={homeHandler}>Checkout</button>
    </div>
  )
}

export default HomePgae;