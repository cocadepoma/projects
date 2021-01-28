<?php
include_once('../../database/connection.php');
include_once('../functions/functions.php');

if (isset($_POST['user']) && isset($_POST['pwd'])) {

    $name_ok = (isset($_POST['user']) && checkValidUsername($_POST['user']));
    $pass_ok = (isset($_POST['pwd']) && strlen($_POST['pwd']) >= 4);

    if ($name_ok && $pass_ok) {
        $response = array(
            'respuesta' => 'error'
        );
        $username = $_POST['user'];
        $password = $_POST['pwd'];

        $conn = connect();
        $sql = "SELECT id_usuario, nombre_usuario, password_usuario FROM usuarios WHERE nombre_usuario = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->bind_result($id_admin, $admin_name, $admin_password);

        if ($stmt->affected_rows) {
            $exists = $stmt->fetch();
            if ($exists) {
                if (password_verify($password, $admin_password)) {
                    session_start();
                    $_SESSION['id'] = $id_admin;
                    $_SESSION['user'] = $admin_name;

                    $response = array(
                        'respuesta' => 'success',
                        'user' => $admin_name
                    );
                }
            }
        }
        $stmt->close();
        $conn->close();
    }

    die(json_encode($response));
}
