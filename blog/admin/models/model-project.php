<?php

include_once('../../database/connection.php');
include_once('../functions/functions.php');


if (isset($_POST['edit']) && $_POST['edit'] == 1) {

    $target_dir = "";
    $file_name = "";
    $target_file = "";
    $extension_file = "";
    $image_ok = false;

    $project_id = '';
    $project_name = '';
    $project_url = '';
    $project_info = '';
    $project_active = 0;


    // Check if input id is filled, if isn't, go back
    if (isset($_POST['id']) && strlen($_POST['id'])  > 0) {

        $project_id = $_POST['id'];

        if (isset($_FILES['img-project'])) {

            $target_dir = $_SERVER['DOCUMENT_ROOT'] . "/blog/img/projects/";
            $name = pathinfo($_FILES['img-project']['name'], PATHINFO_FILENAME);
            $extension = strtolower(pathinfo($_FILES['img-project']['name'], PATHINFO_EXTENSION));
            $filename_database = $name . "-" . date("m-j-Y-Hms") . "." . $extension;

            $target_file = $target_dir . $filename_database;

            $image_ok = validImage($_FILES['img-project']['error'], $target_file, $extension);
        }


        $arr = getProjectData($project_id);

        // Check if input name is filled
        if (isset($_POST['name']) && strlen($_POST['name'])  > 0) {
            $project_name = trim($_POST['name']);
        } else {
            $project_name = $arr['nombre'];
        }
        // Check if input url is filled
        if (isset($_POST['url']) && strlen($_POST['url'])  > 0) {
            $project_url = trim($_POST['url']);
        } else {
            $project_url = $arr['url'];
        }
        // Check if input info is filled
        if (isset($_POST['info']) && strlen($_POST['info'])  > 0) {
            $project_info = trim($_POST['info']);
        } else {
            $project_info = $arr['descripcion'];
        }
        // Check if input active is filled
        if (isset($_POST['active'])) {
            $project_active = 1;
        } else {
            $project_active = 0;
        }


        if ($image_ok) {

            if (move_uploaded_file($_FILES['img-project']['tmp_name'], $target_file)) {

                try {
                    $conn = connect();
                    $sql = "UPDATE proyectos SET nombre = ?, portada = ?, url = ?, descripcion = ?, activo = ? WHERE id = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("sssssi", $project_name, $filename_database, $project_url, $project_info, $project_active, $project_id);
                    $status = $stmt->execute();

                    if ($status) {
                        $response = array(
                            'respuesta' => 'exito',
                            'imagen' => $filename_database,
                            'proyecto' => $project_id
                        );
                    } else {
                        $response = array(
                            'respuesta' => 'error'
                        );
                    }
                    $stmt->close();
                    disconnect($conn);
                } catch (Exception $e) {
                    $response = array(
                        'respuesta' => $e->getMessage()
                    );
                }
            } else {
                $response = array(
                    'respuesta' => 'error'
                );
            }
        } else {

            try {
                $conn = connect();
                $sql = "UPDATE proyectos SET nombre = ?, url = ?, descripcion = ?, activo = ? WHERE id = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ssssi", $project_name, $project_url, $project_info, $project_active, $project_id);
                $status = $stmt->execute();

                if ($status) {
                    $response = array(
                        'respuesta' => 'exito',
                        'proyecto' => $project_id
                    );
                } else {
                    $response = array(
                        'respuesta' => 'error'
                    );
                }
                $stmt->close();
                disconnect($conn);
            } catch (Exception $e) {
                $response = array(
                    'respuesta' => $e->getMessage()
                );
            }
        }
    } else {
        $response = array(
            'respuesta' => 'error'
        );
    }

    die(json_encode($response));
}

if (isset($_POST['delete']) && $_POST['delete'] == 1 && isset($_POST['id']) && strlen($_POST['id']) > 0) {

    $id = intval($_POST['id']);

    try {
        $conn = connect();
        $sql = "DELETE FROM proyectos WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        if ($stmt->affected_rows) {
            $response = array(
                "respuesta" => "exito",
                "id_eliminado" => $id
            );
        } else {
            $response = array(
                "respuesta" => "error",
            );
        }
    } catch (Exception $e) {
        $response = array(
            "respuesta" => $e->getMessage()
        );
    }

    die(json_encode($response));
}

if (isset($_POST['new']) && $_POST['new'] == 1) {

    $target_dir = $_SERVER['DOCUMENT_ROOT'] . "/blog/img/projects/";
    $file_name = basename($_FILES['img-project']['name']);
    $target_file = $target_dir . $file_name;
    $extension_file = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    $project_active = 0;
    $project_name = '';
    $project_url = '';
    $project_info = '';

    $image_ok = validImage($_FILES['img-project']['error'], $target_file, $extension_file);
    $project_ok = true;

    if (isset($_POST['active'])) {
        $project_active = 1;
    }
    if (isset($_POST['name']) && strlen($_POST['name']) >= 3) {
        $project_name = $_POST['name'];
    } else {
        $project_ok = false;
    }
    if (isset($_POST['url'])) {
        $project_url = $_POST['url'];
    }
    if (isset($_POST['info']) && strlen($_POST['info']) >= 5) {
        $project_info = $_POST['info'];
    } else {
        $project_ok = false;
    }

    if (!$project_ok || !$image_ok) {
        $response = array(
            "respuesta" => "error",
            "error" => "bad params"
        );
    } else {

        if (move_uploaded_file($_FILES['img-project']['tmp_name'], $target_file)) {
            try {

                $conn = connect();
                $sql = "INSERT INTO proyectos (nombre, portada, url, descripcion, activo) VALUES (?,?,?,?,?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ssssi", $project_name, $file_name, $project_url, $project_info, $project_active);
                $stmt->execute();
                $new_id = $stmt->insert_id;
                if ($stmt->affected_rows) {
                    $response = array(
                        "respuesta" => "exito",
                        "id_proyecto" => $new_id,
                        "imagen" => $file_name
                    );
                } else {
                    $response = array(
                        "respuesta" => "error",
                    );
                }

                $stmt->close();
                disconnect($conn);
            } catch (Exception $e) {
                $response = array(
                    "respuesta" => $e->getMessage()
                );
            }
        } else {
            $response = array(
                "respuesta" => "error",
            );
        }
    }

    die(json_encode($response));
}
