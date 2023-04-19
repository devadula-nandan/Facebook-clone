import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import Navbar from "./layout/navbar";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Expirements from "./routes/Expirements";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/expirements" element={<Expirements />} />
        <Route path="*" element={<h1>404</h1>} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
