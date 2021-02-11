import React, { Component } from "react";
import "../styles/layout.scss";
import { Link } from "react-router-dom";

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <p className="text-center text-white">Website made by FRS &copy; 2021</p>
                <Link className="text-center text-white d-block" to="/contact">
                    Contacto
                </Link>
            </footer>
        );
    }
}
