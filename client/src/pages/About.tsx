import { NavLink } from "react-router-dom";


export default function About() {
  return (
    <div 
    className="w-screen bg-none mt-12 mb-12 text-left">
      <main
      
      className="container mx-auto bg-none p-4 rounded-md flex flex-col gap-8 items-center">
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <h1>
            Making PyTorch Easy
        
          </h1>
          <p className="font-light opacity-80 w-1/2">
            With the tests and scaffolding already built-in, you can just focus on the learning
          </p>
        </div>

        <div className="flex flex-col justify-between m-2 md:flex-row lg:flex-row">
          <div className=" flex flex-col gap-4 p-2 w-full md:w-1/2 lg:w-1/2 m-2 bg-zinc-100 rounded-lg max-w-lg items-center justify-center">
          <div className="relative w-fit h-fit">
            <div className="">
              <svg width={200} height={200} viewBox="0 0 1024 1024" className="icon flex-1 z-2"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M128 928h768c35.3 0 64-28.7 64-64V226.2H64V864c0 35.3 28.7 64 64 64zM64 162.2v64h896v-64c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64z m96 29.8c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z m128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" fill="#3D5AFE" /><path d="M160 160m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" fill="#FFEA00" /><path d="M288 160m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" fill="#FFEA00" /><path d="M864.2 449H162c-17.7 0-32-14.3-32-32s14.3-32 32-32h702.2c17.7 0 32 14.3 32 32s-14.4 32-32 32zM800.2 832H166c-17.7 0-32-14.3-32-32s14.3-32 32-32h634.2c17.7 0 32 14.3 32 32s-14.4 32-32 32zM416.1 573H162c-17.7 0-32-14.3-32-32s14.3-32 32-32h254.1c17.7 0 32 14.3 32 32s-14.3 32-32 32z" fill="#FFEA00" /><path d="M350.1 544H96c-17.7 0-32-14.3-32-32s14.3-32 32-32h254.1c17.7 0 32 14.3 32 32s-14.3 32-32 32z" fill="#FFEA00" /><path d="M224 832.1c-17.7 0-32-14.3-32-32s14.3-32 32-32h398.9C674 695.3 704 606.6 704 510.9c0-21.4-1.5-42.4-4.4-63H162c-17.7 0-32-14.3-32-32s14.3-32 32-32h523.7C668.4 325 639.2 271.2 601 225.1H64v637.8c0 35.3 28.7 64 64 64h294.6c54.7-21.9 104.2-54.4 145.7-94.8H224z" fill="#448AFF" /><path d="M192 800.1c0 17.7 14.3 32 32 32h344.3c20.1-19.6 38.4-41 54.5-64H224c-17.7 0-32 14.3-32 32z" fill="#FFFF00" /><path d="M64 161.1v64h537c-46.1-55.6-105.4-99.8-173-128H128c-35.3 0-64 28.7-64 64z m224-34.2c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.4-32 32-32z m-128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.4-32 32-32z" fill="#536DFE" /><path d="M130 415.9c0 17.7 14.3 32 32 32h537.6c-3.1-21.9-7.7-43.3-13.9-64H162c-17.7 0-32 14.3-32 32z" fill="#FFFF00" />
              </svg>
            </div>
            <div className="absolute inset-y-0 top-24 z-10 w-1/2">
              <div className="flex  items-center justify-center">
                <svg width={100} height={100} viewBox="0 0 1024 1024" className="icon flex-1 z-2"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M128 928h768c35.3 0 64-28.7 64-64V226.2H64V864c0 35.3 28.7 64 64 64zM64 162.2v64h896v-64c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64z m96 29.8c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z m128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" fill="#3D5AFE" /><path d="M160 160m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" fill="#FFEA00" /><path d="M288 160m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" fill="#FFEA00" /><path d="M864.2 449H162c-17.7 0-32-14.3-32-32s14.3-32 32-32h702.2c17.7 0 32 14.3 32 32s-14.4 32-32 32zM800.2 832H166c-17.7 0-32-14.3-32-32s14.3-32 32-32h634.2c17.7 0 32 14.3 32 32s-14.4 32-32 32zM416.1 573H162c-17.7 0-32-14.3-32-32s14.3-32 32-32h254.1c17.7 0 32 14.3 32 32s-14.3 32-32 32z" fill="#FFEA00" /><path d="M350.1 544H96c-17.7 0-32-14.3-32-32s14.3-32 32-32h254.1c17.7 0 32 14.3 32 32s-14.3 32-32 32z" fill="#FFEA00" /><path d="M224 832.1c-17.7 0-32-14.3-32-32s14.3-32 32-32h398.9C674 695.3 704 606.6 704 510.9c0-21.4-1.5-42.4-4.4-63H162c-17.7 0-32-14.3-32-32s14.3-32 32-32h523.7C668.4 325 639.2 271.2 601 225.1H64v637.8c0 35.3 28.7 64 64 64h294.6c54.7-21.9 104.2-54.4 145.7-94.8H224z" fill="#448AFF" /><path d="M192 800.1c0 17.7 14.3 32 32 32h344.3c20.1-19.6 38.4-41 54.5-64H224c-17.7 0-32 14.3-32 32z" fill="#FFFF00" /><path d="M64 161.1v64h537c-46.1-55.6-105.4-99.8-173-128H128c-35.3 0-64 28.7-64 64z m224-34.2c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.4-32 32-32z m-128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.4-32 32-32z" fill="#536DFE" /><path d="M130 415.9c0 17.7 14.3 32 32 32h537.6c-3.1-21.9-7.7-43.3-13.9-64H162c-17.7 0-32 14.3-32 32z" fill="#FFFF00" />
                </svg>
              </div>
            </div>
          </div>

          </div>
          <div className="flex flex-col gap-4  w-fit m-2 mt-4 h-fit justify-center items-center text-left max-w-xlg md:w-1/2 lg:w-1/2">
            <p className="">
              This project was partly inspired by the course CSE 446 at UW. I really enjoyed the class overall, but at times noticed that there was a lot of extra Python setup work (setting up the environment, figuring out which data structures were used to store model parameters during SGD, etc.) during the projects that took away from coding the core of the algorithms. So, I decided to create a project that allows users to focus solely on the layers themselves without all the other setup work.
              If you enjoy this project, consider connecting with me on <NavLink to="https://www.linkedin.com/in/guy-cohen12/">Linkedin</NavLink> to stay up-to-date on my other work.
            </p>
            <p className="font-light opacity-80">more coming soon...</p>
          </div>
        </div>

        {/* <p className="text-center flex justify-center items-center gap-1">
          
            Connect with me on
            <NavLink className="flex items-center" to="www.linkedin.com/in/guy-cohen12">
            Linked<FaLinkedin /> 
            </NavLink>
            to stay up-to-date
        
        </p> */}

        <div className="flex justify-center mt-10">
          <NavLink to="/problem/relu" className="font-light">{"<"} start coding {"/>"}</NavLink>
        </div>
        
        
        
      </main>
     
    </div>
  )
}
