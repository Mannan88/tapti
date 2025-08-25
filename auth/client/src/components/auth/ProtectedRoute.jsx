import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

export default function ProtectedRoute({children}) {
    const {user, loading} = useAuth();
    if(loading) {
        return(
            <div>loading...</div>
        );
    }
    if(!user) {
        return <Navigate to="/" replace />
    }
    return children;
}