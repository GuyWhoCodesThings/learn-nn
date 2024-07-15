import { Editor } from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';


type EditorType = {
  userCode: string,
  starterCode: string,
  run: (x: string) => void,
  save: (x: string) => void
}

const CodeEditor = (props: EditorType): JSX.Element => {


  console.log(props.starterCode)

  const [code, setCode] = useState<string>('');
  const didMountRef = useRef(false)
  
  const handleCodeChange = (value?: string): void => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const handleKeySave = (event: React.KeyboardEvent): void => {
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault(); 
      console.log("ctrl + s pressed")
      props.save(code)
    }
  }

  useEffect(() => {
    if (didMountRef.current) {
      if (props.userCode !== '') {
        setCode(props.userCode)
      } else {
        setCode(props.starterCode)
      }
    } else didMountRef.current = true
  }, [props.userCode, props.starterCode])

  return (
    <div onKeyDown={handleKeySave} className=' rounded-md bg-zinc-800 m-1 ml-0 mb-4 h-full'>
                    
      <div className='flex justify-between pt-1 pb-1 bg-zinc-700 h-8 rounded-t-md text-left pl-2 pr-2'>
        <div className='gap-2 flex'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
          </svg>
          <p>Editor</p>
        </div>

        <div className="gap-2 flex">
          <button onClick={() => props.save(code)} className='items-center flex bg-blue-600'>
              Save
          </button>
          <button onClick={() => props.run(code)} className='items-center flex bg-green-600'>
            Submit
          </button>
        </div>
                              
        
     </div>
                                                          
      <Editor 
        height="300vh" 
        theme='vs-dark'
        defaultLanguage="python" 
        value="hello"
        onMount={(e) => e.focus()}
        onChange={handleCodeChange}  
      />
     </div>
   
  );
};

export default CodeEditor;
