import RecordForm from "../components/RecordForm";

type RecordProps = {
  type: "income" | "expense";
};

function Record({ type }: RecordProps) {
  return (
    <main className="page">
      <h1>{type === "income" ? "Income" : "Expense"}</h1>

      <RecordForm type={type} />
    </main>
  );
}

export default Record;