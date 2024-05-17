import React, {useRef, useState} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

export const Registration = () => {
  const [errorMsg, setErrorMsg] = useState();
  const [confirmation, setConfirmation] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const form = useRef(null)

  const handleSubmit = e => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form.current))
    postUserRegistration(data);
  }

  const postUserRegistration = async (data) => {
    const config = {headers: { "Content-Type": "application/json" }}
    await axios.post(
      `${process.env.REACT_APP_API_URI}/api/users/register/`, 
      JSON.stringify(data),
      config
    )
    .then(() => {
      setErrorMsg();
      setConfirmation("User created successfully!");
    })
    .catch((err) => {
      setConfirmation();
      setErrorMsg(err.response.data.detail);
    });
  }

  const validateRepeatPassword = () => {
    if (password !== repeatPassword) {
      setErrorMsg("Passwords do not match");
    } else {
      setErrorMsg();
    }
  }

  return (
    <div className='bg-gradient-to-b from-green-300 to-cyan-500 bg-fixed min-h-screen'>
      <main className='h-screen sm:my-auto flex flex-col items-center px-5 sm:place-items-center'>
        <div className='mt-20 sm:my-auto h-auto w-full sm:w-96 bg-white rounded-md p-5 shadow-md'>
          <form id="register" ref={form} onSubmit={handleSubmit} className='flex flex-col'>
            <label htmlFor="username" className='font-semibold mb-px'>Username</label>
            <input 
              id="username" 
              name="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className='border border-black rounded mb-3 px-2 py-px' 
            />
            <label htmlFor="password" className='font-semibold mb-px'>Password</label>
            <input 
              id="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className='border border-black rounded mb-3 px-2 py-px' 
              type="password" 
            />
            <label htmlFor="repeatPassword" className='font-semibold mb-px'>Re-Enter Password</label>
            <input 
              id="repeatPassword" 
              value={repeatPassword} 
              onChange={(e) => setRepeatPassword(e.target.value)} 
              onBlur={validateRepeatPassword}
              className='border border-black rounded mb-3 px-2 py-px' 
              type="password" 
            />
            <label htmlFor="inviteCode" className='font-semibold mb-px'>Invite Code</label>
            <input 
              id="inviteCode" 
              name="invite_code" 
              value={inviteCode} 
              onChange={(e) => setInviteCode(e.target.value)} 
              className='border border-black rounded mb-3 px-2 py-px' 
            />
            {errorMsg && <span className='text-center text-red-500'>{errorMsg}</span>}
            {confirmation && <span className='text-center text-green-700'>{confirmation}</span>}
            <div className='w-full flex justify-end items-center gap-x-3 mt-2'>
              <Link className='inline-flex items-center gap-x-2 font-semibold' to={'/login'}>
                  <FaArrowLeft size='1em' />
                  Back to Login
              </Link>
              <button type="submit" className='font-semibold bg-green-300 hover:bg-green-500 active:bg-green-500 px-3 py-2 rounded-md shadow'>Register</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}