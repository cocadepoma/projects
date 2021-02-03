<?php
    include_once('./layout/header.php');
    include_once('./layout/separator.php');
    include_once('./layout/smedia-float.php');
?>

<div class="contact-wrapper">

        <main>
            <section class="container contact">

                <form action="#">

                    <div class="form-name">
                        <!-- <label for="name">Name:</label> -->
                        <input id="input-name" type="text">
                        <span class="focus-name"></span>
                        <span class="focus-text-name">Your name</span>
                    </div>

                    <div class="form-email">
                        <!-- <label for="email">Email:</label> -->
                        <input id="input-email" type="email">
                        <span class="focus-email"></span>
                        <span class="focus-text-email">Your email</span>
                    </div>
                    <div class="submit-wrapper">
                        <input class="btn btn-submit" type="submit" value="send">
                    </div>
                </form>
            </section>
        </main>
        <!-- main content -->

        <footer>
            <p class="name"> &copy; 2020 FRS. All rights reserved.</p>
        </footer>
        <!-- Footer -->
    </div>


    <a href="#" id="goTop"><i class="fas fa-arrow-circle-up"></i></a>
</body>

</html>