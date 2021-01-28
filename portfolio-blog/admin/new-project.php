<?php

include_once('./sessions/sessions.php');
include_once('./layout/header.php');
include_once('./layout/navbar.php');

?>
<main class="container dashboard">

    <div class="push-advert"></div>
    <h2 class="mt-5">Crear Proyecto</h2>

    <form action="./models/model-project.php" method="post" enctype="multipart/form-data" id="create-project" name="create-project">
        <div class="edit-edit-wrapper dashboard">
            <div class="form-check form-switch grid-form">
                <label for="active">Activo: </label>
                <input name="active" class="form-check-input project-active" type="checkbox" id="flexSwitchCheckDefault">
            </div>
            <div class="name-edit grid-form">
                <label for="name">Nombre: </label>
                <input type="text" name="name" class="project-name" placeholder="Nombre ...">
            </div>
            <div class="url-edit grid-form">
                <label for="url">Url o IP: </label>
                <input type="text" name="url" class="project-url" placeholder="Url ...">
            </div>
            <div class="info-edit grid-form">
                <label for="info">Descripción: </label>
                <input type="text" name="info" class="project-info" placeholder="Info ...">
            </div>
            <div class="img-load">
                <input type="file" class="form-control project-file" id="input-img" name="img-project" />
            </div>
            <div class="img-preview text-center">
                <img src="../img/no_image.png" alt="" class="img-preview img-preview-new  mt-4">
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