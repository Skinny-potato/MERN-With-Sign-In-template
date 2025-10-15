import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../resources/styles/home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/auth/login'); // adjust based on your routes
    };

    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Note Nest</h1>
                <p className="home-subtitle">Organize your thoughts, one note at a time.</p>
                <button className="get-started-button" onClick={handleGetStarted}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Home;
