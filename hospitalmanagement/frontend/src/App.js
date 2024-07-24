import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import HomePage from './SearchPage';
import Head from './Head';
import List from './List';
const App = () => {
    return (
        <Router>
        <Head />
            <Routes>
                <Route path="/views" element={<List/>} />
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default App;
