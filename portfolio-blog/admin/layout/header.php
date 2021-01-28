<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FRS Admin Area</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script src="https://kit.fontawesome.com/4211956054.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/admin-styles.css">
    <script src="../js/jquery.js"></script>
    <script src="js/admin.js"></script>
</head>
<?php

$page = basename($_SERVER['PHP_SELF']);

if ($page  == 'login.php') {
    echo "<body class='login-wrapper'>";
} else {
    echo "<body class='d-flex flex-column justify-content-between'>";
}
?>