import { NavLink } from "react-router-dom";




const UnAuthNav = () => {
    
    return (
        <div className="flex justify-center bg-zinc-500 w-screen h-10">
            <ul className="flex justify-between gap-10 w-full pr-5 pl-5 mt-2">
                <li>
                    <NavLink to="/" className="text-white">
                        Problems
                    </NavLink>
                </li>
                <li>
                    <div className="flex gap-4">
                        <NavLink to="/sign-up" className="text-white">
                            Sign Up
                        </NavLink>
                        <NavLink to="/sign-in" className="text-white">
                            Sign In
                        </NavLink>
                    </div>
                    
                </li>
            </ul>
        </div>
    )
}

export default UnAuthNav;