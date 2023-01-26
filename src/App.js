import Navbar from "./Components/Navbar";
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import {AuthContextProvider} from "./Context/AuthContext"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login";
import Account from "./pages/Account"
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/account" element={
            <ProtectedRoute>
              <Account/>
            </ProtectedRoute>
          }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
