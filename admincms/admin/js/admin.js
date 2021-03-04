"use strict";

$().ready(() => {
    // ################## LOGIN ################## //
    $("#login-admin").submit((e) => {
        e.preventDefault();

        let userError = false;
        let passError = false;
        let message = "";

        if (!checkUsername()) {
            //error user
            userError = true;
            message = "**The username must have 3 characters at least.";
            $(".username").addClass("border-red");
        }
        if (!checkPassword()) {
            //error pass
            passError = true;
            message += " The password input must have 4 characters at least.";
            $(".password").addClass("border-red");
        }

        // If an error occurred, show alert
        if (userError || passError) {
            $(".push-advert").text(message);
            $(".push-advert").addClass("appear");
            $(".submit").prop("disabled", true);
            setTimeout(() => {
                $(".push-advert").removeClass("appear");
                setTimeout(() => {
                    $(".submit").prop("disabled", false);
                }, 500);
            }, 4000);
        } else {
            let userName = $(".username").val();
            let userPass = $(".password").val();

            $.ajax({
                url: "./models/model-admin.php",
                type: "POST",
                dataType: "json",
                data: {
                    user: userName,
                    pwd: userPass,
                },
                success: function (data) {
                    if (data.respuesta == "success") {
                        Swal.fire({
                            icon: "success",
                            title: "Login correcto",
                            text: "Bienvenido/a " + data.user + " !!",
                            showClass: {
                                popup: "animate__animated animate__zoomInDown",
                            },
                            hideClass: {
                                popup: "animate__animated animate__fadeOut",
                            },
                            showConfirmButton: false,
                            timer: 2000,
                        }).then(() => {
                            setTimeout(() => {
                                window.location.href = "admin-area.php";
                            }, 500);
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Login error",
                            text: "User or password doesn't match!",
                            timer: 2000,
                        });
                    }
                },
                error: (e) => {
                    Swal.fire({
                        icon: "error",
                        title: "Login error",
                        text: "An error happened while login",
                        timer: 2000,
                    });
                },
            });
        }
        return false;
    });
    //remove error effect username input
    $(".username").keyup(() => {
        if (checkUsername()) {
            $(".username").removeClass("border-red");
        } else {
            $(".username").addClass("border-red");
        }
    });
    //remove error effect password input
    $(".password").keyup(() => {
        if (checkPassword()) {
            $(".password").removeClass("border-red");
        } else {
            $(".password").addClass("border-red");
        }
    });
    // ########################################## //

    //***********/ PROJECT CRUD /************/ //
    $("#update-project").submit((e) => {
        e.preventDefault();
        var datos = new FormData(document.getElementById("update-project"));

        let uploadOK = true;
        let message = "";

        if ($(".project-name").val().length < 3) {
            uploadOK = false;
            $(".project-name").addClass("border-red");
            message += "You must specify a project name. ";
        }
        if ($(".project-info").val().length < 5) {
            uploadOK = false;
            $(".project-info").addClass("border-red");
            message += "You must specify a description. ";
        }

        if (!uploadOK) {
            // If an error occurred, show alert
            $(".push-advert").text(message);
            $(".push-advert").addClass("appear");
            $(".update-submit").prop("disabled", true);
            setTimeout(() => {
                $(".push-advert").removeClass("appear");
                setTimeout(() => {
                    $(".update-submit").prop("disabled", false);
                }, 500);
            }, 4000);
        } else {
            $.ajax({
                url: "./models/model-project.php",
                data: datos,
                dataType: "json",
                type: "POST",
                contentType: false, //contentType*
                processData: false, //processData*
                async: true, //async*
                cache: false, //cache*
                success: (data) => {
                    if (data.respuesta == "exito" && data.hasOwnProperty("imagen") && data.proyecto.length > 0) {
                        Swal.fire({
                            icon: "success",
                            title: `Proyecto e Imagen Actualizadas`,
                            text: `Proyecto ID: ${data.proyecto} Actualizado!`,
                            imageUrl: `../img/projects/${data.imagen}`,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: "Custom image",
                            showConfirmButton: false,
                            timer: 2500,
                        }).then(() => {
                            window.location.href = "admin-area.php";
                        });
                    } else if (data.respuesta == "exito") {
                        Swal.fire({
                            icon: "success",
                            title: `Proyecto Actualizado correctamente`,
                            text: `Proyecto ID: ${data.proyecto} Actualizado!`,
                            showConfirmButton: false,
                            timer: 2500,
                        }).then(() => {
                            window.location.href = "admin-area.php";
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error al actualizar",
                            text: "Revisa los parámetros e inténtalo de nuevo más tarde",
                            showConfirmButton: true,
                        });
                    }
                },
                error: (err) => {
                    console.error(err);
                },
            });
        }

        return false;
    });

    $(".delete-project").click((e) => {
        e.preventDefault();
        let id = $(".delete-project").attr("data-id");

        Swal.fire({
            title: "Está seguro de eliminarlo?",
            text: "La acción será irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "./models/model-project.php",
                    data: {
                        id: id,
                        delete: 1,
                    },
                    dataType: "json",
                    type: "POST",
                    success: (resp) => {
                        if (resp.respuesta == "exito") {
                            let id = resp.id_eliminado;
                            Swal.fire({
                                title: "Eliminado!",
                                text: `El proyecto con ID ${id} ha sido borrado.`,
                                confirmButtonText: "Entendido",
                                icon: "success",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = "admin-area.php";
                                }
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error al eliminar",
                                text: "Inténtalo de nuevo más tarde",
                                showConfirmButton: true,
                            });
                        }
                    },
                    error: (err) => {
                        console.error(err);
                    },
                });
            }
        });
    });

    $("#create-project").submit((e) => {
        e.preventDefault();
        let datos = new FormData(document.getElementById("create-project"));

        let uploadOK = true;
        let message = "";

        if ($(".project-name").val().length < 3) {
            uploadOK = false;
            $(".project-name").addClass("border-red");
            message += "You must specify a project name. ";
        }
        if ($(".project-info").val().length < 5) {
            uploadOK = false;
            $(".project-info").addClass("border-red");
            message += "You must specify a description. ";
        }
        if ($(".project-file")[0].files.length == 0) {
            uploadOK = false;
            $(".project-file").addClass("border-red");
            message += "You must pick a picture.";
        }

        if (!uploadOK) {
            // If an error occurred, show alert
            $(".push-advert").text(message);
            $(".push-advert").addClass("appear");
            $(".create-submit").prop("disabled", true);
            setTimeout(() => {
                $(".push-advert").removeClass("appear");
                setTimeout(() => {
                    $(".create-submit").prop("disabled", false);
                }, 500);
            }, 4000);
        } else {
            $.ajax({
                type: "POST",
                url: "./models/model-project.php",
                dataType: "json",
                data: datos,
                contentType: false, //contentType*
                processData: false, //processData*
                async: true, //async*
                cache: false, //cache*
                success: (resp) => {
                    if (resp.respuesta == "exito") {
                        Swal.fire({
                            icon: "success",
                            title: "Proyecto creado!",
                            text: `Ha sido creado con el ID: ${resp.id_proyecto}`,
                            imageUrl: `../img/projects/${resp.imagen}`,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: "Custom image",
                            showConfirmButton: false,
                            timer: 2500,
                        }).then(() => {
                            window.location.href = "admin-area.php";
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error al crear",
                            text: "Revisa los parámetros e inténtalo de nuevo más tarde",
                            showConfirmButton: true,
                        });
                    }
                },
                error: (err) => {
                    console.error(err);
                },
            });
        }
        return false;
    });

    // PROJECT EVENTLISTENERS //
    $(".project-name").keyup(() => {
        if ($(".project-name").val().length >= 3) {
            $(".project-name").removeClass("border-red");
        } else {
            $(".project-name").addClass("border-red");
        }
    });
    $(".project-info").keyup(() => {
        if ($(".project-info").val().length >= 5) {
            $(".project-info").removeClass("border-red");
        } else {
            $(".project-info").addClass("border-red");
        }
    });
    $(".project-file").click(() => {
        $(".project-file").removeClass("border-red");
    });
    //****************************************/

    //***********/ CATEGORY CRUD /************ //
    $("#update-category").submit((e) => {
        e.preventDefault();
        let form = $("#update-category").serialize();
        let categoryNameInput = $(".category-name");
        let message = "";
        let updateOK = true;

        if (categoryNameInput.val().length < 5) {
            categoryNameInput.addClass("border-red");
            message = "You must specify a category with 5 characters at least";
            updateOK = false;
        }
        if (!updateOK) {
            $(".push-advert").text(message);
            $(".push-advert").addClass("appear");
            $(".update-category-submit").prop("disabled", true);
            setTimeout(() => {
                $(".push-advert").removeClass("appear");
                setTimeout(() => {
                    $(".update-category-submit").prop("disabled", false);
                }, 500);
            }, 4000);
        } else {
            $.ajax({
                type: "POST",
                url: "./models/model-category.php",
                dataType: "json",
                data: form,
                success: (resp) => {
                    if (resp.respuesta == "exito") {
                        Swal.fire({
                            icon: "success",
                            title: `Categoría ID:${resp.id_cat} actualizada`,
                            text: `Ahora la categoría se llama ${resp.name_cat}!`,
                            timer: 2500,
                            heightAuto: false,
                        }).then(() => {
                            window.location.href = "admin-area.php";
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error al actualizar",
                            text: "Revisa los parámetros e inténtalo de nuevo más tarde",
                            showConfirmButton: true,
                            heightAuto: false,
                        });
                    }
                },
                error: (err) => {
                    console.error(err);
                },
            });
        }
        return false;
    });

    $(".delete-category").click((e) => {
        e.preventDefault();
        let cat_id = $(".delete-category").attr("data-id");

        Swal.fire({
            title: "Está seguro de eliminarla?",
            text: "La acción será irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            heightAuto: false,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "./models/model-category.php",
                    data: {
                        id: cat_id,
                        delete: 1,
                    },
                    success: (resp) => {
                        if (resp.respuesta == "exito") {
                            Swal.fire({
                                icon: "success",
                                title: `Categoría eliminada`,
                                text: `Se ha eliminado la categoría ID: ${resp.id_eliminado}`,
                                timer: 2500,
                                heightAuto: false,
                            }).then(() => {
                                window.location.href = "admin-area.php";
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error al borrar",
                                text: "Error:" + resp.error,
                                showConfirmButton: true,
                                heightAuto: false,
                            });
                        }
                    },
                    error: (err) => {
                        console.error(err);
                    },
                });
            }
        });

        return false;
    });

    $("#create-category").submit((e) => {
        e.preventDefault();

        let form = $("#create-category").serialize();
        let categoryNameInput = $(".category-name");
        let message = "";
        let updateOK = true;

        if (categoryNameInput.val().length < 5) {
            categoryNameInput.addClass("border-red");
            message = "You must specify a category with 5 characters at least";
            updateOK = false;
        }
        if (!updateOK) {
            $(".push-advert").text(message);
            $(".push-advert").addClass("appear");
            $(".update-category-submit").prop("disabled", true);
            setTimeout(() => {
                $(".push-advert").removeClass("appear");
                setTimeout(() => {
                    $(".update-category-submit").prop("disabled", false);
                }, 500);
            }, 4000);
        } else {
            $.ajax({
                type: "post",
                dataType: "json",
                url: "./models/model-category.php",
                data: form,
                success: (resp) => {
                    if (resp.respuesta == "exito") {
                        Swal.fire({
                            icon: "success",
                            title: `Categoría ${resp.name_cat} creada!`,
                            text: `Se le ha asignado el ID: ${resp.id_cat}.`,
                            timer: 2500,
                            heightAuto: false,
                        }).then(() => {
                            window.location.href = "admin-area.php";
                        });
                    } else if (resp.exist == true) {
                        Swal.fire({
                            icon: "error",
                            title: "Error al crear",
                            text: "Esa categoría ya existe, prueba con otra",
                            showConfirmButton: true,
                            heightAuto: false,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error al crear",
                            text: "Revisa los parámetros introducidos",
                            showConfirmButton: true,
                            heightAuto: false,
                        });
                    }
                },
                error: (err) => {
                    console.error(err);
                },
            });
        }

        return false;
    });
    // CATEGORY EVENTLISTENERS //
    $(".category-name").keyup(() => {
        if ($(".category-name").val().length >= 5) {
            $(".category-name").removeClass("border-red");
        } else {
            $(".category-name").addClass("border-red");
        }
    });
    //****************************************/

    //***********/ ARTICLES CRUD /************ //
    $("#create-article , #update-article").submit((e) => {
        // Check form
        e.preventDefault();

        let page = getPageName(window.location.pathname);

        let articleUrl = $(".article-url");
        let articleTitle = $(".article-title");
        let articleAuthor = $(".article-author");
        let articleDate = $(".article-date");
        let categories = [];
        let listChild = $(".multiselect li");
        let articlePreview = $(".article-preview");
        let articleImg = $("#input-img");
        let articleImgFoot = $(".portada-footer");
        let articleContent = $(".article-content");
        let uploadOk = true;

        let text = cleanText(articleTitle.val());
        articleUrl.val(text);
        $(".article-url-hidden").val(text);

        if (checkLength(articleTitle.val(), 5)) {
            uploadOk = false;
            articleTitle.addClass("border-red");
        }
        if (checkLength(articleAuthor.val(), 3)) {
            uploadOk = false;
            articleAuthor.addClass("border-red");
        }

        let d = new Date(articleDate.val());
        if (!d.isValid()) {
            uploadOk = false;
            articleDate.addClass("border-red");
        }
        if (checkLength(articlePreview.val(), 5)) {
            uploadOk = false;
            articlePreview.addClass("border-red");
        }
        if (page == "new-article" && articleImg[0].files.length == 0) {
            uploadOk = false;
            articleImg.addClass("border-red");
        }
        if (checkLength(articleImgFoot.val(), 5)) {
            uploadOk = false;
            articleImgFoot.addClass("border-red");
        }
        if (checkLength(articleContent.val(), 10)) {
            articleContent.addClass("border-red");
        }
        listChild.each((id, li) => {
            if (li.className == "done") {
                categories.push(li.attributes[0].nodeValue);
            }
        });

        if (!uploadOk) {
            $(".push-advert").text("Check inputs in red, and fill them correctly");
            $(".push-advert").addClass("appear");
            $(".update-category-submit").prop("disabled", true);
            setTimeout(() => {
                $(".push-advert").removeClass("appear");
                setTimeout(() => {
                    $(".update-category-submit").prop("disabled", false);
                }, 500);
            }, 4000);
        } else {
            var datos;
            if (page == "new-article") {
                datos = new FormData(document.getElementById("create-article"));
            } else {
                datos = new FormData(document.getElementById("update-article"));
            }
            if (categories.length > 0) {
                datos.append("categories", categories);
            }

            $.ajax({
                type: "POST",
                url: "./models/model-article.php",
                dataType: "json",
                data: datos,
                contentType: false, //contentType*
                processData: false, //processData*
                async: true, //async*
                cache: false, //cache*
                success: (resp) => {
                    var opcion = "crear";
                    if (resp.update == "error") {
                        var opcion = "actualizar";
                    }
                    if (resp.respuesta == "exito") {
                        Swal.fire({
                            icon: "success",
                            title: "Artículo creado!",
                            text: `Ha sido creado con el ID: ${resp.id_articulo}`,
                            imageUrl: `../img/blog/${resp.imagen}`,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: "Custom image",
                            showConfirmButton: false,
                            timer: 2500,
                        }).then(() => {
                            window.location.href = "admin-area.php";
                        });
                    } else if (resp.update == "exito" && "imagen" in resp) {
                        Swal.fire({
                            icon: "success",
                            title: "Artículo actualizado!",
                            text: `Artículo ID: ${resp.id_articulo} actualizado correctamente`,
                            imageUrl: `../img/blog/${resp.imagen}`,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: "Custom image",
                            showConfirmButton: false,
                            timer: 2500,
                        }).then(() => {
                            window.location.href = "admin-area.php";
                        });
                    } else if (resp.update == "exito") {
                        Swal.fire({
                            icon: "success",
                            title: "Artículo actualizado!",
                            text: `Artículo ID: ${resp.id_articulo} actualizado correctamente`,
                            showConfirmButton: false,
                            timer: 2500,
                        }).then(() => {
                            window.location.href = "admin-area.php";
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: `Error al ${opcion}`,
                            text: "Revisa los parámetros e inténtalo de nuevo más tarde",
                            showConfirmButton: true,
                        });
                    }
                },
                error: (err) => {
                    console.error(err);
                },
            });
        }

        return false;
    });

    $(".delete-article").click((e) => {
        e.preventDefault();

        let error = false;
        // Change style of categories li* by click
        let list = $(".multiselect li");

        $.each(list, (i, li) => {
            if (li.className == "done") {
                error = true;
            }
        });

        let id = $(".delete-article").attr("data-id");

        if (!error) {
            Swal.fire({
                title: "Está seguro de eliminar el artículo?",
                text: "La acción es irreversible",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar",
                heightAuto: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        url: "./models/model-article.php",
                        data: {
                            id: id,
                            delete: 1,
                        },
                        success: (resp) => {
                            if (resp.respuesta == "exito") {
                                Swal.fire({
                                    icon: "success",
                                    title: `Artículo eliminado`,
                                    text: `Se ha eliminado correctamente`,
                                    timer: 2500,
                                    heightAuto: false,
                                }).then(() => {
                                    window.location.href = "admin-area.php";
                                });
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error al borrar",
                                    text: "Error:" + resp.error,
                                    showConfirmButton: true,
                                    heightAuto: false,
                                });
                            }
                        },
                        error: (err) => {
                            console.error(err);
                        },
                    });
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Debes primero guardar el artículo sin categorías",
                text: "Error, el articulo no puede tener categorías",
                showConfirmButton: true,
                heightAuto: false,
            });
        }

        return false;
    });

    // copy input title to url-title
    let articleUrl = $(".article-url");
    let articleTitle = $(".article-title");
    articleTitle.keyup((e) => {
        let text = cleanText(articleTitle.val());
        articleUrl.val(text);
    });

    // use only in articles pages
    let page = getPageName(window.location.pathname);

    if (page == "new-article" || page == "edit-article") {
        let btnStrong2 = document.querySelector(".strong-control-2");
        let previewArea = document.querySelector(".article-preview");

        let contentArea = document.querySelector(".article-content");
        let btnImg = document.querySelector(".img-control");
        let btnP = document.querySelector(".p-control");
        let btnH3 = document.querySelector(".h3-control");
        let btnStrong = document.querySelector(".strong-control");
        let btnA = document.querySelector(".a-control");

        // Add strong html label
        btnStrong2.addEventListener("click", (e) => {
            e.preventDefault();
            previewArea.value += "<strong>******</strong>";
            return false;
        });
        // Add img html label
        btnImg.addEventListener("click", (e) => {
            e.preventDefault();
            contentArea.value +=
                '\n<div class="article-img">\n     <img src="img/blog/NOMBRE-IMAGEN" alt="image-article" />\n     <span class="foot">AGREGAR FOOTER PARA IMAGEN</span>\n</div>';
            return false;
        });
        // Add p html label
        btnP.addEventListener("click", (e) => {
            e.preventDefault();
            contentArea.value += "\n<p>\n     Introduce texto\n</p>";
            return false;
        });
        // Add h3 html label
        btnH3.addEventListener("click", (e) => {
            e.preventDefault();
            contentArea.value += "\n<h3>\n     Introduce texto\n</h3>";

            return false;
        });
        // Add strong html label
        btnStrong.addEventListener("click", (e) => {
            e.preventDefault();
            contentArea.value += "<strong>******</strong>";
            return false;
        });
        // Add a html label
        btnA.addEventListener("click", (e) => {
            e.preventDefault();
            contentArea.value += "<a href='#' target='_blank'>******</a>";
            return false;
        });

        // Change style of categories li* by click
        let list = $(".multiselect");

        list.click((categ) => {
            if (categ.target.tagName === "LI") {
                categ.target.classList.toggle("done");
            }
        });
    }

    // Articles EventListeners
    $(".article-title").keyup(() => {
        if ($(".article-title").val().length >= 5) {
            $(".article-title").removeClass("border-red");
        } else {
            $(".article-title").addClass("border-red");
        }
    });
    $(".article-author").keyup(() => {
        if ($(".article-author").val().length >= 3) {
            $(".article-author").removeClass("border-red");
        } else {
            $(".article-author").addClass("border-red");
        }
    });
    $(".article-date").click(() => {
        $(".article-date").removeClass("border-red");
    });
    $(".article-preview").keyup(() => {
        if ($(".article-preview").val().length >= 10) {
            $(".article-preview").removeClass("border-red");
        } else {
            $(".article-preview").addClass("border-red");
        }
    });
    $("#input-img").click(() => {
        $("#input-img").removeClass("border-red");
    });

    $(".portada-footer").keyup(() => {
        if ($(".portada-footer").val().length >= 5) {
            $(".portada-footer").removeClass("border-red");
        } else {
            $(".portada-footer").addClass("border-red");
        }
    });
    $(".article-content").keyup(() => {
        if ($(".article-content").val().length >= 10) {
            $(".article-content").removeClass("border-red");
        } else {
            $(".article-content").addClass("border-red");
        }
    });

    //****************************************//

    //******************/ UTILITIES /**********************//

    // IMAGE LOADING REFRESH
    $("#input-img").change((e) => {
        //readUrl(this);
        let validExtensions = ["image/jpeg", "image/gif", "image/png"];
        let tipo = $("#input-img")[0].files[0].type;

        let output = $(".img-preview");

        if ($.inArray(tipo, validExtensions) < 0) {
            return;
        }
        $(".img-preview").css("max-height", "60px");
        $(".img-preview").attr("src", "../img/loading.gif");
        $(".img-preview").css("max-height", "unset");

        setTimeout(() => {
            $(".img-preview").attr("src", URL.createObjectURL(e.target.files[0]));
            output.onload = function () {
                URL.revokeObjectURL(output.src);
            };
        }, 1000);
    });

    function getPageName(url) {
        var index = url.lastIndexOf("/") + 1;
        var filenameWithExtension = url.substr(index);
        var filename = filenameWithExtension.split(".")[0]; // <-- added this line
        return filename; // <-- added this line
    }

    function cleanText(string) {
        var specialChars = "!@#$^&%*()'`~+_=[]/{}|:;<>¿?,.\\";
        // remove accent letters
        let str = string.split(" ").join("-");
        str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        // remove special chars

        for (var i = 0; i < specialChars.length; i++) {
            str = str.replace(new RegExp("\\" + specialChars[i], "gi"), "");
        }

        return str.toLowerCase();
    }

    function checkLength(str, length) {
        if (str.length < length) {
            return true;
        } else {
            return false;
        }
    }

    // Check if valid date
    Date.prototype.isValid = function () {
        return this.getTime() === this.getTime();
    };

    // length >=3 && ONLY letters
    function checkUsername() {
        let letters = /^[0-9a-zA-Z]+$/;
        let user = $(".username").val();
        if (user.length >= 3 && user != "" && user != undefined && user.indexOf(" ") != 0 && user.match(letters)) {
            return true;
        } else {
            return false;
        }
    }
    // length >=4
    function checkPassword() {
        let pass = $(".password").val();
        if (pass.length >= 4 && pass != "" && pass != undefined) {
            return true;
        } else {
            return false;
        }
    }
});
