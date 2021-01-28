<?php
include_once('./layout/header.php');
include_once('./layout/smedia-float.php');
require_once('./database/connection.php');
?>

<?php
$conn = connect();
if ($conn) {
    if (isset($_GET['art']) && $_GET['art'] != null) {

        if (!empty($_GET['art'])) {

            $title = $_GET['art'];

            // Create query
            $query = "SELECT titulo, publicado FROM articulos WHERE urltitulo = ? LIMIT 1";
            // Create Statement
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $title);
            // Execute Statement
            $stmt->execute();
            // Save results
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {

                while ($row = $result->fetch_assoc()) { ?>

                    <section class="separator container">
                        <h2><?php echo $row['titulo']; ?></h2>
                    </section>
                    <!-- header-separator -->

<?php }
            } else {
                header('Location: http://3.88.13.48/blog.php');
            }

            // Close Statement
            $stmt->close();
        } else {
            header('Location: http://3.88.13.48/blog.php');
        }
    }
}
?>

<main class="container">
    <div class="article-blog">
        <?php
        if ($conn) {

            $query = "SELECT autor, fecha, contenido, portada, portada_footer FROM articulos WHERE urltitulo = ?";

            // Create Statement
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $title);
            // Execute Statement
            $stmt->execute();
            // Save results
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {

                while ($row = $result->fetch_assoc()) { ?>

                    <section id="single-article">
                        <div class="article-img">
                            <img src="./img/blog/<?php echo $row['portada']; ?>" alt="image-sidebar" />
                            <span class="foot"><?php echo $row['portada_footer']; ?></span>
                        </div>
                        <?php echo $row['contenido']; ?>

            <?php
                }
            } else {

                header('Location: http://3.88.13.48/blog.php');
            }
        }
            ?>
            <div class="single-article-buttons">
                <a href="blog.php" class="btn btn-return a-first"><i class="fas fa-angle-double-left"></i> Volver atrás</a>
                <a href="#" class="btn btn-article a-second"><i class="fas fa-share-alt"></i> Compartir</a>
                <a href="#" class="btn btn-article a-third"><i class="fas fa-comment"></i> Comentar</a>
            </div>
            <div class="clear-fix"></div>
                    </section>



                    <div id="most-relateds">
                        <h3>Artículos más vistos</h3>
                        <div class="articles">

                            <?php
                            include_once('./layout/most-visited.php');
                            // Close DB Connection
                            $stmt->close();
                            disconnect($conn);
                            ?>

                        </div>
                    </div>

    </div>
</main>

<?php
include_once('./layout/clip.php');
include_once('./layout/footer.php');
?>