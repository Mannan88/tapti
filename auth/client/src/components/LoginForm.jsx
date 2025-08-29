import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/authContext";
import api from "./auth/axios"

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const[signinEmail, setSigninEmail] = useState("")
    const[signinPassword, setSigninPassword] = useState("")

    const[signupEmail, setSignupEmail] = useState("")
    const[signupPassword, setSignupPassword] = useState("")
    const[signupMobileNo, setSignupMobileNo] = useState("")

    async function signinHandelSubmit(e) {
        e.preventDefault();
        try {
            const res = await api.post("/signin", {
                name: signinEmail,
                password: signinPassword,
            });
            if (!res.data.user) {
                alert(res.data.message || "SignIn failed!");
                return;
            }
            console.log(res.data.message);
            login(res.data.user);
            navigate("/home");
        } catch(error){
            console.error("Signin error:", error);
            alert("SignIn Failed!");
        }
    };

    async function signupHandelSubmit(e) {
        e.preventDefault();
        try {
            const res = await api.post("/signup", {
                name: signupEmail,
                password: signupPassword,
                contact: signupMobileNo});
            console.log(res.data.message);
            login(res.data.user);
            navigate("/home");
        } catch{
            alert("SignUp Failed!");
        }
    };

    return(
        <div className=" flex justify-center items-center h-screen">
            <div className="flex flex-wrap flex-col border-black border-2 w-fit rounded-2xl h-fit">            
                <form onSubmit={signupHandelSubmit} className="flex flex-wrap flex-col items-center" >
                    <h2 className="">SignUp</h2>
                    <input value={signupEmail} onChange={(e) => {
                        setSignupEmail(e.target.value)
                    }} className="border-black border-2 m-2 rounded-2xl w-2xs h-8.5 p-1" type="email" name="singnupName" id="singnupName" placeholder="email" autoComplete="email" required/>
                    <input value={signupPassword} onChange={(e) => {
                        setSignupPassword(e.target.value)
                    }} className="border-black border-2 m-2 rounded-2xl w-2xs h-8.5 p-1" type="password" name="signupPassword" id="signupPassword" placeholder="password" autoComplete="new-password" required />
                    <input value={signupMobileNo} onChange={(e) => {
                        setSignupMobileNo(e.target.value)
                    }} className="border-black border-2 m-2 rounded-2xl w-2xs h-8.5 p-1" type="text" name="signupContact" id="signupContact" placeholder="contact no" required />
                    <button className="border-black border-2 rounded-2xl w-20 m-1 hover:bg-gray-200">SignUp</button>
                </form>

                <form onSubmit={signinHandelSubmit} className="flex flex-wrap flex-col items-center">
                    <h2>SignIn</h2>
                    <input value={signinEmail} onChange={(e)=>{
                        setSigninEmail(e.target.value)
                    }} className="border-black border-2 m-2 rounded-2xl w-2xs h-8.5 p-1" type="email" name="signinName" id="signinName" placeholder="email" autoComplete="email" required/>
                    <input value={signinPassword} onChange={(e)=>{
                        setSigninPassword(e.target.value)
                    }} className="border-black border-2 m-2 rounded-2xl w-2xs h-8.5 p-1" type="password" name="signinPassword" id="signinPassword" placeholder="password" autoComplete="current-password" required/>
                    <button className="border-black border-2 rounded-2xl w-20 m-1 hover:bg-gray-200">SignIn</button>
                </form>
            </div>
        </div>
        
    )
}