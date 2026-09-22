import { useEffect, useId, useRef } from "react";
import portrait from "../assets/portrait-ink.png";

// Eye coordinates use the SVG's 1280-unit viewBox (source image: 1254 px).
// Independent ink irises avoid moving pieces of the original eyelid texture.
const eyes = [
  { x: 522, y: 590, aperture: "M480 599 C491 590 503 585 519 585 C539 583 555 590 570 603 C556 609 539 612 520 612 C502 612 491 607 480 599Z" },
  { x: 739, y: 586, aperture: "M694 601 C707 589 720 581 737 581 C754 580 768 586 780 594 C765 604 751 608 735 608 C720 607 704 606 694 601Z" },
];
const irisLines = Array.from({ length: 17 }, (_, index) => {
  const angle = (index * 8 + 26) * Math.PI / 180;
  return {
    x1: Math.cos(angle) * 14, y1: Math.sin(angle) * 14,
    x2: Math.cos(angle) * 18.5, y2: Math.sin(angle) * 18.5,
  };
});

export default function PortraitAvatar({ reducedMotion, label }) {
  const hostRef = useRef(null);
  const faceRef = useRef(null);
  const eyeRefs = useRef([]);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const host = hostRef.current;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0, previousTime = 0, visible = true;
    const paint = () => {
      faceRef.current?.setAttribute("transform",
        `translate(${current.x * 10} ${current.y * 6}) rotate(${current.x * 0.9} 640 780)`);
      eyeRefs.current.forEach((eye) => eye?.setAttribute("transform",
        `translate(${current.x * 8} ${current.y * 3})`));
    };
    paint();
    if (reducedMotion) return;

    const tick = (time) => {
      frame = 0;
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 1 / 60;
      previousTime = time;
      const ease = 1 - Math.exp(-12 * delta);
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      if (Math.hypot(target.x - current.x, target.y - current.y) < 0.001) {
        Object.assign(current, target);
        previousTime = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
      paint();
    };
    const start = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };
    const reset = () => {
      target.x = target.y = 0;
      start();
    };
    const move = (event) => {
      if (event.pointerType === "touch" || !visible || document.hidden) return;
      const rect = host.querySelector("svg").getBoundingClientRect();
      // Use the stationary container, not the moving image, to prevent feedback.
      const size = Math.min(rect.width, rect.height);
      const eyeY = rect.top + (rect.height - size) / 2 + size * 0.455;
      const x = (event.clientX - (rect.left + rect.width / 2)) / (innerWidth * 0.38);
      const y = (event.clientY - eyeY) / (innerHeight * 0.38);
      const length = Math.max(1, Math.hypot(x, y));
      target.x = x / length;
      target.y = y / length;
      start();
    };
    const visibility = () => document.hidden ? stop() : reset();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) reset(); else stop();
    });
    observer.observe(host);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [reducedMotion]);

  return (
    <div className="portrait-avatar" ref={hostRef} data-portrait="illustration-2d">
      <svg className="portrait-art" viewBox="0 0 1280 1280" role="img" aria-labelledby={`${id}-title`}>
        <title id={`${id}-title`}>{label}</title>
        <defs>
          {/* The broad silhouette excludes the black outside the source badge;
              the color key removes wine between curls without redrawing them. */}
          <clipPath id={`${id}-portrait`}>
            <path transform="scale(1.0207336523)" d="M625 18 C825 12 1008 128 1017 324 C1031 455 967 554 912 583 L913 657 L891 722 L853 748 L835 825 L823 892 L825 955 L881 1006 L961 1040 L1044 1077 C940 1173 797 1230 640 1230 C475 1230 327 1170 205 1068 L299 1035 L380 996 L428 959 L448 945 L451 881 L431 820 L414 749 L378 737 L359 698 L352 640 L348 581 C297 550 252 461 244 367 C246 245 289 156 374 97 C446 45 535 20 625 18Z" />
          </clipPath>
          <filter id={`${id}-cutout`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -8 10 0 0 1" result="foreground" />
            <feComposite in="SourceGraphic" in2="foreground" operator="in" />
          </filter>
          <linearGradient id={`${id}-sclera`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#cfc3ad" />
            <stop offset="0.4" stopColor="#eee4ce" />
            <stop offset="1" stopColor="#f1e7d2" />
          </linearGradient>
          {eyes.map((eye, index) => (
            <g key={index}>
              <clipPath id={`${id}-aperture-${index}`}><path d={eye.aperture} /></clipPath>
            </g>
          ))}
        </defs>
        <g ref={faceRef}>
          <image href={portrait} width="1280" height="1280" clipPath={`url(#${id}-portrait)`} filter={`url(#${id}-cutout)`} />
          {!reducedMotion && eyes.map((eye, index) => (
            <g key={index} clipPath={`url(#${id}-aperture-${index})`}>
              <path d={eye.aperture} fill={`url(#${id}-sclera)`} />
              <g ref={(node) => { eyeRefs.current[index] = node; }}>
                <g transform={`translate(${eye.x} ${eye.y})`}>
                  <circle r="22" fill="#181610" />
                  <g stroke="#b5a78a" strokeWidth="1.3" opacity="0.75">
                    {irisLines.map((line, lineIndex) => <line key={lineIndex} {...line} />)}
                  </g>
                  <circle r="12" fill="#090a08" />
                  <circle cx="3" cy="-4" r="3" fill="#f5ecd8" />
                  <circle cx="-3" cy="2" r="1.5" fill="#f5ecd8" />
                </g>
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
