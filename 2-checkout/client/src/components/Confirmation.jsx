const Confirmation = function ({ confirmationObj, stepHandler }) {

  return Object.keys(confirmationObj) === 0 ? <></> : (
    <div className="confirmation container">
      <h3>Summary</h3>
      <div className="userinfo">
        <div>Name: {confirmationObj.name}</div>
        <div>Email: {confirmationObj.email}</div>
        <div>Phone Number: {confirmationObj.phone_number}</div>
      </div>
      <div className="shipinfo">
        <div>Address: {`${confirmationObj.line_1}, ${confirmationObj.city}, ${confirmationObj.state}, ${confirmationObj.zip}`}</div>
      </div>
      <div className="paymentinfo">
        <div>Payment: {confirmationObj.card_number}</div>
      </div>
      <div className="purchase"><button onClick={stepHandler}>Purchase</button></div>
    </div>
  )
}

export default Confirmation;