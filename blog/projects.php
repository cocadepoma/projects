<?php
include_once('./layout/header.php');
include_once('./layout/separator.php');
include_once('./layout/smedia-float.php');
require_once('./database/connection.php');
?>

<main id="main-projects">

    <section class="container projects">

        <?php
        $conn = connect();
        if ($conn) {

            $query = "SELECT * FROM proyectos";

            if ($result = $conn->query($query)) {
                while ($row = $result->fetch_assoc()) {
                    if ($row['activo']) { ?>
                        <a href="<?php echo $row['url']; ?>" target="_blank" class="project">
                            <img src="./img/projects/<?php echo $row['portada']; ?>" alt="<?php echo 'img-' . $row['nombre']; ?>">
                            <span class="info-project"><?php echo $row['nombre']; ?></span>
                        </a>
        <?php }
                }
            }
            disconnect($conn);
        }
        ?>
    </section>

</main>
<!-- main content -->

<?php
include_once('./layout/clip.php');
include_once('./layout/footer.php');
?>