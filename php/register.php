<?php
include "dbconnect.php";

if (isset($_POST['email'])) {

    $email = $_POST['email'];
    $password = $_POST['password'];
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $select = $conn->prepare("SELECT * FROM users WHERE email =?");
    $select->bind_param("s", $email);
    $select->execute();
    $res = $select->get_result();
    $num = $res->num_rows;


    if ($num == 0) {

        $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?,  ?)");
        $stmt->bind_param("ss", $email, $hashed_password);
        $stmt->execute();

        if ($stmt) {

            echo "Registration Successful";


        } else {
            echo "Registeration Failed";
        }
        $stmt->close();
        $conn->close();
    } else {
        echo 'email already exists';

    }
} else {
    echo 'oops error! try again';

}


?>