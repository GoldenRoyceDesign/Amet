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
            isset($requestBody['email']) && 
            isset($requestBody['contact']) && 
            isset($requestBody['subject'])) {
            
            // Extract data from the request body
            $name = $requestBody['name'];
            $email = $requestBody['email'];
            $contact = $requestBody['contact'];
            $subject = $requestBody['subject'];

            // Check if the email already exists in the database
            $checkQuery = "SELECT * FROM contact_form WHERE email = ?";
            $checkStatement = $pdo->prepare($checkQuery);
            $checkStatement->execute([$email]);
            $existingUser = $checkStatement->fetch();

            if ($existingUser) {
                // Return an error message if the email already exists
                echo json_encode(['error' => 'Email already exists in the database!']);
            } else {
                // Prepare the INSERT statement
                $query = "INSERT INTO contact_form (name, email, contact, subject) VALUES (?, ?, ?, ?)";
                $statement = $pdo->prepare($query);

                // Bind the parameters and execute the statement
                $statement->bindParam(1, $name);
                $statement->bindParam(2, $email);
                $statement->bindParam(3, $contact);
                $statement->bindParam(4, $subject);

                $statement->execute();
                $lastInsertedId = $pdo->lastInsertId();

                // Return a success message
                echo json_encode(['success' => 'Registration Successful.']);
            }
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


