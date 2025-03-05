import React, { useEffect, useState } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('toggle') || 
        target.classList.contains('language-selector')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div 
        className="custom-cursor" 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          width: isHovering ? '50px' : '20px',
          height: isHovering ? '50px' : '20px',
          background: isHovering ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.3)'
        }}
      />
      <div 
        className="cursor-dot" 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`
        }}
      />
    </>
  );
};

export default Cursor;