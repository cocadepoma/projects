$(document).ready(() => {
    $("#back-to-top").fadeOut();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            $("#back-to-top").fadeIn();
        } else {
            $("#back-to-top").fadeOut();
        }
    });
    // scroll body to 0px on click
    $("#back-to-top").click(function () {
        $("body,html").animate(
            {
                scrollTop: 0,
            },
            500
        );
        return false;
    });

    let sticky = $("nav").offset().top;
    let height = $("nav").outerHeight();
    $(window).resize(() => {
        height = $("nav").outerHeight();
    });
    $(window).scroll(() => {
        if ($(window).scrollTop() >= sticky) {
            $("nav").addClass("sticky");
            $(".sticky-cart").show();
            $("main").css("margin-top", height + 10 + "px");
        } else {
            $("nav").removeClass("sticky");
            $(".sticky-cart").hide();
            $("main").css("margin-top", "1rem");
            $(".form-search").show();
        }
    });

    //****************** MENU RESPONSIVE ******************//
    let menuLittle = $(".menu-little");
    let bgGrey = $(".bg-grey");

    $(".burg").click(() => {
        $(".burg").css("pointer-events", "none");

        menuLittle.addClass("move-menu");
        bgGrey.addClass("opct");

        if (menuLittle.hasClass("move-menu")) {
            $(document).mouseup((e) => {
                if (!$(e.target).closest(".menu-little").length) {
                    menuLittle.removeClass("move-menu");
                    bgGrey.removeClass("opct");
                    $(".burg").css("pointer-events", "unset");
                }
            });
        }
    });

    $(".arrow").click((e) => {
        e.preventDefault();
        menuLittle.removeClass("move-menu");
        bgGrey.removeClass("opct");
    });
    //*************** END MENU RESPONSIVE *****************//

    //********************* FIREBASE *********************//
    var db = firebase.firestore();
    const productos = [];

    db.collection("productos")
        .get()
        .then((query) => {
            query.forEach((doc) => {
                var objeto = {
                    id: doc.id,
                    nombre: doc.data().nombre,
                    descripcion: doc.data().descripcion,
                    precio_fake: doc.data().precio_fake,
                    precio: doc.data().precio,
                    img: doc.data().img,
                    categoria: doc.data().categoria,
                };
                productos.push(objeto);
            });
        })
        .then(() => {
            for (let i in productos) {
                var content = `
                  <div class='p-4 col-lg-4 col-md-6 col-sm-12'>
                      <div class='card'>
                          <img class='pointer' data-id='${productos[i].id}' src='${productos[i].img}' class='card-img-top' alt='${productos[i].nombre}' />

                          <div class='card-body'>
                          <h5 class='text-center card-title'>${productos[i].nombre}</h5>
                          <p class='text-justify card-text'>${productos[i].descripcion}</p>
                          </div>

                          <div class='price card-body row'>
                          <div class='high-price text-danger col-6'>
                              <p>${productos[i].precio_fake}€</p>
                          </div>
                          <div class='low-price text-warning col-6'>
                              <p>${productos[i].precio}€</p>
                          </div>
                          </div>

                          <div class='add card-footer text-center'>
                          <a href='#' id='agregar' data-price='${productos[i].precio}' data-name='${productos[i].nombre}' data-id='${productos[i].id}'><i class='fas fa-cart-plus'></i>Agregar al carrito</a>
                          </div>
                          
                      </div>
                  </div>
              
                `;

                if (productos[i].categoria == "top") {
                    $("#contenedor").append(content);
                } else if (productos[i].categoria == "ellas") {
                    $("#ellas").append(content);
                } else if (productos[i].categoria == "ellos") {
                    $("#ellos").append(content);
                }
            }
        })
        .then(() => {
            const add = document.querySelectorAll("#agregar");
            for (let i in add) {
                if (add[i].id == "agregar") {
                    add[i].addEventListener("click", (e) => {
                        e.preventDefault();
                        let name = e.target.dataset.name;
                        let price = e.target.dataset.price;
                        swal({
                            title: `${name}`,
                            text: `Ha sido añadido a tu cesta por ${price} € `,
                            icon: "success",
                        });

                        let itemID = e.target.dataset.id;
                        for (let i in productos) {
                            if (itemID == productos[i].id) {
                                let json = JSON.stringify(productos[i]);
                                localStorage.setItem(productos[i].id, json);
                            }
                        }
                    });
                }
            }
        });

    //******************* END FIREBASE ************************//

    //******************* CART ************************//

    let fileName = window.location.pathname;
    // IF User is in CART page
    if ((fileName = "/carrito.html")) {
        let itemsAdded = [];

        // GET Localstorage
        Object.keys(localStorage).forEach((i) => {
            itemsAdded.push(JSON.parse(localStorage[i]));
        });

        // Print items in HTML
        if (itemsAdded.length > 0) {
            $(".no-items").hide();
            let totalPrice = 0;
            for (let i = 0; i < itemsAdded.length; i++) {
                totalPrice += itemsAdded[i].precio;
                var content = `
                    <div class='item-wrapper'>
                        <div class='item-img'>
                            <img
                                src='${itemsAdded[i].img}'
                                alt='img-${itemsAdded[i].nombre}'
                            />
                        </div>
                        <div class='item-content'>
                            <h5>${itemsAdded[i].nombre}</h5>
                            <div class='info'>
                                <input type='number' placeholder='1' id='qtt' />
                                <span class='price'>${itemsAdded[i].precio} €</span>
                                <a id='eliminar' data-price='${itemsAdded[i].precio}' data-name='${itemsAdded[i].nombre}' data-id='${itemsAdded[i].id}' href='#'>
                                    <i class='close text-danger fas fa-times'></i>
                                </a>
                            </div>
                        </div>
                    </div>
                
                `;
                if (i === 0) {
                    $(".cart-items").empty();
                }

                $(".cart-items").append(content);

                // ADD TOTAL AMOUNT
                if (i == itemsAdded.length - 1) {
                    let totalDiv = `
                        <div class='total d-flex justify-content-end'>
                            <p>TOTAL: <span class='qtt-total'>${totalPrice} €</span></p>
                        </div>
                    `;

                    $(".cart-items").append(totalDiv);
                }
            }

            const remove = document.querySelectorAll("#eliminar");

            for (let i in remove) {
                if (remove[i].id == "eliminar") {
                    remove[i].addEventListener("click", (e) => {
                        e.preventDefault();
                        let name = e.currentTarget.dataset.name;
                        let id = e.currentTarget.dataset.id;
                        swal({
                            title: `Eliminar producto`,
                            text: `Vas a eliminar ${name}, estás seguro?`,
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        }).then((willDelete) => {
                            if (willDelete) {
                                localStorage.removeItem(id);
                                swal(
                                    `El producto ${name} se ha eliminado de la cesta`,
                                    {
                                        icon: "success",
                                    }
                                ).then(() => {
                                    location.reload();
                                });
                            } else {
                                swal("El producto no ha sido eliminado!");
                            }
                        });
                    });
                }
            }
        } else {
            $(".no-items").show();
        }
    }
    //******************* END CART ************************//
});
