import {useState} from 'react';

const PaymentForm = function ({ paymentHandler }) {
  const [card, setCard] = useState('')
  const [date, setDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [zip, setZip] = useState('')

  const clickHandler = function () {
    paymentHandler(card, date, cvv, zip)
    setCard('')
    setDate('')
    setCvv('')
    setZip('')
  }

  return (
    <div className="payment container">
      <h3>payment</h3>
      <div className="card"><span>Credit Card Number</span><input onChange={(e) => (setCard(e.target.value))}></input></div>
      <div className="expire"><span>Expire Date</span><input onChange={(e) => (setDate(e.target.value))}></input></div>
      <div className="cvv"><span>CVV</span><input onChange={(e) => (setCvv(e.target.value))}></input></div>
      <div className="billing-zip"><span>Billing Zip Code</span><input onChange={(e) => (setZip(e.target.value))}></input></div>
      <div className="next"><button onClick={clickHandler}>Next Step</button></div>
    </div>
  )
}

export default PaymentForm;