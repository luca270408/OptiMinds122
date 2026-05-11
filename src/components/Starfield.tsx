import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; size: number; speed: number; opacity: number; opacitySpeed: number }[] = [];
    let shootingStars: { x: number; y: number; length: number; speed: number; angle: number; opacity: number; life: number; delay: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initShootingStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 1500); // More stars
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          speed: Math.random() * 0.2 + 0.05,
          opacity: Math.random(),
          opacitySpeed: (Math.random() * 0.02) - 0.01
        });
      }
    };

    const initShootingStars = () => {
      shootingStars = [];
      for (let i = 0; i < 3; i++) {
        createShootingStar();
      }
    };

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 4 + 2,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1), // roughly 45 degrees
        opacity: 0,
        life: 0,
        delay: Math.random() * 200 + 50
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background stars
      stars.forEach(star => {
        // Twinkle
        star.opacity += star.opacitySpeed;
        if (star.opacity <= 0.1 || star.opacity >= 1) {
          star.opacitySpeed = -star.opacitySpeed;
        }

        // Float upwards
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw shooting stars
      ctx.lineCap = 'round';
      shootingStars.forEach((star, index) => {
        if (star.delay > 0) {
          star.delay--;
          return;
        }

        star.life += 0.02;
        star.x -= Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        
        // Fade in and out
        if (star.life < 0.2) {
          star.opacity = star.life * 5;
        } else if (star.life > 0.8) {
          star.opacity = (1 - star.life) * 5;
        } else {
          star.opacity = 1;
        }

        if (star.life >= 1 || star.x < 0 || star.y > canvas.height) {
          shootingStars.splice(index, 1);
          createShootingStar();
          return;
        }

        const gradient = ctx.createLinearGradient(
          star.x, star.y, 
          star.x + Math.cos(star.angle) * star.length, 
          star.y - Math.sin(star.angle) * star.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.5, `rgba(204, 255, 0, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x + Math.cos(star.angle) * star.length, 
          star.y - Math.sin(star.angle) * star.length
        );
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)' }}
    />
  );
}
