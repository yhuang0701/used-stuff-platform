import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import React from 'react';
import Header from './components/Header';
import Post from './View/PostView'
import SignIn from './View/SigninView';

const App = () => {
    return (
        <>
            <Header />
            <main>

                <Routes>
                    <Route path="/post" element={<Post />} />
                    <Route path='/user/signin' element={<SignIn />} />

                    {/* Add additional routes for other pages */}
                </Routes>
            </main>
        </>
    );
};

export default App;