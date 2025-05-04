import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const SpeedMeter = ({ value, phase, ping }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const progressRef = useRef(0);
  
  const getSpeedColor = (speed) => {
    if (speed < 10) return '#EF4444';
    if (speed < 30) return '#F97316';
    if (speed < 50) return '#EAB308';
    return '#22C55E';
  };
  
  const getPingColor = (pingValue) => {
    if (pingValue > 100) return '#EF4444';
    if (pingValue > 50) return '#F97316';
    if (pingValue > 20) return '#EAB308';
    return '#22C55E';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let animationStartTime;
    const animationDuration = 1000; // 1 second for full animation

    const animate = (currentTime) => {
      if (!animationStartTime) animationStartTime = currentTime;
      const elapsed = currentTime - animationStartTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      ctx.clearRect(0, 0, rect.width, rect.height);
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(centerX, centerY) - 10;
      
      // Draw background arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
      ctx.lineWidth = 20;
      ctx.strokeStyle = '#334155';
      ctx.stroke();
      
      if (phase !== 'ready') {
        const maxSpeed = 100;
        let targetPercentage = Math.min(value / maxSpeed, 1);

        // Add oscillation effect during testing
        if (phase === 'download' || phase === 'upload') {
          const oscillation = Math.sin(currentTime / 200) * 0.1; // Oscillation amplitude
          targetPercentage = Math.max(0.1, Math.min(targetPercentage + oscillation, 1));
        }

        progressRef.current = progressRef.current + (targetPercentage - progressRef.current) * 0.1;
        
        const color = phase === 'ping' 
          ? getPingColor(ping) 
          : getSpeedColor(value);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, Math.PI, Math.PI + progressRef.current * Math.PI, false);
        ctx.lineWidth = 20;
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      
      // Draw text
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      if (phase === 'ready') {
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('Ready', centerX, centerY - 15);
        ctx.font = '16px sans-serif';
        ctx.fillText('Click start to begin test', centerX, centerY + 15);
      } else if (phase === 'ping') {
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText(ping > 0 ? `${ping} ms` : 'Testing...', centerX, centerY - 15);
        ctx.font = '16px sans-serif';
        ctx.fillText('Ping', centerX, centerY + 15);
      } else if (phase === 'download' || phase === 'upload') {
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText(value.toFixed(1), centerX, centerY - 15);
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('Mbps', centerX, centerY + 15);
        ctx.font = '14px sans-serif';
        ctx.fillText(phase === 'download' ? 'Download' : 'Upload', centerX, centerY + 40);
      } else if (phase === 'complete') {
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('Complete', centerX, centerY);
      }

      if (phase !== 'ready' && phase !== 'complete') {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (phase !== 'ready' && phase !== 'complete') {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animate(0);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, phase, ping]);

  return (
    <div className="relative w-full max-w-[300px] aspect-square">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
};

SpeedMeter.propTypes = {
  value: PropTypes.number.isRequired,
  phase: PropTypes.oneOf(['ready', 'download', 'upload', 'ping', 'complete']).isRequired,
  ping: PropTypes.number.isRequired
};

export default SpeedMeter;