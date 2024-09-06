<?php
session_start();

$inputOtp = $_POST['otp']; // OTP entered by the user
$savedOtp = $_SESSION['otp']; // OTP saved during SMS sending

if ($inputOtp === $savedOtp) {
    echo json_encode(['success' => 'OTP verified successfully']);
} else {
    echo json_encode(['error' => 'Invalid OTP']);
}
?>
