import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    //se não tiver token redirecione para página de login.
    if (!token) {
        return <Navigate to="/login" />;
    }

    //se houver touken renderiza o componente children que foi passado (DashboardPage)
    return children;
}

export default ProtectedRoute;