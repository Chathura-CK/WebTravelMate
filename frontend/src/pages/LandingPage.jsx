import React from 'react';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';



const LandingPage = ({ theme }) => {
    return (
        <div>
             <Hero theme={theme} />
             <Features theme={theme} />
            
        </div>
    );
};

export default LandingPage;
