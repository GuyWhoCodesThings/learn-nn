import { auth } from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
 
const SignOut = () => {

    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            console.log("Signed out successfully")
            navigate("/");
        }).catch((error) => {
        // An error happened.
        });
    }
    
  return (
    <>
        <button onClick={handleLogout}>
            Logout
        </button>
    </>
  )
}
 
export default SignOut