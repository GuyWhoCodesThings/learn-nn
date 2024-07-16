import { NavLink } from "react-router-dom";




const UnAuthNav = () => {
    
    return (
        <div className="fixed top-0 left-0 z-50 w-screen p-3 bg-zinc-800">
            <ul className="flex justify-between items-center gap-10 w-full pr-5 pl-5">
                <li>
                    <NavLink to="/" className="text-white">
                        Problem List
                    </NavLink>
                </li>
                <li>
                    <div className="flex gap-6">
                        <NavLink to="/about" className="flex items-center text-white gap-1">
                            <p>About</p>
                        </NavLink>
                        <NavLink to="/sign-in" className="text-white">
                            Login
                        </NavLink>
                        <NavLink to="/sign-up" className="text-white">
                            Sign Up
                        </NavLink>
                    </div>
                    
                </li>
            </ul>
        </div>
    )
}

export default UnAuthNav;