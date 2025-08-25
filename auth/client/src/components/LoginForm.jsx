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
        <div className="login size-[40%] mx-auto p-5 border-2 rounded-lg">            
            <form onSubmit={signupHandelSubmit} className="flex flex-col justify-center gap-2">
                <h2>SignUp</h2>
                <input value={signupEmail} onChange={(e) => {
                    setSignupEmail(e.target.value)
                }} className="border-2 rounded-md" type="email" name="singnupName" id="singnupName" placeholder="email" autoComplete="email" required/>
                <input value={signupPassword} onChange={(e) => {
                    setSignupPassword(e.target.value)
                }} className="border-2 rounded-md" type="password" name="signupPassword" id="signupPassword" placeholder="password" autoComplete="new-password" required />
                <input value={signupMobileNo} onChange={(e) => {
                    setSignupMobileNo(e.target.value)
                }} className="border-2 rounded-md" type="text" name="signupContact" id="signupContact" placeholder="contact no" required />
                <button>SignUp</button>
            </form>

            <form onSubmit={signinHandelSubmit} className="flex flex-col justify-center gap-2">
                <h2>SignIn</h2>
                <input value={signinEmail} onChange={(e)=>{
                    setSigninEmail(e.target.value)
                }} className="border-2 rounded-md" type="email" name="signinName" id="signinName" placeholder="email" autoComplete="email" required/>
                <input value={signinPassword} onChange={(e)=>{
                    setSigninPassword(e.target.value)
                }} className="border-2 rounded-md" type="password" name="signinPassword" id="signinPassword" placeholder="password" autoComplete="current-password" required/>
                <button>SignIn</button>
            </form>
        </div>
    )
}