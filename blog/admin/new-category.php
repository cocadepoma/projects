<?php

include_once('./sessions/sessions.php');
include_once('./layout/header.php');

?>


<?php include_once('./layout/navbar.php'); ?>

<div class="push-advert"></div>
<h2 class="margin-negative-20">Nueva Categoría</h2>
<main class="container dashboard margin-negative-5">
    <form action="./models/model-category.php" method="post" enctype="multipart/form-data" id="create-category">
        <div class="edit-edit-wrapper dashboard">
            <div class="name-edit grid-form ">
                <label for="name">Nombre: </label>
                <input class="category-name" type="text" name="name">
            </div>
            <div class=" submit-edit d-flex justify-content-between">
                <div class="back">
                    <a class="btn btn-warning me-3 align-self-start" href="admin-area.php">Volver</a>
                </div>
                <div class="save-back">
                    <input class="btn btn-success update-category-submit" type="submit" value="Guardar">
                    <input type="hidden" name="create" value="1">
                </div>
            </div>
        </div>
    </form>
</main>



<?php include_once('./layout/footer.php'); ?>