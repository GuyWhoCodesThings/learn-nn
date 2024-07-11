import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from '../firebase.js';

const AuthNav = () => {

    //const navigate = useNavigate();
 
    const handleSignOut = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }
    
    return (
        <div className="flex justify-center bg-zinc-500 w-screen h-10">
            <ul className="flex justify-between gap-10 w-full pr-5 pl-5 mt-2">
                <li>
                    <NavLink to="/" className="text-white">
                        Problems
                    </NavLink>
                </li>
                <li>
                    <div className="flex gap-6">
                        <NavLink to="/profile" className="text-white">
                            Profile
                        </NavLink>
                        <NavLink to="/" onClick={handleSignOut} className="flex items-center text-white gap-1">
                            <p>Logout</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                        </NavLink>
                    </div>
                    
                </li>
            </ul>
        </div>
    )
}

export default AuthNav;