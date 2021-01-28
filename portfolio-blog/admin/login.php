<?php
session_start();
if (isset($_SESSION['user']) && isset($_SESSION['id'])) {
    header('location: admin-area.php');
}
if (isset($_GET['close_session']) && strlen($_GET['close_session']) > 0) {
    $cerrar_sesion = $_GET['close_session'];
    if ($cerrar_sesion) {
        session_destroy();
    }
}

include_once('./layout/header.php');
?>


<div class="push-advert">*Error, usuario o contraseña incorrecto/s</div>
<h1 class="h1-login">Login Area</h1>

<form name="login-admin" id="login-admin" method="post" action="./models/model-admin.php">
    <div class="form-name">
        <label class="label-login" for="usuario">Username</label>
        <input class="input-login username" type="text" name="username">
    </div>
    <div class="form-password">
        <label class="label-login" for="password">Password</label>
        <input class="input-login password" type="password" name="password">
    </div>
    <div class="form-submit">
        <input class="input-login" type="hidden" name="login-admin" value="1">
        <button type="submit" class="submit btn btn-submit">Login</button>
    </div>
</form>

</body>

</html>