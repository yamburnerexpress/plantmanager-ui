import React, {useRef, useState} from 'react';
import { useAuth } from '../hooks/AuthProvider';
import { Nav } from '../components/Nav';

export const ChangePassword = () => {
  const {authFetch} = useAuth();
  const form = useRef(null)
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = e => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form.current))
    postChangePassword(data);
  }

  const postChangePassword = async (data) => {
    console.log(JSON.stringify(data))
    await authFetch.post(
      "users/me/changepassword/", 
      JSON.stringify(data)
    )
    .catch((err) => {
      setErrorMsg(err.response.data.detail)
    });
  }

  return (
    <div className='bg-gradient-to-b from-green-300 to-cyan-500 bg-fixed min-h-screen'>
      <Nav title='Change Password' />
      <main className='h-screen sm:my-auto flex flex-col items-center px-5 sm:place-items-center'>
        <div className='mt-20 sm:my-auto h-auto w-full sm:w-96 bg-white rounded-md p-5 shadow-md'>
          <form id="changePassword" ref={form} onSubmit={handleSubmit} className='flex flex-col'>
            <label htmlFor="oldPassword" className='font-semibold mb-px'>Old Password</label>
            <input id="oldPassword" name="oldPassword" className='border border-black rounded mb-3 px-2 py-px' type="password" />
            <label htmlFor="newPassword" className='font-semibold mb-px'>New Password</label>
            <input id="newPassword" name="newPassword" className='border border-black rounded mb-3 px-2 py-px' type="password" />
            {errorMsg && <span className='text-red-500'>{errorMsg}</span>}
            <button type="submit" className='font-semibold ml-auto bg-green-300 hover:bg-green-500 px-3 py-2 rounded-md shadow'>Save</button>
          </form>
        </div>
      </main>
    </div>
  )
}

