import {useState} from 'react';

const AddressForm = function ({ addressFormHandler }) {
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')

  const clickHandler = function () {
    addressFormHandler(line1, line2, city, state, zip, phone)
    setLine1('')
    setLine2('')
    setCity('')
    setState('')
    setZip('')
    setPhone('')
  }

  return (
    <div className="address container">
      <h3>Address</h3>
      <div className="line1"><span>Line 1</span><input onChange={(e)=>(setLine1(e.target.value))}></input></div>
      <div className="line2"><span>Line 2</span><input onChange={(e)=>(setLine2(e.target.value))}></input></div>
      <div className="city"><span>City</span><input onChange={(e)=>(setCity(e.target.value))}></input></div>
      <div className="state"><span>State</span><input onChange={(e)=>(setState(e.target.value))}></input></div>
      <div className="zip"><span>Zip</span><input onChange={(e)=>(setZip(e.target.value))}></input></div>
      <h3>Contact</h3>
      <div className="phone"><span>Phone Number</span><input onChange={(e)=>(setPhone(e.target.value))}></input></div>
      <div className="next"><button onClick={clickHandler}>Next Step</button></div>
    </div>
  )
}

export default AddressForm;