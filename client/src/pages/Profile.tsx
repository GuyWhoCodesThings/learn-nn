import { User } from "firebase/auth";
import { NavLink } from "react-router-dom";


const Profile = (props: {problems: Array<any>, infoSet: object, currentUser: User}) => {

  
  
  const completed =  props.infoSet ? props.problems.filter((p) => props.infoSet.comp.has(p.url)) : []
  const attempted =  props.infoSet ? props.problems.filter((p) => props.infoSet.att.has(p.url)) : []

  return (
    <div className="w-screen h-screen">
      <div className="m-6 bg-zinc-700 rounded-md p-3 flex flex-col gap-3">
        <h3 className="font-bold text-3xl">Dashboard</h3>
        <p>email: {props.currentUser.email}</p>
        <p>Completed {completed.length} / {props.problems.length}</p>
      </div>

      <div className="flex flex-col">
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
      </div>
      <div className="flex flex-col">
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
                {attempted.map((problem, idx) => (
                  <tr key={idx} className="odd:bg-zinc-600 even:bg-zinc-700">
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-orange-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
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
      </div>

    </div>
  );
};

export default Profile;
