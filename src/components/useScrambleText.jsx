import { useState, useRef } from 'react';

export const useScrambleText = (originalText, options = {}) => {
  const [text, setText] = useState(originalText);
  const intervalRef = useRef(null);

  const {
    speed = 15, // Faster animation
    intensity = 5, // How many letters scramble at once
  } = options;

  const scramble = () => {
    clearInterval(intervalRef.current);
    let iterations = 0;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    intervalRef.current = setInterval(() => {
      const scrambled = originalText
        .split('')
        .map((char, i) => {
          if (i < iterations) return originalText[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setText(scrambled);

      iterations += 1 / intensity;
      if (iterations >= originalText.length) {
        clearInterval(intervalRef.current);
        setText(originalText);
      }
    }, speed);
  };

  return [text, scramble];
};
