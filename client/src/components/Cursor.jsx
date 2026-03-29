import React, { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const C = document.getElementById('C');
    const CR = document.getElementById('CR');
    if (!C || !CR) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let requestRef;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      C.style.left = mx + 'px';
      C.style.top = my + 'px';
      CR.style.left = rx + 'px';
      CR.style.top = ry + 'px';
      requestRef = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', handleMouseMove);
    requestRef = requestAnimationFrame(loop);

    const handleEnter = () => { C.classList.add('big'); CR.classList.add('big'); };
    const handleLeave = () => { C.classList.remove('big'); CR.classList.remove('big'); };

    const attachHover = () => {
      document.querySelectorAll('a, button, input, select, .ev-card, .stat-card, .faq-q').forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    };

    attachHover();
    const observer = new MutationObserver(() => { attachHover(); });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cur" id="C"></div>
      <div className="cur-r" id="CR"></div>
    </>
  );
}
