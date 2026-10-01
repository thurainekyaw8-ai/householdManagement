import { useState } from "react";

type RecordFormProps = {
  type: "income" | "expense";
};

function RecordForm({ type }: RecordFormProps) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const today = new Date().toISOString().split("T")[0];
  async function addRecord() {
    if (!category) {
      alert("Please select a category.");
      return;
    }

    if (!date) {
      alert("Please select a date.");
      return;
    }

    if (!amount) {
      alert("Please enter an amount.");
      return;
    }
    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }
    if (date > today) {
        alert("You cannot select a future date.");
        return;
    }
    

    const response = await fetch("http://localhost:8000/expenses.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        category,
        amount: Number(amount),
        date,
        note,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Record added!");

      setCategory("");
      setAmount("");
      setDate("");
      setNote("");
    }
  }
    const incomeCategories = [
        "Salary",
        "Part-time",
        "Bonus",
        "Freelance",
        "Gift",
        "Investment",
        "Other",
    ];

    const expenseCategories = [
        "Food",
        "Rent",
        "Transport",
        "Shopping",
        "Entertainment",
        "Bills",
        "Other",
    ];

    const categories =
        type === "income" ? incomeCategories : expenseCategories;

  return (
    <div className="record-form">
      <div className="form-group">
        <label>Category: </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
        <option value="">Select category</option>

        {categories.map((category) => (
            <option key={category} value={category}>
            {category}
            </option>
        ))}
        </select>
      </div>

      <div className="form-group">
        <label>Amount: </label>

        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Date: </label>

        <input
            type="date"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Note: </label>

        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <button className="record-button" onClick={addRecord}>
        Add {type === "income" ? "Income" : "Expense"}
      </button>
    </div>
  );
}

export default RecordForm;
