import { useState } from "react";

type NavbarProps = {
  setPage: (page: string) => void;
};

function Navbar({ setPage }: NavbarProps) {
  const [showRecordMenu, setShowRecordMenu] = useState(false);

  return (
    <nav className="navbar">
      <h2>Household</h2>

      <div className="navbar-links">
        <a href="#" onClick={() => setPage("dashboard")}>
          Dashboard
        </a>

        <div className="navbar-record">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowRecordMenu(!showRecordMenu);
            }}
          >
            Record ▾
          </a>

          {showRecordMenu && (
            <div className="record-menu">
              <button
                onClick={() => {
                  setPage("income");
                  setShowRecordMenu(false);
                }}
              >Income
              </button>
            <button
              onClick={() => {
                setPage("expense");
                setShowRecordMenu(false);
              }}
            >
              Expense
            </button>
            </div>
          )}
        </div>

        <a href="#" onClick={() => setPage("history")}>
          History
        </a>
      </div>
    </nav>
  );
}

export default Navbar;