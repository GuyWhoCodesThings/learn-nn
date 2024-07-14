import { User } from "firebase/auth";
import { NavLink } from "react-router-dom";


const Profile = (props: {problems: Array<any>, infoSet: object}) => {

  
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
    <div className="w-full">
      <div className="m-6 bg-none rounded-md pt-1 flex flex-col gap-2">
        {/* <h3 className="font-semibold text-2xl">Progress</h3> */}
        {/* <ul className="flex justify-center gap-8 p-2 pb-4 text-sm text-zinc-400">
          <li>
            <div className="flex items-center gap-1 ">
              <span className=" text-4xl text-green-500">{stats.easy}</span>
              <span>easy</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-1">
              <span className=" text-4xl text-orange-500">{stats.medium}</span>
              <span>medium</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-1">
              <span className=" text-4xl text-red-500">{stats.hard}</span>
              <span>hard</span>
            </div>
          </li>
        </ul> */}
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(completed.length / props.problems.length) * 100}%` }}></div>
        </div>
        {/* <p className="text-zinc-300 pt-2">Completed: <span className="text-white font-semibold">{completed.length} / {props.problems.length}</span></p> */}
        {/* <div className="flex justify-between gap-4 p-2">
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
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stats.loss / 4) * 100}%` }}></div>
            </div>
          </div>
          
          
          
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
