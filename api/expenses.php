<?php

header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$host = "mysql";
$dbname = "Household";
$username = "household";
$password = "household";

$conn = new PDO(
    "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
    $username,
    $password
);

$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    $type = $data["type"];
    $category = $data["category"];
    $amount = $data["amount"];
    $date = $data["date"];
    $note = $data["note"];

    if ($type === "income") {
        $sql = "INSERT INTO income (category, amount, date, note)
                VALUES (?, ?, ?, ?)";
    } else {
        $sql = "INSERT INTO expense (category, amount, date, note)
                VALUES (?, ?, ?, ?)";
    }

    $stmt = $conn->prepare($sql);
    $stmt->execute([$category, $amount, $date, $note]);

    echo json_encode([
        "success" => true
    ]);

    exit;
}
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {

    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data["id"];
    $type = $data["type"];

    if ($type === "income") {
        $sql = "DELETE FROM income WHERE id = ?";
    } else {
        $sql = "DELETE FROM expense WHERE id = ?";
    }

    $stmt = $conn->prepare($sql);
    $stmt->execute([$id]);

    echo json_encode([
        "success" => true,
        "deleted" => $stmt->rowCount()
    ]);

    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $income = $conn->query(
        "SELECT id, 'income' AS type, category, amount, date, note
         FROM income"
    )->fetchAll(PDO::FETCH_ASSOC);

    $expense = $conn->query(
        "SELECT id, 'expense' AS type, category, amount, date, note
         FROM expense"
    )->fetchAll(PDO::FETCH_ASSOC);

    $records = array_merge($income, $expense);

    echo json_encode($records);

    exit;
}