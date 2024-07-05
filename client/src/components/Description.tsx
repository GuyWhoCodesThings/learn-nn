import { useEffect, useState } from "react"

const Description = (props): JSX.Element => {

    const [problem, setProblem] = useState({})
    const [hints, setHints] = useState([])


    const handleHintChange = (idx: number) => {
        const updatedHints = [...hints]; // Create a new array with the current hints
        updatedHints[idx] = !updatedHints[idx]; // Toggle the hint at the specified index
        setHints(updatedHints); // Update the state with the new array
       
    }

    useEffect(() => {
        setProblem(props.problem)
        if (props.problem.hints) {
            setHints(new Array(props.problem.hints.length).fill(false))
        }
       
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
                    <ul className="text-sm list-decimal list-inside">
                            {problem.args.map((arg) => <li className="p-1">{arg}</li>)}        
                    </ul>
                   </div>
                }
                {Array.isArray(problem.returns) &&
                    <div className="mt-2 mb-6">
                    <p>returns:</p>
                    <ul className="text-sm list-decimal list-inside">
                            {problem.returns.map((ret) => <li className="p-1">{ret}</li>)}        
                    </ul>
                   </div>
                }
                {Array.isArray(problem.constraints) &&
                    <div className="mt-2 mb-6">
                    <p>constraints:</p>
                    <ul className="text-sm list-decimal list-inside">
                            {problem.constraints.map((c) => <li className="p-1">{c}</li>)}        
                    </ul>
                   </div>
                }
                {Array.isArray(problem.hints) &&
         
                    <ul className="list-inside">
                            {problem.hints.map((h, idx) => {

                                return (
                                    <li className="p-1 pr-1 pl-1 border-t-2 border-zinc-700">
                                        <div className="flex justify-between">
                                            <span className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                                                </svg>
                                                Hint {idx + 1}</span>
                                            <button
                                            className="flex items-center "
                                            onClick={() => handleHintChange(idx)}>
                                                {hints[idx] === true ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                                </svg>
                                                }
                                            </button>
                                        </div>
                                        {hints[idx] &&
                                        <div
                                        className="text-sm ml-7">
                                            {h}
                                        </div>
                                        }
                                        
                                        
                                    </li>
                                )
                            })}        
                    </ul>
   
                }
                
                
                
            </div>
            
        </div>
        
    )
}

export default Description