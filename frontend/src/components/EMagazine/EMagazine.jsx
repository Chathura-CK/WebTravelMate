import React, { useState, useRef, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { motion } from "framer-motion";  
import "./EMagazine.css";
import axios from 'axios';

const EMagazine = ({ theme }) => {
  const [selectedMagazine, setSelectedMagazine] = useState(null);
  const [magazineData, setMagazineData] = useState([]);
  const detailsRef = useRef(null);

  useEffect(() => {
    const fetchApprovedPosts = async () => {
      const response = await axios.get('http://localhost:4000/api/v1/magazine/approved');
      setMagazineData(response.data);
    };
    fetchApprovedPosts();
    if (selectedMagazine && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedMagazine]);

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
        <div className="details" ref={detailsRef}>
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
};

export default EMagazine;