import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import React from 'react';
import Header from './components/Header';
import Post from './View/PostView'
import ItemDetail from './View/ItemDetail'


const App = () => {
    return (
        <>
            <Header />
            <main>

                <Routes>
                    <Route path="/post" element={<Post />} />
                    <Route path="/Detail" element={<ItemDetail />} />

                    {/* Add additional routes for other pages */}
                </Routes>
            </main>
        </>
    );
};

export default App;