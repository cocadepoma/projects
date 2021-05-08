<?php
$page = basename($_SERVER['PHP_SELF']);
$metas =   "<meta name='author' content='Francisco Rodriguez' />
            <meta name='copyright' content='FRS' />
            <meta name='keywords' content='developer, angular, ionic, html, css, acuarios' />
            <meta name='description' content='My name is Fran, and I am a web developer mainly working on React, Redux, NodeJS and Angular' />";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-DVX5ZMZDLY"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-DVX5ZMZDLY');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <? echo $page  == 'index.php' ?  $metas : "" ; ?>
    <meta name="author" content="Francisco Rodriguez" />
    <meta name="copyright" content="FRS" />
    <meta name="keywords" content="developer, angular, ionic, html, css, acuarios" />
    <link rel="shortcut icon" type="image/jpg" href="img/favicon.ico" />
    <title>Francisco Rodriguez WebPage</title>
    <script src="https://kit.fontawesome.com/4211956054.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/jquery.js"></script>
    <script src="js/main.js"></script>

</head>
<?php
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
