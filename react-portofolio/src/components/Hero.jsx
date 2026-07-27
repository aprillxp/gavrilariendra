import React, { useEffect, useState } from 'react';
import { summary } from '../data/summary';

const Hero = ({ hasAnimated }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const { roles } = summary;

  useEffect(() => {
    const currentRole = roles[currentTextIndex];

    if (!isDeleting) {
      if (currentText.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentRole.slice(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(100);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, currentText.length - 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % roles.length);
        setTypingSpeed(150);
      }
    }
  }, [currentText, currentTextIndex, isDeleting, roles, typingSpeed]);

  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* background element */}
      {/* <div className="overflow-hidden absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80"></div>
      </div> */}

      {/* grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px, transparent_1px), linear-gradient(90deg, rgba(0,0,0,0.02)_1px,transparent_1px)]bg-[size:50px_50px]"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center h-full flex flex-col justify-center">
        <div
          className={`transition-all duration-1000 ${hasAnimated.summary ? 'opcacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          id="summary"
        >
          {/* greetings */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm font-medium animate-fade-in">
              {summary.greeting}
            </span>
          </div>

          {/* name */}
          <h1 className="text-5xl md:text-5xl font-bold mb-4 animate-fade-in-up">{summary.name}</h1>

          {/* typewriter role */}
          <div className="h-12 md:h-8 mb-4 flex justify-center items-center">
            <h2 className="text-2xl md:text-3xl font-semibold">
              I'm a{' '}
              <span className="relative">
                <span className="font-bold">
                  {currentText} <span className="animate-pulse"></span>{' '}
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black"></span>
              </span>
            </h2>
          </div>

          {/* description */}
        </div>
      </div>
    </section>
  );
};
// 27.00
export default Hero;
