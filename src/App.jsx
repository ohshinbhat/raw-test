import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import VideoView from "./components/VideoView";
import SignIn from "./components/SignIn";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to /riturao/videos/vid232/view */}
        <Route
          path="/"
          element={<Navigate to="/riturao/videos/vid232/view" />}
        />

        {/* Video view route */}
        <Route path="/riturao/videos/vid232/view" element={<SignIn />} />

        {/* Sign-in route */}
      </Routes>
    </Router>
  );
};

export default App;
