<?php
require_once 'vendor/autoload.php';

use Twilio\Rest\Client;

// Initialize Twilio credentials from environment variables
$twilioAccountSid = getenv('TWILIO_ACCOUNT_SID');
$twilioAuthToken = getenv('TWILIO_AUTH_TOKEN');

if (!$twilioAccountSid || !$twilioAuthToken) {
    die('Twilio credentials not set.');
}

$twilio = new Client($twilioAccountSid, $twilioAuthToken);

// Sending OTP
$otp = rand(100000, 999999); // Generate a 6-digit OTP
$to = $_POST['phone']; // Assuming the phone number comes from form input
$from = '+0987654321'; // Replace with your Twilio phone number

try {
    $message = $twilio->messages->create(
        $to,
        array(
            'from' => $from,
            'body' => "Your OTP code is: $otp"
        )
    );

    echo "OTP sent successfully.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
