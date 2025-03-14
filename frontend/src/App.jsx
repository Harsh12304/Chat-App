  import React from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
  import Login from "./component/Login";
  import Register from "./component/Register";
  import Chat from "./component/Chat";

  function App() {
    return (
      <Router>
        <Routes>
          {/* Add a route for the root path */}
          <Route path="/" element={<Login />} /> {/* You can change this to any default component */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    );
  }

  export default App;
