import React, { useRef, useEffect } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Ajustar tamaño inicial
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 18;
    let columns = Math.floor(canvas.width / fontSize);
    const rainDrops = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trailing effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }

        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      setCanvasSize();
      columns = Math.floor(canvas.width / fontSize);
      rainDrops.length = columns;
      for (let i = 0; i < columns; i++) {
        rainDrops[i] = 0;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default MatrixBackground;
