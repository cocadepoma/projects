<?php

include_once('../../database/connection.php');

function validImage($file_error, $target_file, $extension_file)
{
    $image_ok = true;
    // Check if file exist, size and extension
    if ($file_error == 0) {
        // Check if file already exists in img/projects folder
        if (file_exists($target_file)) {
            $image_ok = false;
        }
        // Check file size
        if ($file_error['size'] > 1000000) {
            $image_ok = false;
        }
        // Allow .jpg, .png, .jpeg and .gif
        if ($extension_file != "jpg" && $extension_file != "png" && $extension_file != "jpeg" && $extension_file != "gif") {
            $image_ok = false;
        }
    } else {
        $image_ok = false;
    }

    return $image_ok;
}
function getProjectData($id)
{
    $conn = connect();
    $sql = "SELECT * FROM proyectos WHERE id = ?";
    $response = array();

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($project = $result->fetch_assoc()) {

        $response['id'] = $project['id'];
        $response['nombre'] = $project['nombre'];
        $response['portada'] = $project['portada'];
        $response['url'] = $project['url'];
        $response['descripcion'] = $project['descripcion'];
        $response['activo'] = $project['activo'];
    }

    $stmt->close();

    return $response;
}
function checkIfCategoryExists($name)
{
    $exists = false;

    try {
        $conn = connect();
        $sql = "SELECT nombre_categoria FROM categorias WHERE nombre_categoria = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $name);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($categoria = $result->fetch_assoc()) {
            if ($categoria['nombre_categoria'] == $name) {
                $exists = true;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    return $exists;
}
function getIfUrlExists($url)
{
    $exists = false;
    try {

        $conn = connect();
        $sql = "SELECT urltitulo FROM articulos WHERE urltitulo = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $url);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($articulo = $result->fetch_assoc()) {
            if ($articulo['urltitulo'] == $url) {
                $exists = true;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    return $exists;
}

function getUrlName($id)
{
    $name = '';
    try {

        $conn = connect();
        $sql = "SELECT urltitulo FROM articulos WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($articulo = $result->fetch_assoc()) {
            $name = $articulo['urltitulo'];
        }

        $stmt->close();
        disconnect($conn);
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    return $name;
}

function checkValidUsername($name)
{
    $temp_name = str_replace(' ', '', $name);

    if (strlen($temp_name) >= 3 && ctype_alnum($temp_name)) {
        return true;
    } else {
        return false;
    }
}

function getCategories($id)
{
    $categories = [];

    try {
        $conn = connect();
        $sql = "SELECT categorias.id_categoria FROM categorias INNER JOIN articulos_categorias on categorias.id_categoria = articulos_categorias.id_categoria INNER JOIN articulos ON articulos_categorias.id_articulo = articulos.id WHERE articulos.id = ? ";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($category = $result->fetch_assoc()) {
            $categories[] = $category['id_categoria'];
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    return $categories;
}

function deleteCategories($id, $categories)
{
    $cnt = 0;
    try {
        $conn = connect();

        foreach ($categories as $key => $category_id) {
            # code...
            $sql = "DELETE FROM articulos_categorias WHERE id_articulo = ? AND id_categoria = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ii", $id, $category_id);
            $stmt->execute();

            if ($stmt->affected_rows) {
                $cnt++;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    if ($cnt == count($categories)) {
        return true;
    } else {
        return false;
    }
}

function deleteAllCategories($id)
{
    $ok = false;

    try {
        $conn = connect();

        # code...
        $sql = "DELETE FROM articulos_categorias WHERE id_articulo = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            $ok = true;
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    return $ok;
}
