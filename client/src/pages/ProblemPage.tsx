import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Description from '../components/Description';
import Output from '../components/Output';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import { loadProblem, Problem, runProblem, Submission } from "../server/problem.ts";
import { User } from "firebase/auth";
import LoadingOverlay from 'react-loading-overlay-ts';
import { loadWork, saveWork, UserProblem } from "../server/user.ts";

type PageType = {
    currentUser?: User,
    changeLoading: (b: boolean) => void,
    alert: (msg: string, thm: string) => void,
    updateUserInfo?: () => void
}

const ProblemPage = (props: PageType): JSX.Element => {

  const navigate = useNavigate();
  const { id } = useParams(); // get the dynamic part of the URL

  const [accepted, setAccepted] = useState(-1);
  const [problem, setProblem] = useState< Problem | undefined>(undefined);
  const [time, setTime] = useState(-1);
  const [out, setOut] = useState<Submission | undefined>(undefined);
  const [isActive, setActive] = useState(false);
  const [userCode, setUserCode] = useState('');


  const doUpdateWork = (userProblem: UserProblem) => {
    if (userProblem.code !== '') {
      setUserCode(userProblem.code);
      if (userProblem.status === 'completed') {
        setAccepted(1);
      } else {
        setAccepted(0);
      }
    }
  };

  useEffect(() => {
    
    const fetchData = (id: string) => {
      loadProblem(id, (p) => {

        console.log(p)
        setProblem(p);
        if (props.currentUser) {
          loadWork(props.currentUser, id, (c) => {
            doUpdateWork(c);
          });
        } else {
          const current = localStorage.getItem(id);
          if (current) {
            
            setProblem({ ...p, starterCode: JSON.parse(current) });
          }
        }
        
      });
    };
    if (id) {
        props.changeLoading(true);
        try {
            fetchData(id);
        } finally {
            props.changeLoading(false)
        }
        
    }
  }, [id, props.currentUser, accepted]);

  const run = (code: string): void => {

    if (props.currentUser && problem) {
      const tests = problem.tests;
      setActive(true);
      runProblem(code, tests, (o: Submission) => {
        setActive(false);
        console.log(o);
        setOut(o);

        let correct = 0;
        for (let i = 0; i < tests.length; i++) {
          if (o.testCaseResults[i].result.message.slice(0, 6) === 'passed') {
            correct += 1;
          }
        }
        setTime(o.time);
        save(code, (correct === tests.length), o.time);

        if (correct === tests.length) {
          props.alert(`${problem.title} completed!`, "success");
          
          setAccepted(1);
        } else {
          setAccepted(0);
        }
      });
    } else {
      props.alert("must be signed in to submit", "error");
      navigate('/sign-in');
    }
  };

  const save = (code: string, completed: boolean, time: number): void => {
    if (!id) throw new Error("impossible");
    if (props.currentUser && problem) {
      try {
        saveWork(props.currentUser, code, problem.url, completed, time, (msg) => {
          if (props.updateUserInfo) {
            props.updateUserInfo();
          }
          console.log(msg);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      localStorage.setItem(id, JSON.stringify(code));
      props.alert("Saved to Local Storage", "info");
    }
    console.log('saved');
  };

  if (!problem){
    return (
        <div>Loading Problem...</div>
    )
  }

  return (

    <div className=" w-lvh h-full bg-none pt-6">
      {!props.currentUser && problem &&
        <div className="text bg-blue-400 bg-opacity-30">
          You need to <NavLink to="/sign-in">Login / Sign Up</NavLink> to run code
        </div>
      }
      <PanelGroup autoSaveId="example" direction="horizontal">
        <Panel defaultSize={35} minSize={10}>
          {problem && <Description problem={problem} accepted={accepted} />}
        </Panel>
        <PanelResizeHandle className='w-1 hover:bg-blue-400' />
        <Panel defaultSize={65} minSize={10}>
          <PanelGroup autoSaveId="example" direction="vertical">
            <Panel defaultSize={80} className='h-full w-full' minSize={10}>
              <span className={isActive ? 'opacity-70' : ''}>
                <LoadingOverlay active={isActive} spinner text='running code...' />
                {problem && <CodeEditor starterCode={problem.starterCode} userCode={userCode} run={(c) => run(c)} save={(c) => save(c, false, -1)} />}
              </span>
            </Panel>
            <PanelResizeHandle className='h-1 hover:bg-blue-400' />
            <Panel defaultSize={20} minSize={10} className='h-full w-full'>
              {problem && <Output accepted={accepted} problem={problem} results={out} time={time} />}
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
  
};

export default ProblemPage;
