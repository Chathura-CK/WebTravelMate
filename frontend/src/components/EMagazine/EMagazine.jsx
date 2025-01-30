import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { motion } from "framer-motion";  
import "./EMagazine.css";

const magazineData = [
  {
    id: 1,
    title: "Travel Wonders",
    image: "https://via.placeholder.com/300",
    description: "Explore the best travel destinations around the world.",
  },
  {
    id: 2,
    title: "Tech Insights",
    image: "https://via.placeholder.com/300",
    description: "Stay updated with the latest technology trends.",
  },
  {
    id: 3,
    title: "Health & Wellness",
    image: "https://via.placeholder.com/300",
    description: "Tips for a healthy and balanced lifestyle.",
  },
  {
    id: 4,
    title: "Travel Wonders",
    image: "https://via.placeholder.com/300",
    description: "Explore the best travel destinations around the world.",
  },
  {
    id: 5,
    title: "Tech Insights",
    image: "https://via.placeholder.com/300",
    description: "Stay updated with the latest technology trends.",
  },
  {
    id: 6,
    title: "Health & Wellness",
    image: "https://via.placeholder.com/300",
    description: "Tips for a healthy and balanced lifestyle.",
  }
];

export default function EMagazine( {theme} ) {
  const [selectedMagazine, setSelectedMagazine] = useState(null);

  return (
    <div className={`container ${theme}`}>
      <h1 className="title">E-Magazine</h1>
      <div className="grid">
        {magazineData.map((magazine) => (
          <motion.div
            key={magazine.id}
            whileHover={{ scale: 1.05 }}
            className="card-container"
            onClick={() => setSelectedMagazine(magazine)}
          >
            <Card className="card">
              <img src={magazine.image} alt={magazine.title} className="card-image" />
              <CardContent className="card-content">
                <h2 className="card-title">{magazine.title}</h2>
                <p className="card-description">{magazine.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      {selectedMagazine && (
        <div className="details">
          <h2 className="details-title">{selectedMagazine.title}</h2>
          <img src={selectedMagazine.image} alt={selectedMagazine.title} className="details-image" />
          <p>{selectedMagazine.description}</p>
          <Button className="close-button" onClick={() => setSelectedMagazine(null)}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
}
