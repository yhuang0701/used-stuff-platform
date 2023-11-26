import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import React from 'react';
import Header from './components/Header';

const App = () => {
    return (
        <>
            <Header />
            <main>
                <h1 className="text-3xl font-bold underline">
                    Hello world!
                </h1>
                <Routes>
                    {/* Add additional routes for other pages */}
                </Routes>
            </main>
        </>
    );
};

export default App;