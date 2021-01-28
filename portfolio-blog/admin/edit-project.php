<?php

include_once('./sessions/sessions.php');
include_once('../database/connection.php');
include_once('./layout/header.php');
include_once('./layout/navbar.php');

?>
<main class="container dashboard">

    <?php
    $conn = connect();
    if (isset($_GET['project']) && !empty($_GET['project']) && strlen($_GET['project']) > 0) {

        $id_project = $_GET['project'];

        $sql = "SELECT * FROM proyectos WHERE id = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_project);
        $stmt->execute();
        $result = $stmt->get_result();

        if (!$conn->affected_rows) {
            header('location: admin-area.php');
        }

        while ($project = $result->fetch_assoc()) { ?>
            <div class="push-advert"></div>
            <h2 class="mt-5"><small class="small-h2">Editar: </small> <?php echo $project['nombre']; ?></h2>
            <form action="model-project.php" method="post" enctype="multipart/form-data" id="update-project">
                <div class="edit-edit-wrapper dashboard">
                    <div class="id-edit grid-form ">
                        <label for="id">ID: </label>
                        <input type="text" name="id" disabled value="<?php echo $project['id']; ?>">
                        <input type="hidden" name="id" value="<?php echo $project['id']; ?>">
                    </div>
                    <div class="form-check form-switch grid-form">
                        <label for="active">Activo: </label>
                        <input name="active" class="form-check-input project-active" type="checkbox" id="<?php echo ($project['activo']) ? "flexSwitchCheckChecked" : "flexSwitchCheckDefault"; ?>" <?php echo ($project['activo']) ? "checked" : ""; ?>>
                    </div>
                    <div class="name-edit grid-form ">
                        <label for="name">Nombre: </label>
                        <input class="project-name" type="text" name="name" value="<?php echo $project['nombre']; ?>">
                    </div>
                    <div class="url-edit grid-form ">
                        <label for="url">Url o IP: </label>
                        <input class="project-url" type="text" name="url" value="<?php echo $project['url']; ?>">
                    </div>
                    <div class="info-edit grid-form ">
                        <label for="info">Descripción: </label>
                        <input class="project-info" type="text" name="info" value="<?php echo $project['descripcion']; ?>">
                    </div>

                    <div class="img-preview mb-4">
                        <label class="" for="preview">Imagen: </label>
                    </div>
                    <div class="img-load text-center">
                        <img class="img-preview" src="../img/projects/<?php echo $project['portada']; ?>" alt="<?php echo $project['nombre']; ?>">
                        <input type="file" class="mt-5 form-control" id="input-img" name="img-project" />
                    </div>
                    <div class="submit-edit d-flex justify-content-between">
                        <div class="back">
                            <a class="btn btn-warning me-3 align-self-start" href="admin-area.php">Volver</a>
                        </div>
                        <div class="save-back">
                            <a class="btn btn-danger me-3 align-self-start delete-project" data-id="<?php echo $project['id']; ?>" href="admin-area.php">Eliminar</a>
                            <input class="btn btn-success update-submit" type="submit" value="Guardar">
                            <input type="hidden" name="edit" value="1">
                        </div>
                    </div>
                </div>

            </form>
</main>
<?php }
        $stmt->close();
        disconnect($conn);
    }
?>


<?php include_once('./layout/footer.php'); ?>