<?php
require 'vendor/autoload.php';
$env = Dotenv\Dotenv::createImmutable(__DIR__, '/.env');
$env->load();
$servername = $_ENV['SQLSERVER'];
$username = $_ENV['SQLUSERNAME'];
$password = $_ENV['SQLPASSWORD'];
$database = $_ENV['SQLDB'];
// Create a connection
try {
    $conn = mysqli_connect(
        $servername,
        $username,
        $password,
        $database,
    );
    if ($conn) {
        // echo 'db connected';
    } else {
        echo 'sql not connected';
        die("Error" . mysqli_connect_error());
    }
} catch (\Throwable $th) {
    echo $th;
}

?>