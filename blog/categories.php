<?php
include_once('./layout/header.php');
include_once('./layout/smedia-float.php');
require_once('./database/connection.php');


if (isset($_GET['cat']) && strlen($_GET['cat']) > 0) {

    $category_name = $_GET['cat'];

    try {
        $conn = connect();
        $sql = "SELECT nombre_categoria FROM categorias WHERE nombre_categoria = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $category_name);
        $stmt->execute();
        $result = $stmt->get_result();

        if (!$conn->affected_rows) {
            header('location: blog.php');
        }

        $stmt->close();
        disconnect($conn);
    } catch (Exception $e) {
        header("location: blog.php?err=$err");
    }
}

include_once('./layout/separator.php');

?>





<main id="blog-container" class="container">

    <section id="articles">

        <?php
        $conn = connect();

        if ($conn) {

            $query = "SELECT * FROM articulos AS art INNER JOIN articulos_categorias AS acat ON art.id = acat.id_articulo INNER JOIN categorias AS cat ON acat.id_categoria = cat.id_categoria WHERE cat.nombre_categoria = ? ORDER BY fecha DESC";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $category_name);
            $stmt->execute();
            $result = $stmt->get_result();

            if (!$conn->affected_rows) {
                echo "<div class='no-categories'>";
                echo "<p>No se han encontrado artículos de <strong>$category_name</strong></p>";
                echo "<a href='blog.php'>Volver al Blog</a>";
                echo "</div>";
            }
            while ($row = $result->fetch_assoc()) {
                if ($row['publicado']) { ?>
                    <article class="blog-post">
                        <h3><?php echo $row['titulo']; ?></h3>
                        <div class="autor-date">
                            <p><?php echo $row['preview']; ?></p>

                            <p class="p-date">
                                <?php echo date('H:i a d-m-Y', strtotime($row['fecha'])); ?>

                                publicado por: <span class="bold"><?php echo $row['autor']; ?></span>
                            </p>
                        </div>
                        <div class="image-article">
                            <img src="./img/blog/<?php echo $row['portada']; ?>" alt="imagen noticia">
                        </div>
                        <div class="article-buttons">
                            <a class="btn btn-article" href="articulo.php?art=<?php echo $row['urltitulo']; ?>">Ver entrada</a>
                            <div class="clear-fix"></div>
                        </div>
                    </article>
        <?php }
            }
        } ?>


    </section>
    <!-- article end-->

    <aside>

        <?php
        echo "<h3>Categorías</h3>";
        include_once('./layout/badges-categories.php');
        echo "<h3>Artículos más vistos</h3>";
        include_once('./layout/most-visited.php');
        disconnect($conn);
        ?>

    </aside>
    <!-- aside end-->
</main>
<!-- main container end-->

<?php
include_once('./layout/clip.php');
include_once('./layout/footer.php');
?>