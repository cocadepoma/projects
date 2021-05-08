<?php
include_once('./layout/header.php');
include_once('./layout/separator.php');
include_once('./layout/smedia-float.php');
require_once('./database/connection.php');

?>

<main>
    <div id="index">
        <section class="container about-me">
            <div class="about-img">
                <img src="img/img-1.jpg" alt="frs">
            </div>
            <div class="me">
                <p>
                    Hi! My name is Fran, and I was born in 1988 in Vila-real, a large village from Spain.
                </p>
                <p>I set up my career as an Electromechanical Technician, and I had been working as it until August 2019, when I decided to start a new career as a Developer.</p>
                <p class="mt-1">My beginnings were as a Freelance doing projects for small companies, and also studying for a Certificate of Higher Education in Web Applications. In addition to studying a Certificate and working as a Freelance, I was learning on my own doing courses about new technologies on Udemy.</p>
                <p class="mt-1">My favourite technologies are React plus Redux, NodeJS, SASS, CSS and JavaScript frameworks/libraries like Angular, VueJS or jQuery. I also worked with Java, PHP, AJAX, Bootstrap, MySQL, MongoDB and Firebase.</p>
                <p class="mt-1">My next steps are improving my English, start a Bachelor Degree in Informatics Engineering and learn React Native in order to make mobile applications in the future.</p>
            </div>

        </section>

        <section class="separator container">
            <h2>Projects</h2>
        </section>

        <section class="container projects">

            <?php
            $conn = connect();
            if ($conn) {

                $query = "SELECT * FROM proyectos LIMIT 6";

                if ($result = $conn->query($query)) {
                    while ($row = $result->fetch_assoc()) {
                        if ($row['activo']) { ?>
                            <div class="tooltip">
                                <a href="<?php echo $row['url']; ?>" target="_blank" class="project">
                                    <img src="./img/projects/<?php echo $row['portada']; ?>" alt="<?php echo 'img-' . $row['nombre']; ?>">
                                    <span class="info-project"><?php echo $row['nombre']; ?></span>
                                </a>
                                <span class="tooltiptext"><?php echo $row['descripcion']; ?></span>
                            </div>
            <?php }
                    }
                }
            }
            ?>

        </section>

        <section class="separator container">
            <h2>most related posts</h2>
        </section>

        <section id="most-relateds" class="container">

            <div class="articles">
                <?php
                include_once('./layout/most-visited.php');
                disconnect($conn);
                ?>
            </div>

        </section>
    </div>

</main>
<!-- End Main Content -->

<?php
include_once('./layout/clip.php');
include_once('./layout/footer.php');
?>