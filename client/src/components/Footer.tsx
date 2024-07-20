import { NavLink } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="fixed bottom-0 z-50 left-0 w-screen p-3 bg-zinc-800">
            <ul className="flex justify-between items-center gap-10 w-full pr-5 pl-5 text-sm">
                <li className="">
                    © 2024 TorchCode™
                </li>
                <li>
                <NavLink className="flex items-center" to="https://www.linkedin.com/in/guy-cohen12/">
                    <FaLinkedin size={30} /> 
                </NavLink>
                </li>
            </ul>
        </div>
    )
}
