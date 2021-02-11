import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import Loading from "../components/loading";
import "../styles/week.scss";

const Week = () => {
    const history = useHistory();

    const [data, setData] = useState({ data: [], name: "", loading: true });

    useEffect(() => {
        const urlParams = history.location.pathname;
        const array = urlParams.split("/");
        const city = array[2].replace(" ", "");
        const numDays = 16;

        const getData = async () => {
            const url = `http://api.weatherbit.io/v2.0/forecast/daily?lang=es&key=823f8f6bf93d4a399588a8cfe6aad42c&city=${city}&days=${numDays}`;
            const req = await fetch(url);
            const resp = await req.json();
            setData({ data: resp.data, name: resp.city_name, loading: false });
        };
        getData();

        // eslint-disable-next-line
    }, []);

    const transformToDate = (date) => {
        const dateTemp = new Date(date);
        return dateTemp.toLocaleDateString();
    };

    if (data.loading) {
        return <Loading />;
    } else {
        return (
            <div className="container week-container">
                <h1 className="name text-center mb-5">
                    <small>Predicción 16 días</small>: {data.name}
                </h1>
                <div className="week-wrapper d-flex">
                    {data.data.map((day, i) => {
                        return (
                            <div key={`key-${i}`}>
                                <div className="day-wrapper">
                                    <div className="week-day">{transformToDate(day.datetime)}</div>
                                    <div className="week-icon d-flex flex-column align-items-center">
                                        <img
                                            src={process.env.PUBLIC_URL + `/icons/${day.weather.icon}.png`}
                                            alt={`icon-${i}`}
                                        />
                                        <span>{day.weather.description}</span>
                                    </div>
                                    <div className="week-pop">
                                        <img
                                            className="icon"
                                            src={process.env.PUBLIC_URL + `/icons/pop.png`}
                                            alt="icon-min"
                                        />
                                        {day.pop} %
                                    </div>
                                    <div className="min-max d-flex">
                                        <div className="max d-flex">
                                            <img
                                                className="ms-2 icon-temp"
                                                src={process.env.PUBLIC_URL + `/icons/max.png`}
                                                alt="icon-max"
                                            />
                                            {Math.round(day.high_temp)}°C
                                        </div>
                                        <div className="min d-flex">
                                            <img
                                                className="ms-2 icon-temp"
                                                src={process.env.PUBLIC_URL + `/icons/min.png`}
                                                alt="icon-max"
                                            />
                                            {Math.round(day.min_temp)}°C
                                        </div>
                                    </div>
                                    <div className="wind-speed">
                                        <img
                                            className="icon"
                                            src={process.env.PUBLIC_URL + `/icons/wind.ico`}
                                            alt="icon-min"
                                        />
                                        <span> {Math.round(day.wind_spd * 3.6)} km/h</span>
                                    </div>
                                    <div className="wind-direction">
                                        <img
                                            className="icon"
                                            src={process.env.PUBLIC_URL + `/icons/compass.png`}
                                            alt="icon-min"
                                        />
                                        <span>{day.wind_cdir}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <NavLink
                    to="/"
                    className="nav-link text-center"
                    activeClassName="main-nav-active"
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    Volver atrás
                </NavLink>
                <a href="/favourites">back</a>
            </div>
        );
    }
};

export default Week;
