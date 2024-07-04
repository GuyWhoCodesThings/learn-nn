import { User } from "firebase/auth"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { UserWork } from "../server/user"

const Profile = (props: {currentUser: User, userInfo, totalProblems: number}) => {


  const [problems, setProblems] = useState<Array<UserWork>>([])
  const [showComp, setShowComp] = useState(true)
  const [showAtt, setShowAtt] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
  
    setProblems(props.userInfo)
    setCount(props.totalProblems)
  
  }, [props.currentUser, props.userInfo])

  return (
    <div className="w-screen h-screen">
        <div className="m-6 bg-zinc-700 rounded-md p-3">
          <h3 className="font-bold text-3xl">
            Dashboard
          </h3>
          <p>
            email: {props.currentUser.email}
          </p>
        </div>

        <div className="bg-zinc-700 rounded-md p-5 flex justify-evenly m-6">
            <div className="font-semibold">
            {3} <span className="text-green-500 m-1">Easy</span>
            </div>
            <div>
              |
            </div>
            <div className="font-semibold">
            {2} <span className="text-yellow-500 m-1">Medium</span>
            </div>
            <div>
              |
            </div>
            <div className="font-semibold">
            {2} <span className="text-red-500 m-1">Hard</span>
            </div>
          </div>
        
        <div className="">
          <h3 className="bg-zinc-700 m-1 flex justify-center p-6 pl-5 pr-5 h-10 content-center items-center font-bold">
            <p className="items-center content-center">
              Attempted: {problems && (problems.filter((problem) => problem.status === 'attempted')).length} / {count}
            </p>
          </h3>
          <ul>
          {showAtt && problems && problems.map((problem, idx) => {
            if (problem.status === 'attempted') {
              return (
                <li key={idx} className="bg-zinc-700 p-4 pl-6 pr-6  m-1 rounded-md flex justify-between">
              <div className="flex gap-2">
                <NavLink to={"../problem/" + problem.url}>{problem.url}</NavLink>
              </div>
            </li>
              )
            }
          })}
          </ul>
        </div>

        
          
    </div>
  )
}
 
export default Profile