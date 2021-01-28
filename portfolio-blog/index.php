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
                <p>My name is Fran and I was born in 1988 in Vila-real, a large village from Spain. I'm married with the woman of my dreams and I have two beautyful children, and thank to them, I am then man who I am right now.</p>
                <p>After a few years working as an electromechanical in the ceramic industry. I was tired and sad because I didn't like my job and what I was doing at that time. I needed a change, and then I discovered web and app developing and afterwards in 2019 I made an important step into my life, I decided to start to learn more about developing at full time. I have to say that it was a very brave decision and I think it was the best decision I ever made for years. At this moment I'm studying web developing applications at Didáctica Ágil Centros Academy in Castellón, and my next steps are going to get more knowledge about Angular and Ionic, frameworks who I love. Apart from that, I've been doing a few extra courses and I want to improve my skill by learning new technologies.</p>
            </div>

        </section>

        <section class="separator container">
            <h2>Projects</h2>
        </section>

        <section class="container projects">

            <?php
            $conn = connect();
            if ($conn) {

                $query = "SELECT * FROM proyectos LIMIT 3";

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