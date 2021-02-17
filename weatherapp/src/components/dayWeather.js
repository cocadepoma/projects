import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/dayWeather.scss";
import Slider from "./slider";
import swal from "@sweetalert/with-react";

const DayWeather = (props) => {
    const [state, setState] = useState({
        date: props.weather1.ts,
        city: props.weather1.city_name,
        temp: props.weather1.temp,
        sunrise: props.weather1.sunrise,
        sunset: props.weather1.sunset,
        press: props.weather1.pres,
        description: props.weather1.weather.description,
        icon: props.weather1.weather.icon + ".png",
        clouds: props.weather1.clouds,
        max_temp: props.weather2.max_temp,
        min_temp: props.weather2.min_temp,
        pop: props.weather2.pop,
        uv: props.weather2.uv,
        wind: props.weather1.wind_spd,
        ozone: props.weather2.ozone,
        humidity: props.weather1.rh,
        visibility: props.weather1.vis,
        slides: [],
    });
    const history = useHistory();

    useEffect(() => {
        try {
            (async () => {
                const sunrise = new Date(props.weather2.sunrise_ts * 1000);
                const sunset = new Date(props.weather2.sunset_ts * 1000);
                setState({ ...state, sunrise: sunrise.toLocaleTimeString(), sunset: sunset.toLocaleTimeString() });

                const url = `http://api.weatherbit.io/v2.0/forecast/hourly?key=823f8f6bf93d4a399588a8cfe6aad42c&lang=es&city=${props.city}`;
                const data = await fetch(url).then((response) => response.json());

                let newdata = [];
                for (const i in data.data) {
                    const date = new Date(data.data[i].ts * 1000);
                    let temp = {
                        id: i,
                        time: date.toLocaleTimeString([], { timeStyle: "short" }),
                        temp: Math.round(data.data[i].temp),
                        icon: data.data[i].weather.icon,
                    };
                    newdata.push(temp);
                }
                setState({ ...state, slides: <Slider newdata={newdata} /> });
            })();
        } catch (err) {
            console.log(err);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="weather-container">
            <h1>El tiempo hoy en:</h1>
            <div className="weather-wrapper animate__animated animate__fadeIn animate__faster">
                <h3
                    className="text-center"
                    onClick={() => {
                        history.push(`/week/${state.city}`);
                    }}
                >
                    {state.city}, {new Date(props.weather1.ts * 1000).toLocaleDateString()}
                </h3>
                <div className="header-weather">
                    <div className="timegif">
                        <img src={process.env.PUBLIC_URL + `/icons/${state.icon}`} alt="icon-time" />
                        <p className="text-center mt-2">{state.description}</p>
                    </div>
                    <div className="temperature">
                        <h2>{Math.round(state.temp)} °C</h2>
                    </div>
                </div>
                <div className="d">{state.slides}</div>
                <div className="body-weather">
                    <p className="text-muted ps-2">Detalles del tiempo:</p>
                    <div className="body-weather-wrapper">
                        <div className="body-weather-left">
                            <p className="grid-details mb-2">
                                <img
                                    className="ms-2 icon-temp"
                                    src={process.env.PUBLIC_URL + `/icons/max.png`}
                                    alt="icon-max"
                                />
                                <span>{Math.round(state.max_temp)} °C</span>
                            </p>
                            <p className="grid-details mb-2">
                                <img
                                    className="ms-2 icon-temp"
                                    src={process.env.PUBLIC_URL + `/icons/min.png`}
                                    alt="icon-max"
                                />
                                <span>{Math.round(state.min_temp)} °C</span>
                            </p>
                            <p className="grid-details mb-2">
                                <img
                                    className="icon"
                                    src={process.env.PUBLIC_URL + `/icons/sunrise.png`}
                                    alt="icon-max"
                                />
                                <span>{state.sunrise}</span>
                            </p>
                            <p className="grid-details mb-2">
                                <img
                                    className="icon"
                                    src={process.env.PUBLIC_URL + `/icons/sunset.png`}
                                    alt="icon-min"
                                />
                                <span>{state.sunset}</span>
                            </p>
                            <p className="grid-details mb-2">
                                <img className="icon" src={process.env.PUBLIC_URL + `/icons/pop.png`} alt="icon-min" />
                                <span>{state.pop} %</span>
                            </p>
                            <p className="grid-details mb-2">
                                <img
                                    className="icon"
                                    src={process.env.PUBLIC_URL + `/icons/humidity.png`}
                                    alt="icon-min"
                                />
                                <span>Humedad: {state.humidity} %</span>
                            </p>
                        </div>
                        <div className="body-weather-right">
                            <p className="grid-details mb-2">
                                <img className="icon" src={process.env.PUBLIC_URL + `/icons/uv.ico`} alt="icon-min" />
                                <span>Índice UV: {Math.round(state.uv)}</span>
                            </p>
                            <p className="grid-details mb-2">
                                <img
                                    className="icon"
                                    src={process.env.PUBLIC_URL + `/icons/cloud.ico`}
                                    alt="icon-min"
                                />
                                <span>Nubosidad: {Math.round(state.clouds)} %</span>
                            </p>
                            <p className="grid-details mb-2">
                                <img
                                    className="icon"
                                    src={process.env.PUBLIC_URL + `/icons/press.png`}
                                    alt="icon-min"
                                />
                                <span>Presión Atmosférica: {Math.round(state.press)} mb</span>
                            </p>
                            <p className="grid-details mb-2">
                                <img className="icon" src={process.env.PUBLIC_URL + `/icons/wind.ico`} alt="icon-min" />
                                <span>Viento: {Math.round(state.wind * 3.6)} km/h</span>
                            </p>
                            <p className="grid-details mb-2">
                                <img className="icon" src={process.env.PUBLIC_URL + `/icons/o3.png`} alt="icon-min" />
                                <span>Ozono: {Math.round(state.ozone)} DU</span>
                            </p>
                            <p className="grid-details mb-2">
                                <img className="icon" src={process.env.PUBLIC_URL + `/icons/visi.png`} alt="icon-min" />
                                <span>Visibilidad: {state.visibility} km</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="footer-weather d-flex justify-content-between align-items-center">
                    <p className="last-update m-0">
                        Última Actualización: {new Date(props.weather1.ts * 1000).toLocaleTimeString()}{" "}
                    </p>
                    <button
                        onClick={() => {
                            localStorage.setItem(state.city, JSON.stringify(state.city));
                            swal({
                                title: "Ciudad agregada con éxito!",
                                text: "Ahora la tendrás en favoritos",
                                icon: "success",
                                timer: 1800,
                            });
                        }}
                        type="button"
                        className="btn btn-success btn-circle"
                    >
                        <i className="far fa-save"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DayWeather;
