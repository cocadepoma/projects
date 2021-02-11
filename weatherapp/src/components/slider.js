import React, { Component } from "react";
import "../styles/dayWeather.scss";

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/swiper-bundle.css";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default class Slider extends Component {
    componentDidMount() {
        const save = this.props.newdata;

        const slides = [];
        for (const i in save) {
            slides.push(
                <SwiperSlide key={`slide-${i}`} tag="li">
                    <span>{save[i].temp} °C</span>
                    <img src={process.env.PUBLIC_URL + `/icons/${save[i].icon}.png`} alt={`icon-${i}`} />
                    <span>{save[i].time}</span>
                </SwiperSlide>
            );
        }
        const slidewrap = (
            <Swiper tag="ul" slidesPerView={"auto"}>
                {slides}
            </Swiper>
        );

        this.setState({ slide: slidewrap });
    }

    state = {
        slide: "",
    };
    render() {
        return <div>{this.state.slide}</div>;
    }
}
