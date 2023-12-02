import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import React from 'react';
import Header from './components/Header';
import Post from './View/PostView'
import UserDetail from './View/UserDetail'
import UserDashboard from './View/UserDashboard';
import Search from './View/Search';


const App = () => {
    return (
        <>
            <Header />
            <main>

                <Routes>
                    <Route path="/post" element={<Post />} />
                    <Route path="/UserDetail" element={<UserDetail />} />
                    <Route path="/profile" element={<UserDashboard />} />
                    <Route path="/search" element={<Search />} />
                    {/* Add additional routes for other pages */}
                </Routes>
            </main>
        </>
    );
};

export default App;