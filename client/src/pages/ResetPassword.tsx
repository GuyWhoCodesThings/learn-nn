import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect } from "react"
import { auth } from '../firebase.js';

export default function ResetPassword({email}) {

    useEffect(() => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    })


  return (
    <div>ResetPassword</div>
  )
}
