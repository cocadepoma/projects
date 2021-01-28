<?php
include_once('../../database/connection.php');
include_once('../functions/functions.php');


if (isset($_POST['new']) && $_POST['new'] == "1") {

    $target_dir = "";
    $file_name = "";
    $target_file = "";
    $extension_file = "";
    $image_ok = false;

    $article_active = 0;
    $article_url = "";
    $article_title = "";
    $article_author = "";
    $article_date = "";
    $article_preview = "";
    $article_footer = "";
    $article_content = "";
    $uploadOK = true;

    if (isset($_FILES['article-img'])) {

        $target_dir = $_SERVER['DOCUMENT_ROOT'] . "/blog/img/blog/";
        $name = pathinfo($_FILES['article-img']['name'], PATHINFO_FILENAME);
        $extension = strtolower(pathinfo($_FILES['article-img']['name'], PATHINFO_EXTENSION));
        $filename_database = $name . "-" . date("m-j-Y-Hms") . "." . $extension;

        $target_file = $target_dir . $filename_database;

        $image_ok = validImage($_FILES['article-img']['error'], $target_file, $extension);
    }

    if (isset($_POST['active'])) {
        $article_active = 1;
    }
    if (isset($_POST['url-name']) && trim(strlen($_POST['url-name'])) >= 5) {
        $article_url = $_POST['url-name'];
    } else {
        $uploadOK = false;
    }
    if (isset($_POST['title']) && trim(strlen($_POST['title'])) >= 5) {
        $article_title = $_POST['title'];
    } else {
        $uploadOK = false;
    }
    if (isset($_POST['author']) && trim(strlen($_POST['author'])) >= 3) {
        $article_author = $_POST['author'];
    } else {
        $uploadOK = false;
    }
    if (isset($_POST['date'])) {
        $article_date = $_POST['date'];
        $splitted = explode("-", $_POST['date']);
        if (!checkdate($splitted[1], $splitted[2], $splitted[0])) {
            $uploadOK = false;
        }
    }
    if (isset($_POST['preview']) && trim(strlen($_POST['preview'])) >= 10) {
        $article_preview = $_POST['preview'];
    } else {
        $uploadOK = false;
    }
    if (isset($_POST['footer']) && trim(strlen($_POST['footer'])) >= 5) {
        $article_footer = $_POST['footer'];
    } else {
        $uploadOK = false;
    }
    if (isset($_POST['content']) && trim(strlen($_POST['content'])) >= 10) {
        $article_content = $_POST['content'];
    } else {
        $uploadOK = false;
    }


    if ($image_ok && $uploadOK && !getIfUrlExists($article_url)) {

        if (move_uploaded_file($_FILES['article-img']['tmp_name'], $target_file)) {

            try {

                $conn = connect();
                $sql = "INSERT INTO articulos (urltitulo, titulo, autor, fecha, preview, contenido, portada, portada_footer, publicado ) VALUES (?,?,?,?,?,?,?,?,?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ssssssssi", $article_url, $article_title, $article_author, $article_date, $article_preview, $article_content, $filename_database, $article_footer, $article_active);
                $stmt->execute();
                $new_id = $stmt->insert_id;

                if ($stmt->affected_rows) {

                    if (isset($_POST['categories']) && strlen($_POST['categories'] > 0)) {
                        $stmt->close();

                        $categories = explode(",", $_POST['categories']);
                        $cnt = 0;
                        foreach ($categories as $i => $id_category) {

                            $sql = "INSERT INTO articulos_categorias (id_articulo, id_categoria) VALUES (?,?)";
                            $stmt = $conn->prepare($sql);
                            $stmt->bind_param("ii", $new_id, $id_category);
                            $stmt->execute();
                            $result = $stmt->get_result();

                            if ($conn->affected_rows) {
                                $cnt++;
                            }
                        }

                        if ($cnt == count($categories)) {
                            $response = array(
                                "respuesta" => "exito",
                                "id_articulo" => $new_id,
                                "imagen" => $filename_database
                            );
                        } else {
                            $response = array(
                                "respuesta" => "error",
                                "error" => "category"
                            );
                        }
                    } else {
                        $response = array(
                            "respuesta" => "exito",
                            "id_articulo" => $new_id,
                            "imagen" => $filename_database
                        );
                    }
                } else {
                    $response = array(
                        "respuesta" => "error",
                        "error" => "bbdd"
                    );
                }
                $stmt->close();
                disconnect($conn);
            } catch (Exception $e) {
                $response = array(
                    "respuesta" => "error" . $e->getMessage()
                );
            }
        } else {
            $response = array(
                "respuesta" => "error",
                "error" => "moving"
            );
        }
    } else {
        $response = array(
            "respuesta" => "error",
            "error" => "params"
        );
    }

    die(json_encode($response));
}

if (isset($_POST['delete']) && $_POST['delete'] == "1" && isset($_POST['id']) && strlen($_POST['id']) > 0) {

    $id = intval($_POST['id']);

    try {
        $conn = connect();
        $sql = "DELETE FROM articulos WHERE id = ?";
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
            "respuesta" => "error " . $e->getMessage()
        );
    }

    die(json_encode($response));
}

if (isset($_POST['update']) && $_POST['update'] == "1") {

    $target_dir = "";
    $file_name = "";
    $target_file = "";
    $extension_file = "";
    $image_ok = false;
    $with_img = false;

    $article_active = 0;
    $article_url = "";
    $article_title = "";
    $article_author = "";
    $article_date = "";
    $article_preview = "";
    $article_footer = "";
    $article_content = "";
    $uploadOK = true;
    $article_id = 0;
    $old_article_url = '';
    $same_url = false;

    if (isset($_FILES['article-img'])) {

        $target_dir = $_SERVER['DOCUMENT_ROOT'] . "/blog/img/blog/";
        $name = pathinfo($_FILES['article-img']['name'], PATHINFO_FILENAME);
        $extension = strtolower(pathinfo($_FILES['article-img']['name'], PATHINFO_EXTENSION));
        $filename_database = $name . "-" . date("m-j-Y-Hms") . "." . $extension;

        $target_file = $target_dir . $filename_database;

        $image_ok = validImage($_FILES['article-img']['error'], $target_file, $extension);

        if (strlen($name) > 0) {
            $with_img = true;
        }
    }

    if (isset($_POST['active'])) {
        $article_active = 1;
    }
    if (isset($_POST['url-name']) && trim(strlen($_POST['url-name'])) >= 5) {
        $article_url = $_POST['url-name'];
    } else {
        $uploadOK = false;
    }
    if (isset($_POST['title']) && trim(strlen($_POST['title'])) >= 5) {
        $article_title = $_POST['title'];
    } else {
        $uploadOK = false;
    }
    if (isset($_POST['author']) && trim(strlen($_POST['author'])) >= 3) {
        $article_author = $_POST['author'];
    } else {
        $uploadOK = false;
    }
    if (isset($_POST['date'])) {
        $article_date = $_POST['date'];
        $splitted = explode("-", $_POST['date']);
        if (!checkdate($splitted[1], $splitted[2], $splitted[0])) {
            $uploadOK = false;
        }
    }
    if (isset($_POST['preview']) && trim(strlen($_POST['preview'])) >= 10) {
        $article_preview = $_POST['preview'];
    } else {
        $uploadOK = false;
    }
    if (isset($_POST['footer']) && trim(strlen($_POST['footer'])) >= 5) {
        $article_footer = $_POST['footer'];
    } else {
        $uploadOK = false;
    }
    if (isset($_POST['content']) && trim(strlen($_POST['content'])) >= 10) {
        $article_content = $_POST['content'];
    } else {
        $uploadOK = false;
    }
    if (isset($_POST['id']) && strlen($_POST['id']) > 0) {
        $article_id = intval($_POST['id']);
        $old_article_url = getUrlName($article_id);
    }

    if ($old_article_url == $article_url) {
        $same_url = true;
    }

    if ($with_img) {

        if ($image_ok && $uploadOK && ($same_url || !getIfUrlExists($article_url))) {

            if (move_uploaded_file($_FILES['article-img']['tmp_name'], $target_file)) {

                try {

                    $conn = connect();
                    $sql = "UPDATE articulos SET urltitulo = ?, titulo = ?, autor = ?, fecha = ?, preview = ?, contenido = ?, portada = ?, portada_footer = ?, publicado = ? WHERE id = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("ssssssssii", $article_url, $article_title, $article_author, $article_date, $article_preview, $article_content, $filename_database, $article_footer, $article_active, $article_id);
                    $stmt->execute();


                    if ($stmt->affected_rows) {
                        $response = array(
                            "update" => "exito",
                            "id_articulo" => $article_id,
                            "imagen" => $filename_database,
                        );
                    } else {
                        $response = array(
                            "update" => "error",
                            "error" => "bbdd"
                        );
                    }
                    $stmt->close();
                    disconnect($conn);
                } catch (Exception $e) {
                    $response = array(
                        "update" => "error" . $e->getMessage()
                    );
                }
            } else {
                $response = array(
                    "update" => "error",
                    "error" => "moving"
                );
            }
        } else {
            $response = array(
                "update" => "error",
                "error" => "params"
            );
        }
    } else {

        if ($uploadOK && ($same_url || !getIfUrlExists($article_url))) {

            try {

                $conn = connect();
                $sql = "UPDATE articulos SET urltitulo = ?, titulo = ?, autor = ?, fecha = ?, preview = ?, contenido = ?, portada_footer = ?, publicado = ? WHERE id = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("sssssssii", $article_url, $article_title, $article_author, $article_date, $article_preview, $article_content, $article_footer, $article_active, $article_id);
                $status = $stmt->execute();

                if ($status) {

                    if (isset($_POST['categories']) && strlen($_POST['categories'] > 0)) {
                        $stmt->close();

                        $categories_new = explode(",", $_POST['categories']);
                        $categories_old = getCategories($article_id);
                        $categories_remove = [];

                        // Find if some old category isn't inside the new ones
                        for ($i = 0; $i < count($categories_old); $i++) {
                            if (!in_array($categories_old[$i], $categories_new)) {
                                $categories_remove[] = $categories_old[$i];
                            }
                        }

                        // Insert every category
                        $cnt = 0;
                        foreach ($categories_new as $i => $id_category) {

                            $sql = "INSERT INTO articulos_categorias (id_articulo, id_categoria) VALUES (?,?)";
                            $stmt = $conn->prepare($sql);
                            $stmt->bind_param("ii", $article_id, $id_category);
                            $stmt->execute();
                            $result = $stmt->get_result();

                            if ($conn->affected_rows) {
                                $cnt++;
                            }
                        }
                        // If the inserts were successful, delete old categories not listed anymore
                        if ($cnt == count($categories_new) && deleteCategories($article_id, $categories_remove)) {
                            $response = array(
                                "update" => "exito",
                                "id_articulo" => $article_id,
                            );
                        } else {
                            $response = array(
                                "update" => "error",
                                "error" => "category"
                            );
                        }
                    } else {
                        // If the categories list was empty, delete all from DB
                        if (deleteAllCategories($article_id)) {
                            $response = array(
                                "update" => "exito",
                                "id_articulo" => $article_id,
                            );
                        } else {
                            $response = array(
                                "update" => "error",
                                "error" => "category_delete_all"
                            );
                        }
                    }
                } else {
                    $response = array(
                        "update" => "error",
                        "error" => "bbdd"
                    );
                }
                $stmt->close();
                disconnect($conn);
            } catch (Exception $e) {
                $response = array(
                    "update" => "error" . $e->getMessage()
                );
            }
        } else {
            $response = array(
                "update" => "error",
                "error" => "params"
            );
        }
    }

    die(json_encode($response));
}
