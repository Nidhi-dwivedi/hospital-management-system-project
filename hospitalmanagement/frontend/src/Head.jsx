import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Head = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">MyApp</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Create-Hospital</Link>
                </li>
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
                <li>
                    <Link to="/views">Lists</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Head;
