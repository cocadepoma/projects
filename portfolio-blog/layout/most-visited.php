<?php
$conn = connect();
if ($conn) {

    $query = "SELECT id, urltitulo, titulo, portada, preview FROM articulos LIMIT 3";

    if ($result = $conn->query($query)) {
        while ($row = $result->fetch_assoc()) { ?>

            <article>
                <a class="aside-style" href="articulo.php?art=<?php echo $row['urltitulo']; ?>">
                    <h4><?php echo $row['titulo']; ?></h4>
                    <img src="./img/blog/<?php echo $row['portada']; ?>" alt="image-post">
                    <p><?php echo $row['preview']; ?></p>
                </a>
            </article>

<?php }
    }
    disconnect($conn);
}
?>