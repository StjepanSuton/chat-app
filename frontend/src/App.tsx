import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useGetUser } from "./services";




const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading } = useGetUser();

  if (isLoading) return null;
  return authUser ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading } = useGetUser();

  if (isLoading) return null;
  return !authUser ? children : <Navigate to="/" />;
};

function App() {

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
