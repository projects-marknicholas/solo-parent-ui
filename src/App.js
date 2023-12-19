import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SessionProvider from "./assets/pages/solo-parent/session";
import "./App.css";

// Website pages
import Home from "./assets/pages/home";
import Register from "./assets/pages/register";
import Login from "./assets/pages/login";

// Solo parent module pages
import SoloParentApplications from "./assets/pages/solo-parent/applications";
import SoloParentTicketModule from "./assets/pages/solo-parent/ticket-module";
import MonthlyAllowance from "./assets/pages/solo-parent/allowance";
import Loan from "./assets/pages/solo-parent/loan";
import ReliefDistribution from "./assets/pages/solo-parent/relief-distribution";

function App() {
  return (
    <>
      <Router>
        <SessionProvider>
          {/* Wrap the Router with SessionProvider */}
          <Routes>
            {/* Website pages */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
            {/* Solo parent module pages */}
            <Route path="/solo-parent/" element={<SoloParentApplications />} />
            <Route
              path="/solo-parent/applications"
              element={<SoloParentApplications />}
            />
            <Route
              path="/solo-parent/ticket-module"
              element={<SoloParentTicketModule />}
            />
            <Route
              path="/solo-parent/monthly-allowance"
              element={<MonthlyAllowance />}
            />
            <Route path="/solo-parent/loan" element={<Loan />} />
            <Route
              path="/solo-parent/relief-distribution"
              element={<ReliefDistribution />}
            />
          </Routes>
        </SessionProvider>
      </Router>
    </>
  );
}

export default App;
