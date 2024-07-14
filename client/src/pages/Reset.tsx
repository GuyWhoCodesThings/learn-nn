import { useState } from 'react';
import { auth } from '../firebase.tsx';
import { NavLink } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";

export default function Reset() {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [ sent, setSent ] = useState(false)

    
    const onResetClick = (e) => {
        setError('')
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setSent(true)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode + errorMessage)
        });
    }

  return (
    <div className='relative w-screen'>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
              Reset Password
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {!sent ?
                <form className="space-y-6">
             
                
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                    Email
                  </label>
             
                </div>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="current-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-1 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={onResetClick}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send Reset Password Link
                </button>
              </div>
            </form>
            :
            <div className='flex gap-2 justify-center text-lg bg-zinc-700 p-4 rounded-md'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p className='text-center'>Password reset email sent!</p>

            </div>
            }
            <p className="mt-5 text-center text-md text-red-500">
              {error}
            </p>

            {sent && 
            <p className="mt-5 text-center text-sm text-gray-300">
              Back to{' '}
              <NavLink to="../sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login
              </NavLink>
            </p>
            }
          </div>
        </div>
      </div>
  )
}
