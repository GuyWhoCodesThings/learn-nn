import { User } from "firebase/auth";
import { NavLink } from "react-router-dom";


const Profile = (props: {problems: Array<any>, infoSet: object, currentUser: User}) => {

  
  const completed =  props.infoSet ? props.problems.filter((p) => props.infoSet.comp.has(p.url)) : []
  const stats = {easy: 0, medium: 0, hard: 0, active: 0, loss: 0, layer: 0}
  
  for(const p of completed){
    
    if (p.difficulty === "easy"){
      stats.easy += 1
    }
    else if (p.difficulty === "medium"){
      stats.medium += 1
    }
    else {
      stats.hard += 1
    }
    if (p.topic === "activation function") {
      stats.active += 1

    } else if (p.topic === "loss function") {
      stats.loss += 1

    } else {
      stats.layer += 1
    }
    
  }
  return (
    <div className="w-screen h-screen">
      <div className="m-6 bg-zinc-700 rounded-md p-3 flex flex-col gap-3">
        <h3 className="font-bold text-3xl">Dashboard</h3>
        <ul className="flex justify-center gap-8 p-6">
          <li>
            <div className="flex flex-col">
              <span className=" text-4xl text-green-500">{stats.easy}</span>
              <span>easy</span>
            </div>
          </li>
          <li>
            <div className="flex flex-col">
              <span className=" text-4xl text-orange-500">{stats.medium}</span>
              <span>medium</span>
            </div>
          </li>
          <li>
            <div className="flex flex-col">
              <span className=" text-4xl text-red-500">{stats.hard}</span>
              <span>hard</span>
            </div>
          </li>
        </ul>
        
        <p className="text-zinc-300">Completed: <span className="text-white font-semibold">{completed.length} / {props.problems.length}</span></p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(completed.length / props.problems.length) * 100}%` }}></div>
        </div>
        <div className="flex justify-between gap-4 p-2">
          <div className="w-1/3">
            <p>Activation</p>
            <div className=" w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stats.active / 6) * 100}%` }}></div>
            </div>
          </div>
          <div className="w-1/3">
            <p>Network Layer</p>
            <div className=" w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stats.layer / 3) * 100}%` }}></div>
            </div>
          </div>
          <div className="w-1/3">
            <p>Loss</p>
            <div className=" w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stats.loss / 3) * 100}%` }}></div>
            </div>
          </div>
          
          
          
        </div>
      </div>

      {/* <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-zinc-700">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium  uppercase">Status</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium  uppercase">Title</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase">Topic</th>
                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium  uppercase">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                {completed.map((problem, idx) => (
                  <tr key={idx} className="odd:bg-zinc-600 even:bg-zinc-700">
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </td>
                    <td className="px-6 text-start py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                      <NavLink to={"../problem/" + problem.url}>{problem.title}</NavLink>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-start  text-sm text-zinc-300">
                     {problem.topic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <p className={problem.difficulty === "easy" ? "text-green-500" : problem.difficulty === "medium" ? "text-yellow-500" : "text-red-500"}>
                        {problem.difficulty}
                      </p>
                    </td>
                  </tr>
                ))}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}
      

    </div>
  );
};

export default Profile;
