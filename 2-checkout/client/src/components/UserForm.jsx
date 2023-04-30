import {useState} from 'react';

const UserForm = function ({ userFormHandler }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clickHandler = function () {
    userFormHandler(name, email, password)
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="userform container">
      <div className="name">
        <span>Name</span><input onChange={(e)=>(setName(e.target.value))} value={name}></input>
      </div>
      <div className="email">
        <span>Email</span><input onChange={(e)=>(setEmail(e.target.value))} value={email}></input>
      </div>
      <div className="password">
        <span>Password</span><input onChange={(e)=>(setPassword(e.target.value))} value={password}></input>
      </div>
      <div className="next">
        <button onClick={clickHandler}>Next Step</button>
      </div>
    </div>
  )
}

export default UserForm;