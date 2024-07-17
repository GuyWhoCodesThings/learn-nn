import {useState} from 'react';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.ts';
import { NavLink, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
 
const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handlePopup = (e: React.MouseEvent<HTMLButtonElement>, providerName: string): void => {
      e.preventDefault()
      const provider = providerName === 'go' ? new GoogleAuthProvider() : (providerName === 'fa' ? new FacebookAuthProvider() : new GithubAuthProvider())
      signInWithPopup(auth, provider)
      .then(() => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
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
       
    const onSignInClick = (e:  React.MouseEvent<HTMLButtonElement>) => {
      setError('')
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Signed in
            
            navigate("/")

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setError(errorMessage)
        });
       
    }
 
    
    return (
      <div className='relative w-screen mt-6'>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <AiFillCodeSandboxCircle size={100} className='mx-auto w-auto text-red-500' />
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight ">
              Login to your account
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
                    className="p-1 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                    Password
                  </label>
                  <div className="text-sm">
                    <NavLink to="./reset" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </NavLink>
                  </div>
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
  
              <div>
                <button
                  type="submit"
                  onClick={onSignInClick}
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
            
  
            <p className="mt-5 text-center text-sm text-gray-300">
              Don't have an account?{' '}
              <NavLink to="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign Up
              </NavLink>
            </p>

            <div className='flex flex-col gap-4 mt-8 text-sm font-light'>
                <p>or you can login with</p>
                <div className='flex gap-1 w-full justify-center'>
                  {/* <button
                    onClick={(e) => handlePopup(e, 'gi')}
                  >
                    <FaGithub size={45}  className=" hover:text-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600" />
                  </button> */}
                  <button
                    onClick={(e) => handlePopup(e, 'go')}
                  >
                    <FaGoogle size={45}  className="hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" />
                  </button>
                  {/* <button
                    onClick={(e) => handlePopup(e, 'fa')}
                  >
                    <FaFacebook size={45}  className="hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" />
                  </button> */}
                  
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

export default SignIn;