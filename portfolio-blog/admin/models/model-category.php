<?php

include_once('../../database/connection.php');
include_once('../functions/functions.php');

if (isset($_POST['edit']) && $_POST['edit'] == "1") {

    $id_cat = 0;
    $name_cat = '';
    $update_ok = true;

    if (!isset($_POST['id']) || intval($_POST['id']) <= 0) {
        $update_ok = false;
    } else {
        $id_cat = intval($_POST['id']);
    }
    if (!isset($_POST['name']) || strlen($_POST['name']) < 5) {
        $update_ok = false;
    } else {
        $name_cat = strtolower($_POST['name']);
    }


    if ($update_ok) {

        try {
            $conn = connect();
            $sql = "UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $name_cat, $id_cat);
            if ($stmt->execute()) {
                $response = array(
                    'respuesta' => 'exito',
                    'id_cat' => $id_cat,
                    'name_cat' => $name_cat
                );
            } else {
                $response = array(
                    'respuesta' => 'error',
                );
            }
            $stmt->close();
            disconnect($conn);
        } catch (Exception $e) {
            $response = array(
                'respuesta' => 'error' . $e->getMessage(),
            );
        }
    } else {
        $response = array(
            'respuesta' => 'error',
            'bad_params' => 'true'
        );
    }

    die(json_encode($response));
}

if (isset($_POST['delete']) && $_POST['delete'] == "1") {

    $id_cat = 0;
    $update_ok = true;

    if (!isset($_POST['id']) || intval($_POST['id']) <= 0) {
        $update_ok = false;
    } else {
        $id_cat = intval($_POST['id']);
    }

    if ($update_ok) {

        try {

            $conn = connect();
            $sql = "DELETE FROM categorias WHERE id_categoria = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id_cat);
            $stmt->execute();

            if ($stmt->affected_rows) {
                $response = array(
                    "respuesta" => "exito",
                    "id_eliminado" => $id_cat
                );
            } else {
                $response = array(
                    "respuesta" => "error",
                    "error" => "error al borrar"
                );
            }
            $stmt->close();
            disconnect($conn);
        } catch (Exception $e) {
            $response = array(
                'respuesta' => 'error',
                'error' => 'id incorrecto' . $e->getMessage()
            );
        }
    } else {
        $response = array(
            'respuesta' => 'error',
            'error' => 'id incorrecto'
        );
    }
    die(json_encode($response));
}

if (isset($_POST['create']) && $_POST['create'] == "1") {

    if (isset($_POST['name']) && strlen($_POST['name']) >= 5) {

        $cat_name = strtolower($_POST['name']);

        if (!checkIfCategoryExists($cat_name)) {

            try {

                $conn = connect();
                $sql = "INSERT INTO categorias (nombre_categoria) VALUES (?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("s", $cat_name);
                $stmt->execute();
                $new_id = $stmt->insert_id;

                if ($stmt->affected_rows) {
                    $response = array(
                        "respuesta" => "exito",
                        "id_cat" => $new_id,
                        "name_cat" => $cat_name
                    );
                } else {
                    $response = array(
                        "respuesta" => "error"
                    );
                }
            } catch (Exception $e) {
                $response = array(
                    "respuesta" => "error" . $e->getMessage()
                );
            }
        } else {
            $response = array(
                "respuesta" => "error",
                "exist" => true
            );
        }
    } else {
        $response = array(
            "respuesta" => "error"
        );
    }

    die(json_encode($response));
}
