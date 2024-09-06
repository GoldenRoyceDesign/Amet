<?php
session_start(); // Start session to store OTP

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

        if (isset($requestBody['email'])) {
            $email = $requestBody['email'];

            // Generate a 6-digit OTP
            $otp = rand(100000, 999999);
            $_SESSION['otp'] = $otp; // Store OTP in session for verification

            // Prepare email
            $to = $email;
            $subject = "Your OTP Code";
            $message = "Your OTP code is: $otp";
            $headers = "From: no-reply@example.com";

            // Send OTP email
            if (mail($to, $subject, $message, $headers)) {
                echo json_encode(['success' => 'OTP sent successfully.']);
            } else {
                echo json_encode(['error' => 'Failed to send OTP.']);
            }
        } else {
            echo json_encode(['error' => 'Email address is required.']);
        }
    } else {
        echo json_encode(['error' => 'Invalid request method.']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>
