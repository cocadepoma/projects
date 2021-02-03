<?php

// Tratar warnings como errores
mysqli_report(MYSQLI_REPORT_STRICT);

function connect()
{
    try {
        $conn = new mysqli('localhost', 'root', '', 'blog');
        $conn->set_charset("utf8");
        if ($conn) {
            return $conn;
        } else {
            return 0;
        }
    } catch (Exception $e) {
        echo "Error al conectar con la BBDD, inténtelo de nuevo pasados unos minutos";
    }
}

function disconnect($conn)
{
    $conn = null;
}
