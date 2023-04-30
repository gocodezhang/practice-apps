import axios from 'axios';
import {useState, userEffect} from 'react';
import React from 'react';
import HomePage from './components/HomePage.jsx';
import UserForm from './components/UserForm.jsx';
import AddressForm from './components/AddressForm.jsx';
import PaymentForm from './components/PaymentForm.jsx';
import Confirmation from './components/Confirmation.jsx';

const App = function () {

  const [currentStep, setCurrentStep] = useState(0);
  const [confirmationObj, setConfirmationObj] = useState({})
  const [username, setUserName] = useState('there')

  const renderCurrentStep = function (currentStep) {
    switch (currentStep) {
      case 0:
        return <HomePage homeHandler={homeHandler} username={username}/>
      case 1:
        return <UserForm userFormHandler={userFormHandler}/>
      case 2:
        return <AddressForm addressFormHandler={addressFormHandler}/>
      case 3:
        return <PaymentForm paymentHandler={paymentHandler}/>
      case 4:
        return <Confirmation confirmationObj={confirmationObj} stepHandler={stepHandler}/>
    }
  }

  const stepHandler = function () {
    if (currentStep === 4) {
      setUserName(confirmationObj.name)
      setCurrentStep(0)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const homeHandler = function () {
    axios.get('/checkout')
    .then((response) => {
      if (response.data) {
        stepHandler()
      }
    })
  }

  const userFormHandler = function (name, email, password) {
    const userObj = {
      name: name,
      email: email,
      password: password
    }
    axios.post('/users', userObj)
    .then(() => {
      stepHandler()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const addressFormHandler = function () {
    const addressObj = {
      line_1: arguments[0],
      line_2: arguments[1],
      city: arguments[2],
      state: arguments[3],
      zip: arguments[4]
    }
    const userObj = {
      phone_number: arguments[5]
    }
    Promise.all(
      [axios.post('/addresses', addressObj),
      axios.put('/users', userObj)]
    )
    .then(() => {
      stepHandler()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const paymentHandler = function () {
    const paymentObj = {
      card_number: arguments[0],
      expire_date: arguments[1],
      'CVV': arguments[2],
      billing_zip: arguments[3]
    }

    axios.post('/payments', paymentObj)
    .then(() => {
      axios.get('/confirmation')
      .then((response) => {
        console.log(response.data)
        setConfirmationObj(response.data)
        stepHandler()
      } )
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // const comfirmationHandler = function () {
  //   axios.get('/confirmation')
  //   .then((response) => {
  //     console.log(response.data)
  //     setConfirmationObj(response.data)
  //   } )
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

  return (
    <>
      {renderCurrentStep(currentStep)}
    </>

  )
}

export default App;