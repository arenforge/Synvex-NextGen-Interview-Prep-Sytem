import { useState } from "react";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AuthBox() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Signup Successful")
        }
        catch (err) {
            alert(err.message)
        }
    }

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard')
        }
        catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className="login">
            <h3>Login/Signup</h3>
            <input placeholder="email"
                onChange={(e) => setEmail(e.target.value)} />

            <br></br>

            <input placeholder="password"
                onChange={(e) => setPassword(e.target.value)} />

            <br></br>

            <button onClick={handleSignup}>Signup</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default AuthBox;
