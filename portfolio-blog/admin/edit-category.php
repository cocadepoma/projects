<?php

include_once('./sessions/sessions.php');
include_once('../database/connection.php');
include_once('./layout/header.php');

?>


<?php include_once('./layout/navbar.php'); ?>

<?php
if (isset($_GET['cat']) && strlen($_GET['cat']) > 0 && intval($_GET['cat']) > 0) {

    try {

        $id_cat = intval($_GET['cat']);
        $conn = connect();
        $sql = "SELECT nombre_categoria FROM categorias WHERE id_categoria = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_cat);
        $stmt->execute();
        $result = $stmt->get_result();

        if (!$conn->affected_rows) {
            header('location: admin-area.php');
        }

        while ($category = $result->fetch_assoc()) { ?>

            <h2 class="margin-negative-20"><small>Editar Categoria</small> ID: <?php echo $id_cat; ?></h2>
            <main class="container dashboard margin-negative-5">
                <form action="./models/model-category.php" method="post" enctype="multipart/form-data" id="update-category">
                    <div class="edit-edit-wrapper dashboard">
                        <div class="id-edit grid-form ">
                            <label for="id">ID: </label>
                            <input type="text" name="id" disabled value="<?php echo $id_cat; ?>">
                            <input type="hidden" name="id" value="<?php echo $id_cat; ?>">
                        </div>
                        <div class="name-edit grid-form ">
                            <label for="name">Nombre: </label>
                            <input class="category-name" type="text" name="name" value="<?php echo $category['nombre_categoria']; ?>">
                        </div>
                        <div class="submit-edit d-flex justify-content-between">
                            <div class="back">
                                <a class="btn btn-warning me-3 align-self-start" href="admin-area.php">Volver</a>
                            </div>
                            <div class="save-back">
                                <a class="btn btn-danger me-3 align-self-start delete-category" data-id="<?php echo $id_cat; ?>" href="admin-area.php">Eliminar</a>
                                <input class="btn btn-success update-category-submit" type="submit" value="Guardar">
                                <input type="hidden" name="edit" value="1">
                            </div>
                        </div>
                    </div>
                </form>
            </main>
<?php       }
    } catch (Exception $e) {
        $err = $e->getMessage();
        header("location: admin-area.php?err=$err");
    }
} else {
    header('location: admin-area.php');
}

?>



<?php include_once('./layout/footer.php'); ?>