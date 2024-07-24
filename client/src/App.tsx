import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ProblemPage from './pages/ProblemPage.tsx';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { useEffect, useState } from 'react';
import { auth } from './firebase.ts';
import {useAuthState} from 'react-firebase-hooks/auth';
import UnAuthNav from './components/UnAuthNav.tsx';
import AuthNav from './components/AuthNav.tsx';
import { loadUser, UserProblem } from './server/user.ts';
import { User } from 'firebase/auth';
import { listProblems, Problem } from './server/problem.ts';
import Alert from './components/Alert.tsx';
import { userInfoToSet } from './functions.ts';
import Reset from './pages/Reset.tsx';
import About from './pages/About.tsx';
import Account from './pages/Account.tsx';
import { FaArrowDown } from "react-icons/fa";

export type iSet = 
{
  comp: {has: (u: string) => boolean},
  att: {has: (u: string) => boolean}
}


function App() {

  const [user] = useAuthState(auth)
  const [problems, setProblems] = useState<[Problem] | null>(null)
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState<{ message: string, theme: string } | null>(null)
  const [infoSet, setInfoSet] = useState<iSet | undefined>(undefined)



  const doLoadChange = (b: boolean): void => {
    setLoading(b)
  }

  
  const doUserInfoChange = (u: User) => {
   
    loadUser(u, (i: [UserProblem] | []) => { 
      if (i) {
        const s = userInfoToSet(i)
        setInfoSet(s)
      }
      
    }) 
  }

  const doAlert = (message: string, theme: string): void => {
    setAlert({message: message, theme: theme})
    setTimeout(() => {
      setAlert(null)
    }, 4000)
  }

  useEffect(() => {
    doLoadChange(true)
    setCount(0)
    const fetchData = (u: User | null) => {
     
      listProblems((p: [Problem]) => {
        setProblems(p)
        if (u) {
           
          loadUser(u, (i: [UserProblem]) => { 
            if (i) {
              setInfoSet(userInfoToSet(i))
              doAlert(`${u.email} logged in!`, "success")
              
            }
            doLoadChange(false)
          })
        } else {
          setInfoSet(undefined)
          doLoadChange(false)
        } 
        doLoadChange(false)
      })
      
    }
    
    if (user !== undefined) {
      fetchData(user)
    }

  }, [user])

  const [count, setCount] = useState(0)

  if (loading || problems === null) {
    return (
      <div className='p-16 mt-16 flex flex-col w-screen items-center'>
        <div className='flex items-center gap-4 mb-16'>
          <h3
          className=' text-3xl'>
            Loading
          </h3>
          <div
            className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
          </div>
          
        </div>
        <p className='text-sm opacity-60'>
        because I don't want to pay more for hosting, server can take 50+ seconds to start ):
        </p>
        <div className='text-sm flex gap-2 justify-between items-center'>
          <p className='text-sm items-center text-center pt-2 flex opacity-60'>On the bright side, you can click on this number as you wait</p>

          <div className='flex flex-col justify-center items-center m-2'>
            <p className='flex items-center gap-2'>CLICK ME <FaArrowDown size={16} /></p>
            <button  
            className="p-2 rounded w-8 h-8 text-4xl animate-bounce"
            onClick={() => setCount(count + 1)}>
              {count}
            </button>
          </div>
          
        </div>
        
        
      </div>
    )
  }

  return (
    
    <BrowserRouter>  
    {user === null || user === undefined ? <UnAuthNav /> : <AuthNav />}
    {user === null || user === undefined ?
      <Routes>
        <Route path="/about" element={<About />} />

        <Route path="/" element={<Home problems={problems}/>} />
        <Route path="/problem/:id" element={<ProblemPage alert={(m,t) => doAlert(m,t)} changeLoading={(b) => doLoadChange(b)}/>} />
        <Route path="/sign-in" element={<SignIn  />} />
        <Route path="/sign-up" element={< SignUp />} />
        <Route path="sign-in/reset" element={< Reset />} />
      </Routes> : 
      <Routes>
        <Route path="/about" element={<About />} />
    
        <Route path="/" element={<Home infoSet={infoSet} problems={problems} />} />
        <Route path="/problem/:id" element={<ProblemPage updateUserInfo={() => doUserInfoChange(user)} alert={(m,t) => doAlert(m,t)} currentUser={user} changeLoading={(b) => doLoadChange(b)}/>} />
        <Route path="/account" element={<Account user={user} />} />
      </Routes>
      }
      {alert &&
      <Alert message={alert?.message} theme={alert?.theme}/>
      }
      </BrowserRouter>

  )
}

export default App
