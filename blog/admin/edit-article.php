<?php

include_once('./sessions/sessions.php');
include_once('../database/connection.php');
include_once('./layout/header.php');
include_once('./layout/navbar.php');

if (isset($_GET['art']) && strlen($_GET['art']) > 0) {

    $article_url_id = $_GET['art'];
    $categories_arr = [];

    try {
        $conn = connect();
        $sql = "SELECT * FROM articulos WHERE urltitulo = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $article_url_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        if (!$conn->affected_rows) {
            header('location: admin-area.php');
        }
        $article = $result->fetch_assoc();
    } catch (Exception $e) {
        header("location: admin-area.php?err=$err");
    }

    try {
        $conn = connect();
        $sql = "SELECT categorias.id_categoria FROM categorias INNER JOIN articulos_categorias on categorias.id_categoria = articulos_categorias.id_categoria INNER JOIN articulos ON articulos_categorias.id_articulo = articulos.id WHERE articulos.urltitulo = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $article_url_id);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            $categories_arr[] = $row['id_categoria'];
        }
    } catch (Exception $e) {
        header("location: admin-area.php?err=$err");
    }
}

?>


<main class="container dashboard">

    <div class="push-advert"></div>
    <h2 class="mt-5"><small>Editar Artículo:</small><?php echo $article['titulo']; ?></h2>

    <form action="./models/model-article.php" method="post" enctype="multipart/form-data" id="update-article" name="update-article">
        <div class="edit-edit-wrapper dashboard">
            <div class="form-check form-switch grid-form">
                <label for="active">Activo: </label>
                <input name="active" class="form-check-input article-active project-active" type="checkbox" id="<?php echo ($article['publicado']) ? "flexSwitchCheckChecked" : "flexSwitchCheckDefault"; ?>" <?php echo ($article['publicado']) ? "checked" : ""; ?>>
            </div>
            <div class="url-edit grid-form">
                <label for="name">Url titulo: </label>
                <input type="text" name="url-name" class="article-url" disabled value="<?php echo $article['urltitulo'] ?>">
                <input type="hidden" name="url-name" class="article-url-hidden">
            </div>
            <div class="title-edit grid-form">
                <label for="name">Título: </label>
                <input type="text" name="title" class="article-title" placeholder="Título ..." value="<?php echo $article['titulo'] ?>">
            </div>
            <div class="author-edit grid-form">
                <label for="url">Autor: </label>
                <input type="text" name="author" class="article-author" placeholder="Autor ..." value="<?php echo $article['autor'] ?>">
            </div>
            <div class="date-edit grid-form">
                <label for="url">Fecha: </label>
                <input type="date" name="date" class="article-date" value="<?php echo $article['fecha'] ?>">
            </div>
            <label for="categories">Categorías:</label>
            <ul class="multiselect my-3">
                <?php
                try {

                    $conn = connect();
                    $sql = "SELECT * FROM categorias";

                    if ($result = $conn->query($sql)) {

                        while ($category = $result->fetch_assoc()) {
                            if (in_array($category['id_categoria'], $categories_arr)) {
                                echo "<li data-id='" . $category['id_categoria'] . "' class='done'>" . $category['nombre_categoria'] . "</li>";
                            } else {
                                echo "<li data-id='" . $category['id_categoria'] . "'>" . $category['nombre_categoria'] . "</li>";
                            }
                        }
                    }
                } catch (Exception $e) {
                    echo $e->getMessage();
                }
                ?>

            </ul>
            <label for="info">Previo: </label>
            <div class="preview-edit">
                <div class="controls d-flex justify-content-center">
                    <a class="btn btn-control me-3 strong-control-2">strong</a>
                </div>
                <textarea name="preview" class="article-preview mt-3" maxlength="350"><?php echo $article['preview'] ?></textarea>
            </div>
            <div class="img-load mt-3">
                <label for="img">Portada: </label>
                <div class="img-preview text-center mb-5">
                    <img src="../img/blog/<?php echo $article['portada']; ?>" alt="" class="img-preview mt-4">
                </div>
                <input type="file" class="form-control project-file" id="input-img" name="article-img" />
            </div>
            <div class="preview-edit grid-form mt-5">
                <label for="info">Footer IMG: </label>
                <input type="text" name="footer" class="portada-footer" placeholder="Texto footer portada ..." value="<?php echo $article['portada_footer'] ?>">
            </div>
            <label class="mt-5" for="info">Creador de contenido: </label>
            <div class="content-edit ">
                <div class="controls d-flex justify-content-center">
                    <a class="btn btn-control me-2 img-control">img</a>
                    <a class="btn btn-control me-2 p-control">p</a>
                    <a class="btn btn-control me-2 h3-control">h3</a>
                    <a class="btn btn-control me-2 strong-control">strong</a>
                    <a class="btn btn-control me-2 a-control">a</a>
                </div>
                <textarea name="content" class="article-content mt-3"><?php echo $article['contenido'] ?></textarea>
            </div>

            <div class="submit-edit d-flex justify-content-between">
                <div class="back">
                    <a class="btn btn-warning me-3 align-self-start" href="admin-area.php">Volver</a>
                </div>
                <div class="save-back">
                    <a class="btn btn-danger me-3 align-self-start delete-article" data-id="<?php echo $article['id']; ?>" href="admin-area.php">Eliminar</a>
                    <input class="btn btn-success update-submit" type="submit" value="guardar">
                    <input type="hidden" name="update" value="1">
                    <input type="hidden" name="id" value="<?php echo $article['id']; ?>">

                </div>

            </div>
        </div>

    </form>
</main>




<?php include_once('./layout/footer.php'); ?>