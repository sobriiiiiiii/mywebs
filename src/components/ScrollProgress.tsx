import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FA5A00] via-[#FF7726] to-[#FA5A00] origin-left z-[60] pointer-events-none shadow-[0_1px_6px_rgba(250,90,0,0.5)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};
