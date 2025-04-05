// TextRevolvingEffect.tsx
import React, { useState, useEffect } from 'react';
import { TextRevolvingEffectProps } from './textRevolvingEffect.interface'; // Import your HeroTextProps type

const TextRevolvingEffect: React.FC<TextRevolvingEffectProps> = (props) => {

  const { textArray = [], className, interval = 2000,fontWeight='text-xl' } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    const clearInt = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % textArray.length);
        setFadeOut(false);
      }, 500); // Time for fade-out animation
    }, interval); // Change the duration as per your requirement
    return () => clearInterval(clearInt);
  }, [textArray.length]);

  return (
    <div className="w-max text-center ">
      <p className={`ml-2 transition-opacity duration-700 ${fadeOut ? 'opacity-10' : 'opacity-100'}`}>{textArray[currentIndex]}</p>
    </div>
  );
};

export default TextRevolvingEffect;
