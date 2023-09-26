import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Header from "./Components/Layout/Header";
import LandingPage from "./Components/LandingPage/LandingPage";
import Register from "./Components/Auth/Register";
import CandidateList from "./Components/Candidates/CandidateList";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<CandidateList />} />
        
      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
