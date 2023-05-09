import FireLogo from "../assets/svg/firebase.svg"
import TSLogo from "../assets/svg/typescriptlogo.svg"
import ReactLogo from "../assets/svg/ReactLogo.svg"

function About() {
    return (
    
        <div className="bg-gradient-to-b from from-sky-50 to-sky-200 min-h-screen text-center">
          <p className="text-xl pt-16 pb-8 p-2 ml-2 hover:font-semibold">
          <span className="font-semibold text-center">GR33D</span> is made with modern technologies like React, Vite, 
           TypeScript, and Firebase for authentication while using Flask for the backend API. 
          </p>
          <div className="text-xl py-8 px-6 ml-8 m-2 text-left hover:font-semibold">
            This was designed for TV Show enthusiasts to share their thoughts in one place with <span className="italic"> ease</span>.
          </div>
          <div className="text-xl py-8 p-2 m-2 text-center hover:font-semibold">
          Users can sign in with their Google accounts to 
          <span className="font-semibold"> add</span>, 
          <span className="font-semibold"> update</span>, and  
          <span className="font-semibold"> delete</span> reviews.
          </div>
          <p className="text-xl py-8 px-6 mr-8 m-2 text-right hover:font-semibold">
          Users can go to <a href="https://review-keybase.glitch.me/" className="text-indigo-500 hover:text-indigo-600">KEYS</a> to recieve a unique key to safeguard their reviews.
          </p>
          <p className="text-xl py-8 px-6 mr-8 m-2 text-center hover:font-semibold">
          This app is an obvious choice for anyone who wants to be a part of something as special as they are!
          </p>
          <div className="flex flex-row flex-wrap justify-evenly">
            <iframe src={ReactLogo} className="pl-4 py-5 hover:scale-125"></iframe>
            <iframe src={TSLogo} className="py-5 hover:scale-125"></iframe>
            <iframe src={FireLogo} className="py-5 hover:scale-125"></iframe>
          </div>
        </div>
      
    )
  }
  
export default About