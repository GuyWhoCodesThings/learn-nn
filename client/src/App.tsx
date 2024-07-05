import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ProblemPage from './pages/ProblemPage.js';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { useEffect, useState } from 'react';
import { auth } from './firebase.js';
import {useAuthState} from 'react-firebase-hooks/auth';
import UnAuthNav from './components/UnAuthNav.js';
import AuthNav from './components/AuthNav.js';
import SignOut from './pages/SignOut.js';
import { loadUser, UserWork } from './server/user.js';
import { User } from 'firebase/auth';
import { listProblems } from './server/problem.js';



function App() {

  const [user] = useAuthState(auth)
  const [userInfo, setUserInfo] = useState<UserWork | undefined>(undefined)
  const [problems, setProblems] = useState<Array>([])
  const [loading, setLoading] = useState(false)

  const doLoadChange = (b: boolean): void => {
    setLoading(b)
  }

  useEffect(() => {
    doLoadChange(true)
    const fetchData = async(u: User | null) => {
      if (u) {
        await loadUser(u, (e) => setUserInfo(e))
        await listProblems(setProblems)
        console.log(`${u.email} logged in!`)
      } 
    }
    if (user !== undefined) {
      fetchData(user)
    }
    doLoadChange(false)
  }, [user])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    
    <BrowserRouter>  
    {user === null || user === undefined ? <UnAuthNav /> : <AuthNav />}
    {user === null || user === undefined ?
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem/:id" element={<ProblemPage changeLoading={(b) => doLoadChange(b)}/>} />
        <Route path="/sign-in" element={<SignIn  />} />
        <Route path="/sign-up" element={< SignUp />} />
      </Routes> : 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem/:id" element={<ProblemPage currentUser={user} changeLoading={(b) => doLoadChange(b)}/>} />
        <Route path="/profile" element={<Profile currentUser={user} userInfo={userInfo} totalProblems={problems.length}/>} />
        <Route path="/sign-out" element={<SignOut />} />
      </Routes>
      }
    </BrowserRouter>
  )
}

export default App
