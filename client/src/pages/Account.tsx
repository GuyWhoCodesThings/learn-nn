import { useState } from "react"
import { IoIosCheckmarkCircle } from "react-icons/io";
import { EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, updateEmail, updatePassword, User } from "firebase/auth";

type AccountType = {
  user: User
}

const Account = (props: AccountType) => {

    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [change, setChange] = useState(true)


    const handleVerification = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setError('')
      sendEmailVerification(props.user)
      .then(() => {
        console.log('verification email sent!')
        setEmailSent(true)
      })
      .catch((err) => {
        setError(JSON.stringify(err))
      })

    }

    const handlePasswordUpdate = (): void => {

      updatePassword(props.user, password)
      .then(() => {
        console.log('password changed')
        setPassword('')
      }).catch((err) => {
        setError(JSON.stringify(err))
      })
    }
    const handleEmailUpdate = (): void => {

      updateEmail(props.user, email)
      .then(() => {
        setEmail('')
        console.log('email changed')

      }).catch((err) => {
        setError(JSON.stringify(err))
        
      })
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      setError('')

      if (typeof props.user.email !== 'string') {
        setError('current user email is not valid')
        return;
      }

      try {
        const cred = EmailAuthProvider.credential(
          props.user.email,
          oldPassword
        )
        reauthenticateWithCredential(props.user, cred)
        .then(() => {

          if (change) {
            handlePasswordUpdate()
          } else {
            handleEmailUpdate()
          }
        })
        .catch((err) => {
          setError(JSON.stringify(err))
          
        })
      } catch (err) {
        setError(JSON.stringify(err))
       
      }
    }

    return (
        <div 
        className="w-full  h-full mt-10 text-left">
          <main
          className="container w-full mx-auto bg-none p-4 rounded-md flex flex-col gap-8">
            

            <h2 className="text-4xl justify-center flex gap-2">Account</h2>

            <div className="flex justify-center">
              {props.user.emailVerified ? 
              <p className="flex gap-1 items-center">email verified <IoIosCheckmarkCircle size={15} className="text-green-500" /></p> : 
              <button
              onClick={(e) => handleVerification(e)}
              className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {emailSent ? "Send Verification Email" : "Email Sent!"}
              </button>}
            </div>

            
            <form className="space-y-6">
              <p className="text-center">I want to change my</p>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium leading-6 flex gap-2">
                  <label>Password</label>
                  <input type="radio" name="change" value="pass" checked={change} onChange={() => setChange(true)}/>
                </div>
                <div className="text-sm font-medium leading-6 flex gap-2">
                  <label>Email</label>
                  <input type="radio" name="change" value="email" checked={!change} onChange={() => setChange(false)}/>
                </div>
              </div>
            
            <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                    Old Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="passwordOld"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="p-1 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              { change ?
             
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                      New Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="passwordNew"
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
    
              :
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                    New Email
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="new email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-1 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              }
  
              <div>
                <button
                type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update
                </button>
              </div>
            </form>

            <p className="text-sm text-red-500">{error}</p>

          </main>
         
        </div>
      )
}

export default Account;