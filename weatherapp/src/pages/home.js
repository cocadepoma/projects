import React from "react";
import City from "../pages/city";

function Home() {
    const city = "castellon";
    return (
        <div>
            <City city={city} />
        </div>
    );
}

export default Home;
