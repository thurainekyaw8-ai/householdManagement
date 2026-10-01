import { useState } from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Record from "./pages/Record";
import History from "./pages/History";
import Navbar from "./components/Navbar";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <>
      <Navbar setPage={setPage} />

      {page === "dashboard" && <Dashboard />}
      {page === "income" && <Record type="income" />}
      {page === "expense" && <Record type="expense" />}
      {page === "history" && <History />}
    </>
  );
}

export default App;