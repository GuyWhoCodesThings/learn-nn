import { useEffect, useState } from "react"
import { Problem } from "../server/problem.ts"
import { Editor } from "@monaco-editor/react"
import { User } from "firebase/auth"
import { FaLock } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { IoIosHelpCircleOutline } from "react-icons/io";

type DescProps = {
    currentUser?: User,
    problem: Problem,
    accepted: number
}

const Description = (props: DescProps): JSX.Element => {

    const [tab, setTab] = useState(true)
    const [problem, setProblem] = useState<Problem | undefined>(undefined)
    const [hints, setHints] = useState<boolean[] | undefined>(undefined)
   

    const handleHintChange = (idx: number) => {
        if (hints) {
            const updatedHints: boolean[] = [...hints]; // Create a new array with the current hints
            updatedHints[idx] = !updatedHints[idx]; // Toggle the hint at the specified index
            setHints(updatedHints); // Update the state with the new array
        }
        
    }

    useEffect(() => {
        setProblem(props.problem)
        if (props.problem.hints) {
            const cleanHints: boolean[] = new Array(props.problem.hints.length).fill(false)
            if (cleanHints.length > 0) {
                setHints(cleanHints)
            }
            
            
        }
       
    }, [props.problem, props.accepted])
    
    return (
        <div className="h-full w-full mb-16">
        {problem ?
        <div className='rounded-md bg-zinc-800 m-1 h-full '>
                    
            <div className='flex pt-1 pb-1 bg-zinc-700 h-8 rounded-t-md text-left pl-2 items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <button
               onClick={() => setTab(true)}
                className="bg-none p-0 flex items-center text-center">
                    Description
                </button>
                <button
               onClick={() => setTab(false)}
                className="bg-none p-0 flex items-center text-center">
                    Solution
                </button>
             
            </div>

            <div className="m-2 text-left flex-col">

                {tab ?
                
                <div>

                <div className="pt-2 pb-2">
                  
                    
                    <h3 className="font-semibold text-xl flex gap-2 items-center justify-between">
                        
                        <div>
                        {props.accepted === 1 ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        :
                        props.accepted === 0 ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-orange-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                      </svg>
                        :
                        <div></div>
                        }
                        {problem.title}
                        </div>

                        <NavLink to="../help" className="text-yellow-500">
                            <IoIosHelpCircleOutline size={35} />
                        </NavLink>
                        
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
      
                <div className=" text-sm bg-zinc-700 rounded-md mt-2 mb-2 p-2">
                    <Latex>{problem.description}</Latex>
                </div>

                

                {Array.isArray(problem.args) &&
                    <div className="mt-6 mb-2">
                    <p>args:</p>
                    <ul className="text-sm list-decimal list-inside">
                            {problem.args.map((arg, idx) => <li key={idx} className="p-1">{arg}</li>)}        
                    </ul>
                   </div>
                }
                {Array.isArray(problem.returns) &&
                    <div className="mt-2 mb-6">
                    <p>returns:</p>
                    <ul className="text-sm list-decimal list-inside">
                            {problem.returns.map((ret, idx) => <li key={idx} className="p-1">{ret}</li>)}        
                    </ul>
                   </div>
                }
                {Array.isArray(problem.constraints) &&
                    <div className="mt-2 mb-6">
                    <p>constraints:</p>
                    <ul className="text-sm list-decimal list-inside">
                            {problem.constraints.map((c, idx) => <li key={idx} className="p-1">{c}</li>)}        
                    </ul>
                   </div>
                }
                {Array.isArray(problem.hints) &&
         
                    <ul className="list-inside">
                            {problem.hints.map((h, idx) => {

                                return (
                                    <li key={idx} className="p-1 pr-1 pl-1 border-t-2 border-zinc-700">
                                        <div className="flex justify-between">
                                            <span className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                                                </svg>
                                                Hint {idx + 1}</span>
                                            <button
                                            className="flex items-center "
                                            onClick={() => handleHintChange(idx)}>
                                                {hints && hints[idx] === true ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                                </svg>
                                                }
                                            </button>
                                        </div>
                                        {hints && hints[idx] &&
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
            :
            
            <div className="relative w-full">
                {props.currentUser 
                ?                                      
                <Editor 
                height="100vh"
                theme='vs-dark'
                defaultLanguage="python" 
                value={problem.solution}
                onMount={(e) => e.focus()}
                /> 
                :
                <div className="flex flex-col items-center mt-12 gap-2">
                   
                        
                    <FaLock className="text-yellow-500" size={35} />
                    <p className="font-medium text-center">You need to <NavLink to="../sign-in">login</NavLink> to access solutions</p>
                      
                </div>
                }
                                                        
            </div>
            }
            </div>


            
            
    
        </div>
        :
    <div></div>}
    
    </div>
        
    )
}

export default Description