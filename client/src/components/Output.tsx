import { useEffect, useState } from "react";
import Matrix from "./Matrix";
import { Problem, Submission } from "../server/problem";

interface OutputProps {
    problem: Problem;
    accepted: number;
    time: number;
    results: Submission | undefined
}


const Output = (props: OutputProps) => {
    const [tab, setTab] = useState(0)
    const [activeIdx, setActiveIdx] = useState(0);
    const tests: [] | undefined = props.problem ? props.problem.tests : undefined

    useEffect(() => {

        if (props.results && tests && tests.length > 0) {
            
            if (props.results.testCaseResults[activeIdx].result.error !== '') {
                setTab(2)
            } else {
                setTab(0)
            }
        }   
       
    }, [props.results, props.accepted, props.time])
    

    return (
        <div className='rounded-md bg-zinc-800 mt-1 h-full w-full'>
            <div className='flex justify-between bg-zinc-700 h-8 rounded-t-md text-left pl-2 items-center pt-4 pb-4'>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                    </svg>
                    <button
                    onClick={() => setTab(0)}
                    className="h-8 bg-zinc-700 content-center flex items-center">
                        Tests
                    </button>
                </div>
                <div className="flex gap-1">
                    <button
                    onClick={() => setTab(1)}
                    className="h-8 bg-zinc-700 content-center flex items-center">
                        StdOut
                    </button>
                    <button
                    onClick={() => setTab(2)}
                    className="h-8 bg-zinc-700 content-center flex items-center">
                        StdErr
                    </button>
                </div>
                
            </div>
            {(tests && tab === 0)  && (
                <div>
                    <div className="flex items-center">
                       
                        <ul className="flex flex-row items-start w-full gap-4 m-2">
                            {tests.map((_test, idx) => (
                                <li key={idx}>
                                    <button 
                                        className={idx === activeIdx ? 'bg-zinc-700 pr-4 pl-4 rounded-md' : 'bg-zinc-700 opacity-60 pl-4 pr-4 rounded-md'}
                                        onClick={() => setActiveIdx(idx)}
                                    >
                                        
                                        <span
                                        className=
                                        {
                                            props.results === undefined
                                            ? "text-left " 
                                            : props.results.testCaseResults[idx].result.message.slice(0,6) === "passed"
                                            ? " text-green-500 "
                                            : " text-red-500 "
                                        }
                                        > 
                                            Case {idx + 1}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {(props.accepted === 1 && props.time > 0) &&
                        <div
                        className="pr-6">
                            <p className="text-green-500 font-bold text-lg ">Accepted</p>
                            <p className="text-sm font-light text-zinc-400">{props.time} ms</p>
                        </div>
                        }  
                    </div>
                    <div className="ml-2 w-full flex-col">
                        {tests[activeIdx] && (
                            <>
                                <div className="flex-col items-center m-2 text-left">
                                    {tests[activeIdx].length < 4 ?
                                    <div>
                                        <h3 className="mb-1">
                                            input = 
                                        </h3>
                                        <div className="bg-zinc-700 text-left p-1 rounded-md w-full pl-4 gap-2">
                                            <Matrix matrix={tests[activeIdx][2]} />
                                        </div>
                                    </div>
                                    :
                                    tests[activeIdx].length < 5 ?
                                    <div>
                                        <h3 className="mb-1">
                                            y_pred = 
                                        </h3>
                                        <div className="bg-zinc-700 text-left p-1 rounded-md w-full pl-4 flex gap-2">
                                            <Matrix matrix={tests[activeIdx][2]} />
                                        </div>
                                        <h3 className="mb-1">
                                            y_true = 
                                        </h3>
                                        <div className="bg-zinc-700 text-left p-1 rounded-md w-full pl-4 flex gap-2">
                                            <Matrix matrix={tests[activeIdx][3]} />
                                        </div>
                                    </div>
                                   :
                                   tests[activeIdx].length < 6 ?
                                    <div>   
                                        <h3 className="mb-1">
                                            (in_dim, out_dim) =  ({tests[activeIdx][2]}, {tests[activeIdx][3]})
                                        </h3> 
                                        <div className="bg-zinc-700 text-left p-1 rounded-md w-full pl-4 flex gap-2">
                                            ({tests[activeIdx][2]}, {tests[activeIdx][3]})
                                        </div>
                                       
                                        <h3 className="mb-1">
                                           input =
                                        </h3>
                                        <div className="bg-zinc-700 text-left p-1 rounded-md w-full pl-4 flex gap-2">
                                            <Matrix matrix={tests[activeIdx][4]} />
                                        </div>
                                    </div>
                                    :
                                    tests[activeIdx].length === 6 ?
                                    <div>   
                                        <h3 className="mb-1">
                                            (model_dim, dk, dv) =  ({tests[activeIdx][2]}, {tests[activeIdx][3]}, {tests[activeIdx][4]})
                                        </h3>    
                                        <h3 className="mb-1">
                                           input =
                                        </h3>
                                        <div className="bg-zinc-700 text-left p-1 rounded-md w-full pl-4 flex gap-2">
                                            <Matrix matrix={tests[activeIdx][5]} />
                                        </div>
                                    </div>
                                    :
                                    <div>   
                                        <h3 className="mb-1">
                                            (in_dim, out_dim, hid_dim) =  ({tests[activeIdx][3]}, {tests[activeIdx][4]}, {tests[activeIdx][5]})
                                        </h3>    
                                        <h3 className="mb-1">
                                           input =
                                        </h3>
                                        <div className="bg-zinc-700 text-left p-1 rounded-md w-full pl-4 flex gap-2">
                                            <Matrix matrix={tests[activeIdx][6]} />
                                        </div>
                                    </div>
                                    
                                }
                                </div>
                                {tests[activeIdx].length < 7 ?
                                <div className="flex-col items-center m-2 text-left">
                                
                                    <h3 className="mb-1">
                                        target =  
                                    </h3>
                                    <div className="bg-zinc-700 text-left p-1 rounded-md w-full pl-4">
                                        <Matrix matrix={tests[activeIdx][1]} />
                
                                    </div>
                                    
                                </div>
                                :
                                <div className="flex-col items-center m-2 text-left">
                                
                                    <h3 className="mb-1">
                                        target = 
                                    </h3>
                                    <div className="bg-zinc-700 text-left p-1 rounded-md w-full pl-4">
                                       <Matrix matrix={tests[activeIdx][1]} />
                                        <Matrix matrix={tests[activeIdx][2]} />
                
                                    </div>                    
                                </div>
                                }
                                

                                { props.results &&
                                
                                <div className="flex-col items-center m-2 text-left">
                                    <h3 className="mb-1">
                                        output = 
                                    </h3>
                                    <div 
                                    className=
                                    {
                                       props.results.testCaseResults[activeIdx].result.message.slice(0,6) === "passed"
                                        ? "bg-zinc-700 text-green-500 text-left p-1 rounded-md w-full pl-4  min-h-8"
                                        : "bg-zinc-700 text-red-500 text-left p-1 rounded-md w-full pl-4  min-h-8"
                                    }
                                    >
                                        {props.results.testCaseResults[activeIdx].result.result}
                                    </div>
                                    <h3 className="mb-1">
                                       status = 
                                    </h3>
                                    <div 
                                    className=
                                    {
                                       
                                        props.results.testCaseResults[activeIdx].result.message.slice(0,6) === "passed"
                                        ? "bg-zinc-700 text-green-500 text-left p-1 rounded-md w-full pl-4  min-h-8"
                                        : "bg-zinc-700 text-red-500 text-left p-1 rounded-md w-full pl-4  min-h-8"
                                    }
                                    >
                                        {props.results.testCaseResults[activeIdx].result.message}
                                    </div>
                                
                        
                                </div>
                                }
                                
                            </>
                        )}
                    </div>
                </div>
            )}
            {tab === 1 &&
            
            <div className="flex-col">
                <h3 className="text-left m-3">
                    StdOut:
                </h3>
                <ul className="flex-col text-left p-2 bg-zinc-700 m-4 rounded-md min-h-10">
                {(props.results && props.results.testCaseResults[activeIdx].result.out[0]) &&
                props.results.testCaseResults[activeIdx].result.out
                }
            </ul>
                
            </div>
            }
            {tab === 2 &&
            
            <div className="flex-col">
                <h3 className="text-left m-3">
                    StdError:
                </h3>
                <ul className="flex-col text-left p-2 bg-zinc-700 m-4 rounded-md min-h-10 text-red-500">
                {props.results !== undefined &&
                props.results.testCaseResults[activeIdx].result.error
                }
            </ul>
                
            </div>
            }
        </div>
    );
};

export default Output;

