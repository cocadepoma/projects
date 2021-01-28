<?php

try {

    $conn = connect();
    $query = "SELECT * FROM categorias";

    if ($result = $conn->query($query)) {
        echo "<article class='categories-wrapper'>";
        while ($row = $result->fetch_assoc()) { ?>

            <a title="<?php echo $row['nombre_categoria']; ?>" href="categories.php?cat=<?php echo $row['nombre_categoria']; ?>"><?php echo $row['nombre_categoria']; ?></a>

<?php   }
        echo "</article>";
    }
    disconnect($conn);
} catch (\Throwable $th) {
    //throw $th;
}
