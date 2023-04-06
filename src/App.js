import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/protected-route";
import { AuthLayout } from "./utils/auth-layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
