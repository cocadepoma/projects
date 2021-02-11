import React, { Component } from "react";
import DayWeather from "../components/dayWeather";
import Loading from "../components/loading";
import { Redirect } from "react-router-dom";

class City extends Component {
    state = {
        loading: true,
        weather1: {},
        weather2: {},
        city: "",
    };
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }

    async getData(city, url, url2) {
        try {
            const [weather1, weather2] = await Promise.all([
                fetch(url).then((resp) => resp.json()),
                fetch(url2).then((resp) => resp.json()),
            ]);

            this.setState({ weather1: weather1.data[0], weather2: weather2.data[0], fetchOk: true });
        } catch (err) {
            console.log(err);
        }

        if (this.state.fetchOk) {
            setTimeout(() => {
                this.setState({ loading: false, city: city });
            }, 300);
        }
    }

    componentDidMount() {
        let param = window.location.pathname;
        let array = param.split("/");
        let city = "";
        if (array.length > 2) {
            city = array[2];
        } else {
            city = this.props.city;
        }

        const url = `http://api.weatherbit.io/v2.0/current?lang=es&city=${city}&key=823f8f6bf93d4a399588a8cfe6aad42c`;
        const url2 = `http://api.weatherbit.io/v2.0/forecast/daily?key=823f8f6bf93d4a399588a8cfe6aad42c&lang=es&days=1&city=${city}&units=M`;

        this.getData(city, url, url2);
    }

    componentWillUnmount() {
        this.componentDidMount();
    }
    render() {
        if (this.state.fetchOk === false) {
            return <Redirect to="/home" props={{ error: true }} />;
        }
        return (
            <div className="container">
                <div className="background-image"></div>
                {this.state.loading ? (
                    <Loading />
                ) : (
                    <DayWeather city={this.state.city} weather1={this.state.weather1} weather2={this.state.weather2} />
                )}
            </div>
        );
    }
}
export default City;
