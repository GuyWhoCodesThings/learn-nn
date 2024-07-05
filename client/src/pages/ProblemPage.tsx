import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Description from '../components/Description';
import Output from '../components/Output';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import CodeEditor from '../components/CodeEditor';
import { loadProblem, Problem, runProblem } from "../server/problem";
import { User } from "firebase/auth";
import LoadingOverlay from 'react-loading-overlay-ts';
import { loadWork, saveWork, UserProblem } from "../server/user";

const ProblemPage = (props: {currentUser?: User, changeLoading: (b: boolean) => void}): JSX.Element => {

    const navigate = useNavigate();
    const { id } = useParams(); // get the dynamic part of the URL

    const [user, setUser] = useState<User | undefined>(undefined)
    const [problem, setProblem] = useState<Problem>({
        _id: '', title: '', url: '', topic: '', description: '', args: [], constraints: [], starterCode: '', difficulty: '', hints: [], tests: {values: []}
    })

    const [out, setOut] = useState(undefined)
    const [isActive, setActive] = useState(false)
    const [userCode, setUserCode] = useState('')


    const doUpdateWork = (userProblem: UserProblem) => {
        if (userProblem.code !== '') {
            setUserCode(userProblem.code)
        }
    };

 
 
    useEffect(() => {
        props.changeLoading(true)
        const fetchData = async(id: string) => {
            await loadProblem(id, setProblem)
            if (props.currentUser) {
            
                setUser(props.currentUser)
                await loadWork(props.currentUser, id, (c) => doUpdateWork(c))
            }
            props.changeLoading(false)
        }
        if (id) {
            fetchData(id)
        }
       
    }, [id, props.currentUser])

    const run = async (code: string): void => {
        
        if (user) {
            const tests = problem.tests.values
            setActive(true)
            runProblem(code + "\n" + problem.tests.content, tests, (o) => {
                setActive(false)
                setOut(o)
                let correct = 0
                for(let i = 0; i < tests.length; i++) {
                    if (o.testCaseResults[i].result.message.slice(0,6) === 'passed') {
                        correct += 1
                    }
                }
                save(code, (correct === tests.length)) 
            })

        } else {
  
            navigate('/sign-in')

        }
    }

    const save = async (code: string, completed: boolean): void => {
        
        if (user) {
            try {
                await saveWork(user, code, problem.url, completed, (msg) => console.log(msg))
               
            } catch (error) {
                console.log(error)
            }
        } else {
            navigate('/sign-in')
        }
    }
    
    return (
        <div className='w-screen h-screen bg-black'>
            { !user &&
                <div className="text bg-blue-400 bg-opacity-60">You need to <NavLink to="/sign-in"> Login / Sign Up</NavLink>  to run code </div>
            }
            <PanelGroup 
            autoSaveId="example" 
            direction="horizontal" 
            >
            <Panel 
                defaultSize={35}
                minSize={10}
            >
            
                <Description problem={problem} />
                    
            </Panel>
            <PanelResizeHandle className='w-1 hover:bg-blue-400 ' />
            <Panel 
                defaultSize={65}
                minSize={10}
                
            >
                
                <PanelGroup 
                    autoSaveId="example" 
                    direction="vertical" 
                    >
                    <Panel 
                        defaultSize={80}
                        className='h-full w-full'
                        minSize={10}
                    >
                        <span className={isActive ? 'opacity-70' : ''}>
                            <LoadingOverlay                          
                                active={isActive}
                                spinner
                                text='running code...'                   
                            />
                         
                            <CodeEditor starterCode={problem.starterCode} userCode={userCode} run={(c) => run(c)} save={(c) => save(c, false)} />

                        
                            
                            
                        </span>
                            
   
                    </Panel>
                    <PanelResizeHandle className='h-1 hover:bg-blue-400 ' />
                    <Panel 
                        defaultSize={20}
                        minSize={10}
                        className='h-full w-full'
                    >
                        
                        <Output problem={problem} results={out}/>
 
                    </Panel>
                </PanelGroup>
               
            </Panel>
        </PanelGroup>

        </div>
        
    );
};

export default ProblemPage;
