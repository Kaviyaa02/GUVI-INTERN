<?php
ini_set('session.save_handler', 'redis');
ini_set('session.save_path', "tcp://localhost:6379?auth=root");
session_start();
$count = isset($_SESSION['count']) ? $_SESSION['count'] : 1;
echo $count;
$_SESSION['count'] = ++$count;
?>