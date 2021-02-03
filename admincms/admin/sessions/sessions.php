<?php
session_start();
if (!isset($_SESSION['testing_user']) && !isset($_SESSION['testing_id'])) {
    header('location: login.php');
}
