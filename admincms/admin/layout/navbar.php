<nav class="navbar-dark bg-dark">
    <div class="d-flex justify-content-between">
        <div class="d-flex justify-content-evenly">
            <a class="nav-link text-orange" href="./admin-area.php">Dashboard</a>
            <ul class="navbar-nav">
                <li class="nav-item dropdown">

                    <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Menu
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                        <li><a class="dropdown-item" href="new-project.php">Nuevo Proyecto</a></li>
                        <li><a class="dropdown-item" href="new-category.php">Nueva Categoría</a></li>
                        <li><a class="dropdown-item" href="new-article.php">Nuevo Artículo</a></li>
                        <li><a class="dropdown-item" href="../index.php">ir a Blog</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="align-self-center">
            <span class="text-white"><?php echo "Bienvenido/a <strong>" . $_SESSION['user']; ?></strong></span>
            <a class="text-orange" href="login.php?close_session=true">Cerrar Sesión</a>
        </div>

    </div>
</nav>