<?php
$host = 'localhost';
$port = 3306;
$dbname = 'ametcity_application';
$username = 'ametcity_applica';
$password = '26qd#K6nC{n)';

error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $requestBody = json_decode(file_get_contents('php://input'), true);

        if (isset($requestBody['name']) && 
            isset($requestBody['email']) && 
            isset($requestBody['phone']) && 
            isset($requestBody['course'])) {
            
            $name = $requestBody['name'];
            $email = $requestBody['email'];
            $phone = $requestBody['phone'];
            $course = $requestBody['course'];

            $checkQuery = "SELECT * FROM discount_form WHERE email = ?";
            $checkStatement = $pdo->prepare($checkQuery);
            $checkStatement->execute([$email]);
            $existingUser = $checkStatement->fetch();

            if ($existingUser) {
                echo json_encode(['error' => 'Email already exists in the database!']);
            } else {
                $query = "INSERT INTO discount_form (name, email, phone, course) VALUES (?, ?, ?, ?)";
                $statement = $pdo->prepare($query);

                $statement->bindParam(1, $name);
                $statement->bindParam(2, $email);
                $statement->bindParam(3, $phone);
                $statement->bindParam(4, $course);

                $statement->execute();
                echo json_encode(['success' => 'Registration Successful.']);
            }
        } else {
            echo json_encode(['error' => 'Required fields are missing!']);
        }
    } else {
        echo json_encode(['error' => 'Invalid request method!']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>
