// LetterByLetterText.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './LetterByLetterText.css';

const LetterByLetterText = ({ text = 'UnniBLOGic', interval = 100 }) => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setLetters((prev) => [...prev, text[currentIndex]]);
      currentIndex++;
      if (currentIndex >= text.length) {
        clearInterval(intervalId);
      }
    }, interval);
    return () => clearInterval(intervalId);
  }, [text, interval]);

  return (
    <div className="LetterByLetterText">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * (interval / 1000) }}
          className="Letter"
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default LetterByLetterText;
