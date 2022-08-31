import "./App.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Auth JWT React</h1>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile/ >
                </ProtectedRoute>
              } />
            </Routes>
          </header>
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
