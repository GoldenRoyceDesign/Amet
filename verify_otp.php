<?php
session_start(); // Start session to access OTP

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestBody = json_decode(file_get_contents('php://input'), true);

    if (isset($requestBody['otp'])) {
        $enteredOtp = $requestBody['otp'];

        // Check if entered OTP matches the one stored in session
        if ($enteredOtp == $_SESSION['otp']) {
            echo json_encode(['success' => 'OTP verified successfully.']);
        } else {
            echo json_encode(['error' => 'Invalid OTP.']);
        }
    } else {
        echo json_encode(['error' => 'OTP is required.']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method.']);
}
?>
