import { iSet } from "../App";
import { Problem } from "../server/problem.ts";

type ProfileType = {
  problems: Array<Problem>,
  infoSet?: iSet
}


const Profile = (props: ProfileType) => {

  
  const completed =  props.infoSet ? props.problems.filter((p) => props.infoSet?.comp.has(p.url)) : []
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
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(completed.length / props.problems.length) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
