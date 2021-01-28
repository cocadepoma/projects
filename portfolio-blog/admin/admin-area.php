<?php

include_once('./sessions/sessions.php');
include_once('../database/connection.php');
include_once('./layout/header.php');
include_once('./layout/navbar.php');

?>


<main class="container dashboard">
    <div class="row">
        <div class="col-md-8">
            <div class="projects-dashboard-wrapper">
                <h2 class="text-center mt-5">Proyectos</h2>
                <div class="only-projects-dashboard-wrapper d-flex flex-column align-items-center">
                    <?php
                    $conn = connect();
                    $sql = "SELECT id, nombre, portada, descripcion, activo FROM proyectos";

                    if ($result = $conn->query($sql)) {
                        while ($row = $result->fetch_assoc()) { ?>

                            <a href="edit-project.php?project=<?php echo $row['id']; ?>" class="card single-project-wrapper p-0">
                                <div class="single-project-row p-1 p-md-2">
                                    <div class="col-md-6">
                                        <img src="../img/projects/<?php echo $row['portada']; ?>" class="card-img" alt="<?php echo $row['nombre'] ?>">
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card-body">
                                            <h4 class="card-title"><?php echo $row['nombre'] ?></h4>
                                            <p class="card-text"><small class=""><strong>ID: </strong> <?php echo $row['id'] ?></small></p>
                                            <p class="card-text"><small class=""><strong>Activo: </strong> <?php echo ($row['activo']) ? "Si" : "No"; ?></small></p>
                                            <p class="card-text"><?php echo $row['descripcion'] ?></p>
                                        </div>
                                    </div>
                                </div>
                            </a>

                    <?php }
                    }
                    ?>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="admin-categories-wrapper">
                <h2 class="text-center mt-5">Categorías</h2>

                <ul class="list-group category-list">
                    <?php
                    $sql = "SELECT id_categoria, nombre_categoria FROM categorias";

                    if ($result = $conn->query($sql)) {
                        while ($row = $result->fetch_assoc()) {
                            echo "<a href='edit-category.php?cat=" . $row['id_categoria'] . "' class='cat-link'>";
                            echo "<li class='list-group-item'>";
                            echo "<span><strong>ID</strong>: " . $row['id_categoria'] . " </span>";
                            echo "<span><strong>Nombre</strong>: " . $row['nombre_categoria'] . "</span>";
                            echo "</li>";
                            echo "</a>";
                        }
                    }

                    ?>
                </ul>
            </div>
        </div>
    </div>
    <div class="admin-articles-wrapper">
        <h2 class="text-center mt-5">Artículos</h2>
        <div class="card-group mt-4 mb-5 d-flex flex-wrap">

            <?php
            $sql = "SELECT id, titulo, urltitulo, portada, publicado, fecha FROM articulos";

            if ($result = $conn->query($sql)) {
                while ($row = $result->fetch_assoc()) { ?>
                    <a href="edit-article.php?art=<?php echo $row['urltitulo']; ?>" class="card card-article">
                        <img class="card-img-top" src="../img/blog/<?php echo $row['portada'] ?>" alt="<?php echo $row['titulo']; ?>">
                        <div class="card-body card-article-body">
                            <h5 class="card-title title"><?php echo $row['titulo']; ?></h5>
                            <p class="card-text"><strong>ID</strong>: <?php echo $row['id']; ?></p>
                            <p class="card-text"><strong>Activo</strong>: <?php echo ($row['publicado']) ? "Si" : "No"; ?></p>
                        </div>
                        <div class="card-footer">
                            <p><strong>Fecha</strong>: <?php echo $row['fecha']; ?></p class="small">
                        </div>
                    </a>
            <?php }
            }
            disconnect($conn);

            ?>
        </div>
    </div>
</main>

<?php include_once('./layout/footer.php'); ?>