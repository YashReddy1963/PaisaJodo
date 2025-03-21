import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Land } from "@/layouts";
import { SignIn, SignUp } from "./pages/auth";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Land />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Navigate to="/auth/sign-in/" replace />} />
      <Route path="/auth/sign-in/" element={< SignIn/>} />
      <Route path="/auth/sign-up/" element={< SignUp/>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
