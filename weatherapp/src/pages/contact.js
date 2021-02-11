import React, { useState } from "react";
import "../styles/contact.scss";
import swal from "@sweetalert/with-react";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            formData.name.length < 2 ||
            formData.email.length < 2 ||
            formData.phone.length < 2 ||
            formData.message.length < 2
        ) {
            return;
        }
        swal(
            <div>
                <h3>Tu Formulario</h3>
                <h5>
                    <strong>Nombre:</strong>
                    {formData.name}
                </h5>
                <h5>
                    <strong>Email:</strong>
                    {formData.name}
                </h5>
                <h5>
                    <strong>Teléfono:</strong>
                    {formData.name}
                </h5>
                <p>
                    <strong>Mensaje:</strong>
                    {formData.name}
                </p>
            </div>,
            {
                buttons: {
                    cancel: "Cancelar",
                    accept: "Enviar",
                },
            }
        );
    };
    return (
        <div className="container contact-wrapper">
            <h1>Contacto</h1>
            <form onSubmit={handleSubmit} className="contact-form" name="sentMessage" id="contactForm">
                <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                        <label>Nombre</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            id="name"
                            name="name"
                            required=""
                            data-validation-required-message="Please enter your name."
                            aria-invalid="false"
                        />
                        <p className="help-block text-danger"></p>
                    </div>
                </div>
                <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                        <label>Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            id="email"
                            name="email"
                            required=""
                            data-validation-required-message="Please enter your email address."
                            aria-invalid="false"
                        />
                        <p className="help-block text-danger"></p>
                    </div>
                </div>
                <div className="control-group">
                    <div className="form-group col-xs-12 floating-label-form-group controls">
                        <label>Teléfono</label>
                        <input
                            onChange={handleChange}
                            type="tel"
                            className="form-control"
                            placeholder="Teléfono"
                            id="phone"
                            name="phone"
                            required=""
                            data-validation-required-message="Please enter your phone number."
                            aria-invalid="false"
                        />
                        <p className="help-block text-danger"></p>
                    </div>
                </div>
                <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                        <label>Mensaje</label>
                        <textarea
                            onChange={handleChange}
                            rows="5"
                            className="form-control"
                            placeholder="Deja tu mensaje..."
                            id="message"
                            name="message"
                            required=""
                            data-validation-required-message="Please enter a message."
                            aria-invalid="false"
                        ></textarea>
                        <p className="help-block text-danger"></p>
                    </div>
                </div>

                <div id="success"></div>
                <button type="submit" className="btn btn-warning mt-5 float-right" id="sendMessageButton">
                    Enviar
                </button>
            </form>
        </div>
    );
};
export default Contact;
