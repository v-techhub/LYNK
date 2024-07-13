import { RouterProvider } from "react-router-dom"
import { routes } from "./routes"
import { Toaster } from "./components/ui/toaster"
import { AuthProvider } from "./context/Auth"
function App() {

  return (
    <>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={routes} />
      </AuthProvider>

    </>
  )
}

export default App
