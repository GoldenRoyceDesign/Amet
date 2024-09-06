<?php
require 'vendor/autoload.php'; // If you use Composer
use Twilio\Rest\Client;

session_start();

$accountSid = 'AC1f3b3d32d7b8eb87ee5f600c45354898'; // Replace with your Twilio Account SID
$authToken = '3210e802f14d17b74ac3b0f5746cb3d7';   // Replace with your Twilio Auth Token
$twilioPhoneNumber = '8903558873'; // Replace with your Twilio phone number

$client = new Client($accountSid, $authToken);

$phoneNumber = $_POST['phone']; // Phone number to send OTP to

// Generate a random OTP code
$otpCode = rand(100000, 999999);

// Save OTP code and phone number to the session
$_SESSION['otp'] = $otpCode;
$_SESSION['phone_number'] = $phoneNumber;

// Send the OTP SMS
$client->messages->create(
    $phoneNumber, // The phone number to send the OTP to
    [
        'from' => $twilioPhoneNumber,
        'body' => "Your OTP code is: $otpCode"
    ]
);

echo json_encode(['success' => 'OTP sent successfully']);
?>
