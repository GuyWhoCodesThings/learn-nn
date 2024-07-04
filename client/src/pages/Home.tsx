import { useEffect, useState } from "react"

import { NavLink } from "react-router-dom";
import { listProblems, Problem } from "../server/problem";
import { UserProblem } from "../server/user";



const Home = () => {

  const [problems, setProblems] = useState<Array<Problem>>([])
  const [userProblems, setUserProblems] = useState<Array[UserProblem]>([])

  useEffect(() => {
    listProblems(setProblems)
  }, [])


  
  return (
    <div className="w-screen h-screen">
      {problems.map((problem) => (
        <div key={problem._id} className="bg-zinc-700 p-4 m-1 rounded-md flex justify-between">
          <div className="flex gap-2">
            <NavLink to={"problem/" + problem.url}>{problem.title}</NavLink>
          </div>
          <p className={problem.difficulty === "easy" ? "text-green-500" : problem.difficulty === "medium" ? "text-yellow-500" : "text-red-500"}>
            {problem.difficulty}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;

