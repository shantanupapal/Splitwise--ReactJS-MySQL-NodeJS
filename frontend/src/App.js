import { BrowserRouter } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/landing/LandingPage";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <LandingPage />
            </div>
        </BrowserRouter>
    );
}

export default App;
