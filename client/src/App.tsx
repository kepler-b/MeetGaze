import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpPage from "./pages/signup";
import HomePage from "./pages/homepage";
import { AuthProvider } from "./contexts/AuthContext";
import SetupAccountPage from "./pages/SetupAccountPage";
import LogInPage from "./pages/login";
import VideoCallPage from "./pages/VideoCallPage";
import JoinRoomPage from "./pages/JoinRoomPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/signup" Component={SignUpPage} />
          <Route path="/login" Component={LogInPage} />
          <Route path="/setup" Component={SetupAccountPage} />
          <Route path="/room/:id" Component={VideoCallPage} />
          <Route path="/room/join/:id" Component={JoinRoomPage} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
