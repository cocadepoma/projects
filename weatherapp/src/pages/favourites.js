import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/favourites.scss";
import Loading from "../components/loading";

const Favourites = () => {
    const [cities, setCities] = useState(Object.keys(localStorage));
    const [weatherData, setWeatherData] = useState({ data: [], loading: true });
    const history = useHistory();

    useEffect(() => {
        try {
            const getData = async () => {
                const temp = [];
                for (const i in cities) {
                    const city = cities[i].replace(/[,.]/g, "");
                    const url = `http://api.weatherbit.io/v2.0/current?lang=es&city=${city}&key=823f8f6bf93d4a399588a8cfe6aad42c`;
                    const resp = await fetch(url);
                    const data = await resp.json();
                    temp.push(data.data[0]);
                }

                setWeatherData({ data: temp, loading: false });
            };
            getData();
        } catch (err) {
            console.log(err);
        }
    }, [cities]);

    const HandeClick = (city) => {
        const cityClean = city.replace(/[,.-]/g, "");
        history.push(`/week/${cityClean}`);
    };

    if (weatherData.loading) {
        return <Loading />;
    } else if (weatherData.data.length === 0 && !weatherData.loading) {
        return <h1 className="text-center">No hay favoritos</h1>;
    } else {
        return (
            <div className="container fav-wrapper">
                <h1 className="text-center">Favoritos</h1>
                <ul className="favourites">
                    {weatherData.data.map((cityWeather, i) => {
                        return (
                            <li id={cities[i]} key={`key-${cities[i]}`} className="animate__animated animate__fadeIn">
                                <div className="wrapper-li d-flex justify-content-between align-items-center">
                                    <div>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem(cities[i]);
                                                document.getElementById(cities[i]).classList.remove("animate__fadeIn");
                                                document.getElementById(cities[i]).classList.add("animate__fadeOut");
                                                setTimeout(() => {
                                                    setCities(Object.keys(localStorage));
                                                }, 400);
                                            }}
                                            type="button"
                                            className="btn btn-danger btn-circle"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-1">
                                        <h6
                                            onClick={() => {
                                                HandeClick(cities[i]);
                                            }}
                                        >
                                            {cityWeather.city_name}
                                        </h6>
                                        <h4 className="ms-4">{Math.round(cityWeather.temp)} °C</h4>
                                    </div>

                                    <div className="d-flex flex-column align-items-center">
                                        <img
                                            src={process.env.PUBLIC_URL + `/icons/${cityWeather.weather.icon}.png`}
                                            alt={`icon-`}
                                        />
                                        <p className="info-weather">{cityWeather.weather.description}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
};
export default Favourites;
