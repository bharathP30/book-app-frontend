import { useState } from "react"
import SignUp from "./SignUp";
import LogIn from "./LogIn";


export default function Authpage({ setAuth }){
    const [showSignUp, setshowSignUp] = useState(false);
  
    const style = 'w-1/2 rounded-md text-center text-black cursor-pointer'
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-black box-border">
                <div className="bg-white/50 backdrop:blur-2xl rounded-md w-md h-fit">
                    <div className="w-full p-2 rounded-sm">
                        <button className={`${style} ${showSignUp ? "bg-gray-300" : "bg-transparent"}`} 
                        onClick={() => setshowSignUp((prev) => !prev)}
                        >Sign Up</button>
                        <button className={`${style} ${!showSignUp ? "bg-gray-300" : "bg-transparent"}`} 
                        onClick={() => setshowSignUp((prev) => !prev)}
                        >Log In</button>
                    </div>
                    <div className="p-4">
                        {showSignUp && <SignUp setAuth={setAuth} />}
                        {!showSignUp && <LogIn setAuth={setAuth} />}
                    </div>
                </div>

            </div>
        </>
    )
}