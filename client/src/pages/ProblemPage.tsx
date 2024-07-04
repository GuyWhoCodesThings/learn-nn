import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Description from '../components/Description';
import Output from '../components/Output';
import { useNavigate, useParams } from 'react-router-dom';
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
        console.log(problem.tests.values)
    }, [id, props.currentUser])

    const run = async (code: string): void => {
        
        
        if (user === undefined) {
            
            alert('must be signed in to run code')
            navigate('/sign-in')
        } else {
            const tests = problem.tests.values
            setActive(true)
            await save(code)
            
            await runProblem(code + "\n" + problem.tests.content, tests, (o) => {
                setOut(o)
                setActive(false)
            })
            
            
        }
    }

    const save = async (code: string): void => {
        if (user === undefined) {
            alert('must be signed in to save code')
            navigate('/sign-in')
        } else {
            try {
                await saveWork(user, code, problem.url, (msg) => console.log(msg))
               
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    return (
        <div className='w-screen h-screen bg-black'>
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
                            <CodeEditor starterCode={problem.starterCode} userCode={userCode} run={(c) => run(c)} save={(c) => save(c)} />
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
