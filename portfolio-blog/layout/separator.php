<section class="separator container">

        <?php

        if ($page == 'index.php') {
                echo "<h2>ABOUT ME</h2>";
                echo "<h3>get to know more about me before you dive in my content</h3>";
        }
        if ($page == 'projects.php') {
                echo "<h2>projects</h2>";
        }
        if ($page == 'blog.php') {
                echo "<h2>blog</h2>";
        }
        if ($page == 'contact.php') {
                echo "<h2>contact</h2>";
        }
        if (isset($category_name) && $page == 'categories.php') {
                echo "<h2><small>Artículos de:</small> $category_name</h2>";
        }

        ?>

</section>
<!-- header-separator -->