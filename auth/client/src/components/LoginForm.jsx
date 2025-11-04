import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/authContext";
import api from "./auth/axios";

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [activeTab, setActiveTab] = useState("signin");

    const [signinEmail, setSigninEmail] = useState("");
    const [signinPassword, setSigninPassword] = useState("");

    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupMobileNo, setSignupMobileNo] = useState("");

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
            login(res.data.user);
            if(res.data.user.role=='user'){
                navigate("/home");
            } else if(res.data.user.role=='authority') {
                navigate("/admin");
            }
            
        } catch {
            alert("SignIn Failed!");
        }
    }

    async function signupHandelSubmit(e) {
        e.preventDefault();
        try {
            const res = await api.post("/signup", {
                name: signupEmail,
                password: signupPassword,
                contact: signupMobileNo,
            });
            login(res.data.user);
            if(res.data.user.role=='user'){
                navigate("/home");
            } else if(res.data.user.role=='authority') {
                navigate("/admin");
            }
        } catch {
            alert("SignUp Failed!");
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                
                {/* Toggle Buttons */}
                <div className="flex bg-gray-200 rounded-xl p-1 mb-6">
                    <button
                        onClick={() => setActiveTab("signin")}
                        className={`w-1/2 py-2 rounded-xl font-semibold transition-all ${activeTab === "signin" ? "bg-white shadow" : "text-gray-500"}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setActiveTab("signup")}
                        className={`w-1/2 py-2 rounded-xl font-semibold transition-all ${activeTab === "signup" ? "bg-white shadow" : "text-gray-500"}`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Sign In Form */}
                {activeTab === "signin" && (
                    <form onSubmit={signinHandelSubmit} className="flex flex-col gap-4">
                        <h2 className="text-center text-2xl font-bold text-gray-700 mb-2">Welcome Back</h2>
                        <input
                            value={signinEmail}
                            onChange={(e) => setSigninEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <input
                            value={signinPassword}
                            onChange={(e) => setSigninPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
                            Sign In
                        </button>
                    </form>
                )}

                {/* Sign Up Form */}
                {activeTab === "signup" && (
                    <form onSubmit={signupHandelSubmit} className="flex flex-col gap-4">
                        <h2 className="text-center text-2xl font-bold text-gray-700 mb-2">Create Account</h2>
                        <input
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <input
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <input
                            value={signupMobileNo}
                            onChange={(e) => setSignupMobileNo(e.target.value)}
                            type="text"
                            placeholder="Mobile Number"
                            className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
                            Sign Up
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
