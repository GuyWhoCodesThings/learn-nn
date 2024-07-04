import { useEffect, useState } from "react"

const Description = (props): JSX.Element => {

    const [problem, setProblem] = useState({})

    useEffect(() => {
        setProblem(props.problem)
    }, [props.problem])
    
    return (
        <div className=' rounded-md bg-zinc-800 m-1 h-full '>
                    
            <div className='flex pt-1 pb-1 bg-zinc-700 h-8 rounded-t-md text-left pl-2 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <h3
                className="bg-inherit flex items-center text-center">
                    Description
                </h3>
                
            </div>
           
            <div className="m-2 text-left flex-col">
                <div className="pt-2 pb-2">
                  
                    
                    <h3 className="font-semibold text-xl">
                        {problem.title}
                    </h3>
                  
                    <div className="flex gap-2 items-center">
                        <p className={problem.difficulty === "easy" ? "text-green-500" : problem.difficulty === "medium" ? "text-yellow-500" : "text-red-500"}>
                            {problem.difficulty}
                        </p>
                        <p className="font-light opacity-60">
                        {problem.topic}
                        </p>

                    </div>
                    
                  

                </div>
      
                <p className=" text-sm bg-zinc-700 rounded-md mt-2 mb-2 p-2">
                    {problem.description}
                </p>

                {Array.isArray(problem.args) &&
                    <div className="mt-6 mb-2">
                    <p>args:</p>
                    <ul className="text-sm list-disc list-inside">
                            {problem.args.map((arg) => <li className="p-1">{arg}</li>)}        
                    </ul>
                   </div>
                }
                {Array.isArray(problem.returns) &&
                    <div className="mt-2 mb-6">
                    <p>returns:</p>
                    <ul className="text-sm list-disc list-inside">
                            {problem.returns.map((ret) => <li className="p-1">{ret}</li>)}        
                    </ul>
                   </div>
                }
                {Array.isArray(problem.constraints) &&
                    <div className="mt-2 mb-6">
                    <p>constraints:</p>
                    <ul className="text-sm list-disc list-inside">
                            {problem.constraints.map((c) => <li className="p-1">{c}</li>)}        
                    </ul>
                   </div>
                }
                {Array.isArray(problem.hints) &&
                    <div className="mt-2 mb-6">
                    <p>hints:</p>
                    <ul className="text-sm list-disc list-inside">
                            {problem.hints.map((h) => <li className="p-1">{h}</li>)}        
                    </ul>
                   </div>
                }
                
                
                
            </div>
            
        </div>
        
    )
}

export default Description