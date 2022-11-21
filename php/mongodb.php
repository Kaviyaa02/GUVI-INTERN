<?php

require 'vendor/autoload.php';
$env = Dotenv\Dotenv::createImmutable(__DIR__, '/.env');
$env->load();
try {
    $client = new MongoDB\Client(
        $_ENV['MONGO']
    );


    $profileCollection = $client->guvi_task->profile;
    // echo "Connection to database successfully";
} catch (Throwable $e) {
    echo "Captured Throwable for connection : " . $e->getMessage() . PHP_EOL;
}
?>