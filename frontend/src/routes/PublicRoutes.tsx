import { Navigate, Outlet } from "react-router";

export function PublicRoute() {
    const user=localStorage.getItem("user");
    if(user){
        return <Navigate to={"/home"} replace></Navigate>
    }

    return<Outlet/>
}