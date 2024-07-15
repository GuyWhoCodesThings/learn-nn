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
    console.log('user changed')
    const fetchData = (u: User | null) => {
     
      listProblems((p: [Problem]) => {
        setProblems(p)
        if (u) {
           
          loadUser(u, (i: [UserProblem]) => { 
            if (i) {
              setInfoSet(userInfoToSet(i))
              doAlert(`${u.email} logged in!`, "success")
              console.log(`${u.email} logged in!`)
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

  if (loading || problems === null) {
    return <div>Loading...</div>
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
      </Routes>
      }
      {alert &&
      <Alert message={alert?.message} theme={alert?.theme}/>
      }
      </BrowserRouter>

  )
}

export default App
