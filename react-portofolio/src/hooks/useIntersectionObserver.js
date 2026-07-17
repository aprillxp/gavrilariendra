import React, { useEffect, useState } from 'react';

export const userIntersectionObserver = () => {
  const [hasAnimated, setHasAnimated] = useState({});
  useEffect(() => {
    const observer = new userIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated[entry.target.id]) {
            setHasAnimated((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));

    return () => {
      observer.disconncet();
    };
  }, [hasAnimated]);

  return hasAnimated;
};
