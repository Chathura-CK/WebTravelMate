import React from 'react';
import './Hero.css';


const Hero = ({ theme }) => {
    
   return (
        <section className={`hero ${theme}`}>
            <h1>Discover Your Next Adventure</h1>
            <p>Join our community of tourists, guides, and event managers for unforgettable experiences.</p>
            <button className="buttn">Get Started</button>
        </section>
    );
};

export default Hero;