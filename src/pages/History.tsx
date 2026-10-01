import { useEffect, useState } from "react";

function History() {
  const [records, setRecords] = useState<any[]>([]);

  async function getRecords() {
    const response = await fetch("http://localhost:8000/expenses.php");
    const data = await response.json();

    setRecords(data);
  }

  async function deleteRecord(id: string, type: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch("http://localhost:8000/expenses.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        type,
      }),
    });

    const data = await response.json();

    if (data.success) {
      getRecords();
    }
  }

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <main className="page">
      <h1>History</h1>

      <div className="history-list">
        <div className="history-header">
          <span>Category</span>
          <span>Type</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Note</span>
          <span>Action</span>
        </div>

        {records.map((record) => (
          <div
            className="history-item"
            key={`${record.type}-${record.id}`}
          >
            <span>{record.category}</span>

            <span>
              {record.type === "income" ? "Income" : "Expense"}
            </span>

            <span>{record.date}</span>

            <strong>
              ¥{Number(record.amount).toLocaleString()}
            </strong>

            <span className="note-text" title={record.note || "-"}>
              {record.note || "-"}
            </span>
          
            <button
              className="delete-button"
              onClick={() =>
                deleteRecord(record.id, record.type)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default History;