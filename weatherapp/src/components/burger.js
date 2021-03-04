import React from "react";
import "../styles/layout.scss";
import { NavLink } from "react-router-dom";

export default function Burger() {
    return (
        <div className="burger-wrapper">
            <div className="burger">
                <i
                    className="fas fa-bars"
                    onClick={() => {
                        document
                            .querySelector(".burger")
                            .classList.add("translate-transition", "translate-resp-burger");
                        document.querySelector(".resp-nav").classList.add("translate-resp-nav");
                        document.querySelector(".close").classList.add("translate-close");
                    }}
                ></i>
            </div>
            <div className="menu-responsive">
                <ul className="resp-nav navbar-nav me-auto mb-2 mb-lg-0">
                    <div>
                        <NavLink
                            className="resp-nav-link"
                            activeClassName="resp-nav-active"
                            to="/home"
                            onClick={() => {
                                document.querySelector(".resp-nav").classList.remove("translate-resp-nav");
                                document.querySelector(".burger").classList.remove("translate-resp-burger");
                                document.querySelector(".close").classList.remove("translate-close");
                            }}
                        >
                            Castellón
                        </NavLink>
                    </div>

                    <div>
                        <NavLink
                            className="resp-nav-link"
                            activeClassName="resp-nav-active"
                            to="/favourites"
                            onClick={() => {
                                document.querySelector(".resp-nav").classList.remove("translate-resp-nav");
                                document.querySelector(".burger").classList.remove("translate-resp-burger");
                                document.querySelector(".close").classList.remove("translate-close");
                            }}
                        >
                            Favoritos
                        </NavLink>
                    </div>

                    <div>
                        <NavLink
                            className="resp-nav-link"
                            activeClassName="resp-nav-active"
                            to="/contact"
                            onClick={() => {
                                document.querySelector(".resp-nav").classList.remove("translate-resp-nav");
                                document.querySelector(".burger").classList.remove("translate-resp-burger");
                                document.querySelector(".close").classList.remove("translate-close");
                            }}
                        >
                            Contacto
                        </NavLink>
                    </div>
                </ul>
            </div>
            <div
                className="close"
                onClick={() => {
                    document.querySelector(".resp-nav").classList.remove("translate-resp-nav");
                    document.querySelector(".burger").classList.remove("translate-resp-burger");
                    document.querySelector(".close").classList.remove("translate-close");
                }}
            >
                <i className="fas fa-times"></i>
            </div>
        </div>
    );
}
