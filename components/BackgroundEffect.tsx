import React, { useEffect, useRef } from 'react';

const BackgroundEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const orbs: Orb[] = [];
    const numOrbs = 6;

    class Orb {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 200 + 100;
        this.dx = (Math.random() - 0.5) * 0.2; // Slow movement
        this.dy = (Math.random() - 0.5) * 0.2;
        // Soft pastel colors for healing vibe
        const colors = [
          '229, 231, 235', // Gray
          '214, 211, 209', // Stone
          '204, 251, 241', // Teal
          '224, 231, 255', // Indigo
          '250, 245, 255'  // Purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;

        // Bounce gently
        if (this.x < -this.radius || this.x > width + this.radius) this.dx = -this.dx;
        if (this.y < -this.radius || this.y > height + this.radius) this.dy = -this.dy;

        this.draw();
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(${this.color}, ${this.alpha})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
    }

    for (let i = 0; i < numOrbs; i++) {
      orbs.push(new Orb());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      // Soft background fill
      ctx.fillStyle = '#f5f5f4';
      ctx.fillRect(0, 0, width, height);

      orbs.forEach(orb => orb.update());
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default BackgroundEffect;