import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function Dashboard() {
  const [records, setRecords] = useState<any[]>([]);

  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);

  async function getRecords() {
    const response = await fetch("http://localhost:8000/expenses.php");
    const data = await response.json();

    setRecords(data);
  }

  useEffect(() => {
    getRecords();
  }, []);

  const totalIncome = records
    .filter((record) => record.type === "income")
    .reduce((total, record) => total + Number(record.amount), 0);

  const totalExpense = records
    .filter((record) => record.type === "expense")
    .reduce((total, record) => total + Number(record.amount), 0);

  const remaining = totalIncome - totalExpense;

  // Get expense categories and total amount for each category
  const expenseRecords = records.filter(
    (record) => record.type === "expense"
  );

  const expenseCategories: { [key: string]: number } = {};

  expenseRecords.forEach((record) => {
    if (expenseCategories[record.category]) {
      expenseCategories[record.category] += Number(record.amount);
    } else {
      expenseCategories[record.category] = Number(record.amount);
    }
  });

  const categoryLabels = Object.keys(expenseCategories);
  const categoryAmounts = Object.values(expenseCategories);

  // Pie Chart - Income vs Expense
  useEffect(() => {
    if (!pieChartRef.current || records.length === 0) return;

    const pieChart = new Chart(pieChartRef.current, {
      type: "pie",
      data: {
        labels: ["Income", "Expense"],
        datasets: [
          {
            data: [totalIncome, totalExpense],
          },
        ],
      },
    });

    return () => {
      pieChart.destroy();
    };
  }, [records, totalIncome, totalExpense]);

  // Bar Chart - Expense by Category
  useEffect(() => {
    if (!barChartRef.current || expenseRecords.length === 0) return;

    const barChart = new Chart(barChartRef.current, {
      type: "bar",
      data: {
        labels: categoryLabels,
        datasets: [
          {
            label: "Expense",
            data: categoryAmounts,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      barChart.destroy();
    };
  }, [records]);

  return (
    <main className="page">
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Income</h3>
          <p>¥{totalIncome.toLocaleString()}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Expense</h3>
          <p>¥{totalExpense.toLocaleString()}</p>
        </div>

        <div className="dashboard-card">
          <h3>Remaining</h3>
          <p>¥{remaining.toLocaleString()}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h2>Income vs Expense</h2>
          <canvas ref={pieChartRef}></canvas>
        </div>

        <div className="chart-box">
          <h2>Expense by Category</h2>
          <canvas ref={barChartRef}></canvas>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;

