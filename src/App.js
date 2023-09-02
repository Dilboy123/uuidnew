import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, Register, Dashboard, Login, Users, Uuid } from "./Pages";
import { Content } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Content />} />
          <Route path="users" element={<Users />} />
          <Route path="uuid" element={<Uuid />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
