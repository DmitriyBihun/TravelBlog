import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoute() {

    const currentUser = useSelector(state => state.user.currentUser)

    if (currentUser) {
        return <Navigate to='/' replace />
    }

    return <Outlet />

}

export default AuthRoute;