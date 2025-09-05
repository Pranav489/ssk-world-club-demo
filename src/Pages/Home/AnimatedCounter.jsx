import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const AnimatedCounter = ({ value, duration = 2000, showPlus = false }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    // If value is a string (like "24/7"), just set it directly
    if (typeof value === 'string') {
      setDisplayValue(value);
      return;
    }

    const start = 0;
    const end = typeof value === 'number' ? value : parseInt(value) || 0;
    
    if (start === end) {
      setDisplayValue(end);
      return;
    }

    const incrementTime = duration / end;
    let current = start;
    
    const timer = setInterval(() => {
      current += 1;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setDisplayValue(current);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {displayValue}
      {showPlus && typeof value === 'number' && '+'}
    </span>
  );
};

export default AnimatedCounter;