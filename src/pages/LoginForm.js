import React, {useState, useEffect, useRef} from 'react';
import { useAuth } from '../hooks/AuthProvider';
import "../App.css"

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
    <div className='bg-gradient-to-b from-green-300 to-cyan-500 bg-fixed min-h-screen flex flex-col place-items-top sm:place-items-center'>
      <main className='min-h-full px-3 my-3 sm:my-auto'>
        <div className='login-container mx-3 h-auto w-auto sm:w-96 bg-white rounded-md p-5 shadow-md'>
          <form id="login" ref={form} onSubmit={handleSubmit} className='flex flex-col'>
            <label htmlFor="username" className='font-semibold mb-px'>Username</label>
            <input id="username" name="username" className='border border-black rounded mb-3 px-2 py-px' onChange={e => setUserName(e.target.value)}/>
            <label htmlFor="password" className='font-semibold mb-px'>Password</label>
            <input id="password" name="password" className='border border-black rounded mb-3 px-2 py-px' type="password" onChange={e => setPassword(e.target.value)}/>
            <button type="submit" className='font-semibold ml-auto bg-green-300 hover:bg-green-500 px-3 py-2 rounded-md shadow'>Login</button>
          </form>
        </div>
      </main>
    </div>
  )
}

