export default function About() {
  return (
    <div
    className="w-full bg-none mt-10 text-left">
      <div
      className="container mx-auto bg-zinc-700 p-4 rounded-md flex flex-col gap-4">
        <p>
          A website that aims to help students learn about neural networks and PyTorch through interactive problems and quick feedback.
        </p>
        <p>
          This project was partly inspired by the course CSE 446 at UW. I really enjoyed the class overall, but at times I felt that there was a lot of extra Python setup work (setting up the environment, figuring out which data structures were used to store model parameters during SGD, etc.) during the projects that took away from coding the actual algorithms. So, I decided to create a project that allows users to focus solely on the layers themselves without all the other setup work.
        </p>
        <p className="p-3 text-right font-light">more coming soon...</p>
      </div>
     
    </div>
  )
}
