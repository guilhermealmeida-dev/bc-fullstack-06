import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
    const user=localStorage.getItem("user");
    if(!user){
        return <Navigate to={"/"} replace></Navigate>
    }

    return<Outlet/>
}