import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './View/AuthContext';

import React from 'react';
import Header from './components/Header';
import Post from './View/PostView'
import SignIn from './View/SigninView';
import UserDetail from './View/UserDetail'
import UserDashboard from './View/UserDashboard';
import Search from './View/Search';
import Home from './View/Home';

import SignUp from './View/SignupView';

const App = () => {
    return (
        <AuthProvider>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/UserDetail" element={<UserDetail />} />
                    <Route path="/profile" element={<UserDashboard />} />
                    <Route path="/search" element={<Search />} />                    
                    <Route path='/user/signin' element={<SignIn />} />
                    <Route path='/user/signup' element={<SignUp/>} />
                </Routes>
            </main>
        </AuthProvider>
    );
};

export default App;