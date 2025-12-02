
import { Navigate } from "react-router-dom";


const AdminProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');

    
    if (!token) {
        return <Navigate to={"/adminLoginPanel"} replace />;
    }

    return children;
};

export default AdminProtectedRoute;