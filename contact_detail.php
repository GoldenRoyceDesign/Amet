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

    // Query to select all rows from the 'contact_form' table
    $query = "SELECT * FROM contact_form";
    $statement = $pdo->query($query);
    $registrations = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Display the table content with styling
    echo '<style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
                 h2{
                text-align: center;
                margin-top: 20px;
                margin-bottom: 20px;
            }
            th, td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            th {
                background-color: #f2f2f2;
            }
          </style>';
          // Heading for the table
    echo '<h2>Contact Registration Details</h2>';
    echo '<table>
               <tr>
                   <th>ID</th>
                   <th>Name</th>
                   <th>Last Name</th>
                   <th>Email</th>
                   <th>Phone</th>
                   <th>Course</th>
                   <th>Message</th>
                   <th>Registration Time</th>
               </tr>';

    foreach ($registrations as $registration) {
        echo '<tr>';
        echo '<td>' . htmlspecialchars($registration['id']) . '</td>';
        echo '<td>' . htmlspecialchars($registration['name']) . '</td>';
        echo '<td>' . htmlspecialchars($registration['lastName']) . '</td>';
        echo '<td>' . htmlspecialchars($registration['email']) . '</td>';
        echo '<td>' . htmlspecialchars($registration['phone']) . '</td>';
        echo '<td>' . htmlspecialchars($registration['course']) . '</td>';
        echo '<td>' . htmlspecialchars($registration['message']) . '</td>';
        echo '<td>' . htmlspecialchars($registration['registration_time']) . '</td>';
        echo '</tr>';
    }
    echo '</table>';

} catch (PDOException $e) {
    echo 'Connection failed: ' . htmlspecialchars($e->getMessage());
}
?>
