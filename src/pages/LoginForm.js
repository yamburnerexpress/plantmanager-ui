import React, {useState, useEffect, useRef} from 'react';
import { useAuth } from '../hooks/AuthProvider';

export const LoginForm = () => {
  const {loginAction} = useAuth();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const form = useRef(null)

  const handleSubmit = e => {
    e.preventDefault()
    const data = new FormData(form.current)
    loginAction(data);
  }

  return (
    <form id="login" ref={form} onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
      <input id="username" name="username" onChange={e => setUserName(e.target.value)}/>
      <br />
      <label htmlFor="password">Password: </label>
      <input id="password" name="password" type="password" onChange={e => setPassword(e.target.value)}/>
      <br />
      <button type="submit">Login</button>
    </form>
  )
}

