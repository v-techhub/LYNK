import { useAuthContext } from "@/context/Auth"
import { PUBLIC_PATHS } from "@/routes/paths"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
    const { authenticatedUser } = useAuthContext()

    return authenticatedUser ? children : <Navigate to={PUBLIC_PATHS.AUTH} />
}

export default ProtectedRoutes