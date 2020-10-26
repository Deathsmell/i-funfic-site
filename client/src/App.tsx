import React from 'react';
import {BrowserRouter} from "react-router-dom";
import NavBar from './components/NavBar';
import Routes from "./routes";

const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <NavBar/>
                <div className="container">

                    <Routes/>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
