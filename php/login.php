<?php
include "dbconnect.php";
if (isset($_POST['email'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $loginquery = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $loginquery->bind_param("s", $email);
    $loginquery->execute();
    $res = $loginquery->get_result();
    $norow = $res->num_rows;
    if ($norow == 1) {
        $db = $res->fetch_assoc();


        if ($db['email'] === $email && password_verify($password, $db['password'])) {
            echo 'success';

        } else {

            echo 'Wrong credentials';
        }
    } else {
        echo 'Email not registered';
    }
    $loginquery->close();
    $conn->close();
} else {

    echo 'error try again';

}
?>