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

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Retrieve data from the request body
        $requestBody = json_decode(file_get_contents('php://input'), true);
        
        // Check if all required fields are present
        if (isset($requestBody['name']) && 
            isset($requestBody['lastName']) && 
            isset($requestBody['email']) && 
            isset($requestBody['phone']) && 
            isset($requestBody['course']) &&
            isset($requestBody['message'])) {
            
            // Extract data from the request body
            $name = $requestBody['name'];
            $lastName = $requestBody['lastName'];
            $email = $requestBody['email'];
            $phone = $requestBody['phone'];
            $course = $requestBody['course'];
            $message = $requestBody['message'];

            // Prepare the INSERT statement to allow duplicate emails
            $query = "INSERT INTO contact_form (name, lastName, email, phone, course, message) VALUES (?, ?, ?, ?, ?, ?)";
            $statement = $pdo->prepare($query);

            // Bind the parameters and execute the statement
            $statement->execute([$name, $lastName, $email, $phone, $course, $message]);

            // Return a success message
            echo json_encode(['success' => 'Registration Successful.']);
        } else {
            // Return an error message if required fields are missing
            echo json_encode(['error' => 'Required fields are missing!']);
        }
    } else {
        // Return an error message for invalid request method
        echo json_encode(['error' => 'Invalid request method!']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>
