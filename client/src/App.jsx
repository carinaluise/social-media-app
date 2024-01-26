import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Entry from "./pages/Entry";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Entry />} />
        <Route
          path="dashboard"
          element={<PrivateRoute Component={Dashboard} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
