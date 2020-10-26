import React from 'react';
import NavBar from './components/NavBar';

const App: React.FC = () => {
    return (
        <>
            <NavBar/>
            <div className="container">
                <h1>
                    Hello, Morder!
                </h1>
            </div>
        </>
    );
}

export default App;
