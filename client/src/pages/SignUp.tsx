import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';
import { auth } from '../firebase.ts';
import { createUser } from '../server/user.ts';
import { useState } from 'react';
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";



 
const SignUp = (props: {initError?: string}) => {


    
    
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState(props.initError === undefined ? '' : props.initError);
       

    const handlePopup = (e: React.MouseEvent<HTMLButtonElement>, providerName: string): void => {
      e.preventDefault()
      const provider = providerName === 'go' ? new GoogleAuthProvider() : (providerName === 'fa' ? new FacebookAuthProvider() : new GithubAuthProvider())
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        createUser(user, (name: string) => console.log(`user ${name} saved`))
        navigate("/")
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        setError(errorCode + "" + errorMessage)
        // ...
      });
    }
    
    const onSignUpClick = async (e:  React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setError('')
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // created account
            const user = userCredential.user;
             
            if (user.email === null) {
              throw new Error('email must not be null')
            }
            

            createUser(user, (name: string) => console.log(`user ${name} saved`))
            navigate("/")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode + "" + errorMessage)
            // ..
        });
    }
 
  return (
      <div className='flex w-max'>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight ">
              Sign Up
            </h2>
          </div>
  
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-1 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                    Password
                  </label>
              
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-1 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className='flex flex-col gap-2'>
                <button
                  type="submit"
                  onClick={(e) => onSignUpClick(e)}
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Account
                </button>

                
              </div>
            </form>
  
            <p className="mt-5 text-center text-sm text-gray-300">
              Already a user?{' '}
              <NavLink to="/sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login
              </NavLink>
            </p>

            <div className='flex flex-col gap-4 mt-8 text-sm font-light'>
                <p>or you can sign up with</p>
                <div className='flex gap-1 w-full justify-center'>
                  <button
                    onClick={(e) => handlePopup(e, 'gi')}
                  >
                    <FaGithub size={45}  className=" hover:text-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600" />
                  </button>
                  <button
                    onClick={(e) => handlePopup(e, 'go')}
                  >
                    <FaGoogle size={45}  className="hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" />
                  </button>
                  <button
                    onClick={(e) => handlePopup(e, 'fa')}
                  >
                    <FaFacebook size={45}  className="hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" />
                  </button>
                  
                </div>

                <p className="mt-5 text-center text-md text-red-500">
                  {error}
                </p>
            </div>
          </div>
        </div>
      </div>
    )
}
 
export default SignUp