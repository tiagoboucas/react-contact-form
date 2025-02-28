import React from "react";
import { NavLink, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ContactForm from "./components/ContactForm";
import EmailsPage from "./components/EmailsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>React Contact Form</h1>
          <nav className="navbar">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/emails"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              View Emails
            </NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ContactForm />} />
            <Route path="/emails" element={<EmailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;