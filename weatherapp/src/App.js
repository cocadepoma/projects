import "./styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Burger from "./components/burger";

function App() {
    return (
        <div className="App">
            <Router basename="/">
                <div className="body">
                    <header>
                        <Burger />
                        <Navbar />
                    </header>
                    <Routes />
                    <Footer />
                </div>
            </Router>
        </div>
    );
}

export default App;
