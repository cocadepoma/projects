import React, { Component } from "react";

export default class Loading extends Component {
    render() {
        return (
            <div className="text-center">
                <h4>Loading... please wait.</h4>
                <img src={process.env.PUBLIC_URL + `/loading2.gif`} alt="loading-gif" />
            </div>
        );
    }
}
