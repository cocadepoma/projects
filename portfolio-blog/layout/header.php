<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Francisco Rodriguez WebPage</title>
    <script src="https://kit.fontawesome.com/4211956054.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/jquery.js"></script>
    <script src="js/main.js"></script>

</head>
<?php
$page = basename($_SERVER['PHP_SELF']);

if ($page  == 'projects.php' || $page == 'contact.php') {
    echo "<body class='extend'>";
} else {
    echo "<body>";
}

if ($page  == 'index.php') {
    echo "<header class='wallpapper'>";
} else {
    echo "<header>";
}
?>

<nav>
    <a href="index.php"><img class="frs" src="img/frs2.png" alt="logo"></a>

    <div class="burger-menu">
        <div class="burger">
            <div class="linea line-one"></div>
            <div class="linea line-two"></div>
            <div class="linea line-three"></div>
        </div>
    </div>


    <ul class="mobile-menu">
        <li>
            <a class="a-burguer <?php if ($page == 'index.php') echo "not-active"; ?>" href="index.php">about</a>
        </li>
        <li>
            <a class="a-burguer <?php if ($page == 'projects.php') echo "not-active"; ?>" href="projects.php">projects</a>
        </li>
        <li>
            <a class="a-burguer <?php if ($page == 'blog.php') echo "not-active"; ?>" href="blog.php">blog</a>
        </li>
        <li>
            <a class="a-burguer <?php if ($page == 'contact.php') echo "not-active"; ?>" href="contact.php">contact</a>
        </li>
        <?php
        if ($page != 'index.php') echo "<li><a class='a-burguer' href='./admin/login.php'><i class='fas fa-user'></i></a></li>";
        ?>
        <li>
            <a class="close-menu"><i class="fas fa-angle-up"></i></a>
        </li>
    </ul>


    <ul id="main-menu">
        <li>
            <a class="a-nav <?php if ($page == 'index.php') echo "not-active"; ?>" href="index.php">about</a>
        </li>
        <li>
            <a class="a-nav <?php if ($page == 'projects.php') echo "not-active"; ?>" href="projects.php">projects</a>
        </li>
        <li>
            <a class="a-nav <?php if ($page == 'blog.php') echo "not-active"; ?>" href="blog.php">blog</a>
        </li>
        <li>
            <a class="a-nav <?php if ($page == 'contact.php') echo "not-active"; ?>" href="contact.php">contact</a>
        </li>
        <?php
        if ($page != 'index.php') echo "<li><a class='a-burguer' href='./admin/login.php'><i class='fas fa-user'></i></a></li>";
        ?>
    </ul>

</nav>

<?php

if ($page  == 'index.php') {
    echo "<div class='filter'>";
    echo "<div class='about'>";
    echo "<h1>Francisco Rodríguez</h1>";
    echo "<h2>Web & App Developer</h2>";
    echo "</div>";
    echo "</div>";
}

?>

</header>
<!-- header end-->