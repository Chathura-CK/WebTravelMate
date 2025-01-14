import React from 'react';
import './Features.css';

const Features = ({ theme}) => {
  

    const features = [
        { title: "Tour Packages", desc: "Explore curated packages for your perfect trip." },
        { title: "Event Packages", desc: "Find events tailored to your interests." },
        { title: "Join as a Guide", desc: "Offer your services as a professional guide." },
    ];

    return (
        <section className={`features ${theme}`} id="features">
            <h2>Features</h2>
            <div className="feature-list">
                {features.map((feature, index) => (
                    <div key={index} className="feature-item">
                        <h3>{feature.title}</h3>
                        <p>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
