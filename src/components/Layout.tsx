import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is a touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e: PointerEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .brutal-card, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    // Pointer events are supported in all modern browsers including Safari/iOS
    window.addEventListener('pointermove', moveCursor);
    window.addEventListener('pointerover', handlePointerOver);
    window.addEventListener('pointerleave', handlePointerLeave);
    
    return () => {
      window.removeEventListener('pointermove', moveCursor);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  if (isTouchDevice) return null;

  // Use @supports or simple visibility logic
  // On touch devices, the cursor should follow the finger
  return (
    <div
      className={`custom-cursor pointer-events-none fixed z-[10000] rounded-full hidden md:block ${
        isHovering ? 'hovering' : ''
      } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        left: 0,
        top: 0,
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        // Ensure it works on Safari/iOS by using translate3d for hardware acceleration
      }}
    />
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grain-overlay" />
      <CustomCursor />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
