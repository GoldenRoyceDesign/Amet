<?php
// MySQL database credentials
$host = 'localhost';
$port = 3306;
$dbname = 'ametcity_application';
$username = 'ametcity_applica';
$password = '26qd#K6nC{n)';

error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Connect to the MySQL database
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);

    // Set error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the form is submitted
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get the form data
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $course = $_POST['course'];

        // Insert form data into the 'course_registrations' table
        $query = "INSERT INTO course_registrations (name, email, contact, course) VALUES (:name, :email, :phone, :course)";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':email', $email);
        $statement->bindParam(':phone', $phone);
        $statement->bindParam(':course', $course);
        $statement->execute();

        // Respond with a success message in JSON format
        echo json_encode(['success' => true]);
    }
} catch (PDOException $e) {
    // Respond with an error message in JSON format
    echo json_encode(['success' => false, 'message' => htmlspecialchars($e->getMessage())]);
}
?>
