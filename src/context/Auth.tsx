import { createContext, useContext } from "react"

const AuthContext = createContext({})

export const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
    const contextValues = {}
    return <AuthContext.Provider value={contextValues}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)