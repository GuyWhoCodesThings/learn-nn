import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ProblemPage from './pages/ProblemPage.js';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { useEffect, useState } from 'react';
import { auth } from './firebase.tsx';
import {useAuthState} from 'react-firebase-hooks/auth';
import UnAuthNav from './components/UnAuthNav.js';
import AuthNav from './components/AuthNav.js';
import { loadUser } from './server/user.js';
import { User } from 'firebase/auth';
import { listProblems } from './server/problem.js';
import Alert from './components/Alert.js';
import { userInfoToSet } from './functions.js';
import Reset from './pages/Reset.js';



function App() {

  const [user] = useAuthState(auth)
  const [problems, setProblems] = useState<Array<string> | null>(null)
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState<{ message: string, theme: string } | null>(null)
  const [infoSet, setInfoSet] = useState<object | null>(null)


  const doLoadChange = (b: boolean): void => {
    setLoading(b)
  }

  
  const doUserInfoChange = (u: User) => {
   
    loadUser(u, (i) => { 
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
     
      listProblems((p) => {
        setProblems(p)
        if (u) {
           
          loadUser(u, (i) => { 
            if (i) {
              setInfoSet(userInfoToSet(i))
              doAlert(`${u.email} logged in!`, "success")
              console.log(`${u.email} logged in!`)
            }
            doLoadChange(false)

          })
        } else {
          setInfoSet(null)
          doLoadChange(false)
        } 
        doLoadChange(false)
      })
      
    }
    
    if (user !== undefined) {
      fetchData(user)
    }

  }, [user])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    
    <BrowserRouter>  
    {user === null || user === undefined ? <UnAuthNav /> : <AuthNav />}
    {user === null || user === undefined ?
      <Routes>
        <Route path="/" element={<Home infoSet={infoSet} problems={problems}/>} />
        <Route path="/problem/:id" element={<ProblemPage alert={(m,t) => doAlert(m,t)} changeLoading={(b) => doLoadChange(b)}/>} />
        <Route path="/sign-in" element={<SignIn  />} />
        <Route path="/sign-up" element={< SignUp />} />
        <Route path="sign-in/reset" element={< Reset />} />
      </Routes> : 
      <Routes>
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
