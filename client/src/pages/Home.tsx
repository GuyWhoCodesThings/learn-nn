import { NavLink } from "react-router-dom";
import Profile from "./Profile";
import { Problem } from "../server/problem";
import { iSet } from "../App";

type HomeType = {
  problems: [Problem],
  infoSet?: iSet
}

const Home = (props: HomeType) => {
  return (
    <div className="w-screen bg-none mt-16 mb-16">
      { <Profile problems={props.problems} infoSet={props.infoSet ? props.infoSet : undefined} />}
      <div className="container mx-auto bg-zinc-800 p-2 rounded-md shadow-md ">
        <div className="flex flex-col">
          <div className="-mx-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-zinc-700 ">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase">Status</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase">Title</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase">Topic</th>
                      <th scope="col" className="px-6 py-3 text-end text-xs font-medium uppercase">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.problems.map((problem, idx) => (
                      <tr key={idx} className="odd:bg-zinc-700 even:bg-zinc-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-200">
                          {props.infoSet && props.infoSet.comp.has(problem.url) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-500">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          ) : props.infoSet && props.infoSet.att.has(problem.url) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-orange-500">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                            </svg>
                          ) : (
                            <div></div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200 text-start">
                          <NavLink to={"../problem/" + problem.url}>{problem.title}</NavLink>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-start text-sm text-zinc-400">{problem.topic}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <span className={problem.difficulty === "easy" ? "text-green-500" : problem.difficulty === "medium" ? "text-yellow-500" : "text-red-500"}>
                            {problem.difficulty}
                          </span>
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
    </div>
  );
};

export default Home;
