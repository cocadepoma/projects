<?php
include_once('./sessions/sessions.php');
include_once('../database/connection.php');
include_once('./layout/header.php');
include_once('./layout/navbar.php');


?>
<main class="container dashboard">

    <div class="push-advert"></div>
    <h2 class="mt-5">Crear Artículo</h2>

    <form action="./models/model-article.php" method="post" enctype="multipart/form-data" id="create-article" name="create-article">
        <div class="edit-edit-wrapper dashboard">
            <div class="form-check form-switch grid-form">
                <label for="active">Activo: </label>
                <input name="active" class="form-check-input article-active project-active" type="checkbox" id="flexSwitchCheckDefault">
            </div>
            <div class="url-edit grid-form">
                <label for="name">Url titulo: </label>
                <input type="text" name="url-name" class="article-url" disabled>
                <input type="hidden" name="url-name" class="article-url-hidden">
            </div>
            <div class="title-edit grid-form">
                <label for="name">Título: </label>
                <input type="text" name="title" class="article-title" placeholder="Título ...">
            </div>
            <div class="author-edit grid-form">
                <label for="url">Autor: </label>
                <input type="text" name="author" class="article-author" placeholder="Autor ...">
            </div>
            <div class="date-edit grid-form">
                <label for="url">Fecha: </label>
                <input type="date" name="date" class="article-date">
            </div>

            <label for="categories">Categorías:</label>
            <ul class="multiselect my-3">
                <?php
                try {

                    $conn = connect();
                    $sql = "SELECT * FROM categorias";

                    if ($result = $conn->query($sql)) {

                        while ($category = $result->fetch_assoc()) {

                            echo "<li data-id='" . $category['id_categoria'] . "'>" . $category['nombre_categoria'] . "</li>";
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
                <textarea name="preview" class="article-preview mt-3" maxlength="350"></textarea>
            </div>
            <div class="img-load mt-3">
                <label for="img">Portada: </label>
                <div class="img-preview text-center mb-5">
                    <img src="../img/no_image.png" alt="" class="img-preview img-preview-new mt-4">
                </div>
                <input type="file" class="form-control project-file" id="input-img" name="article-img" />
            </div>
            <div class="preview-edit grid-form mt-5">
                <label for="info">Footer IMG: </label>
                <input type="text" name="footer" class="portada-footer" placeholder="Texto footer portada ...">
            </div>
            <label class="mt-5" for="info">Creador de contenido: </label>
            <div class="content-edit ">
                <div class="controls d-flex justify-content-center">
                    <a class="btn btn-control me-3 img-control">img</a>
                    <a class="btn btn-control me-3 p-control">p</a>
                    <a class="btn btn-control me-3 h3-control">h3</a>
                    <a class="btn btn-control me-3 strong-control">strong</a>
                    <a class="btn btn-control me-2 a-control">a</a>
                </div>
                <textarea name="content" class="article-content mt-3"></textarea>
            </div>

            <div class="submit-edit d-flex justify-content-between">
                <div class="back">
                    <a class="btn btn-warning me-3 align-self-start" href="admin-area.php">Volver</a>
                </div>
                <input class="btn btn-success create-submit" type="submit" value="Crear">
                <input type="hidden" name="new" value="1">
            </div>
        </div>

    </form>
</main>



<?php include_once('./layout/footer.php'); ?>