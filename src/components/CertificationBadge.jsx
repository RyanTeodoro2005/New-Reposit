import { useEffect, useRef } from 'react';
import aws from '../assets/badges/aws-developer.png';
import notionService from '../assets/badges/notion-service.png';
import notionAdmin from '../assets/badges/notion-admin.png';
import cisco from '../assets/badges/cisco-hardware.png';
import lifelong from '../assets/badges/lifelong-learning.png';
import scrum from '../assets/badges/scrum-foundation.png';
import ibm from '../assets/badges/ibm-professional.png';

const badges = {
  'AWS Certified Developer – Associate': { image: aws, color: '#447bff' },
  'Notion Service Specialist': { image: notionService, color: '#c7c4bd' },
  'Notion Certified Admin Exam': { image: notionAdmin, color: '#b3b0aa' },
  'Computer Hardware Basics': { image: cisco, color: '#00a8cf' },
  'Lifelong Learning': { image: lifelong, color: '#dca658' },
  'Scrum Foundation Professional Certification': { image: scrum, color: '#679cda' },
  'Working in a Digital World: Professional Skills': { image: ibm, color: '#46bdbe' },
};

export default function CertificationBadge({ name, index }) {
  const stage = useRef(null);
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.style.setProperty('--badge-play-state', entry.isIntersecting ? 'running' : 'paused');
    }, { rootMargin: '100px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const badge = badges[name];
  if (!badge) return null;
  return (
    <div ref={stage} className="certification-badge" aria-hidden="true"
      style={{
        '--badge-color': badge.color,
        '--badge-image': `url("${badge.image}")`,
        '--float-delay': `${index * -0.85}s`,
        '--spin-delay': `${index * -1.25}s`,
        '--spin-duration': `${18 + index * 1.3}s`,
      }}>
      <div className="badge-ground" />
      <div className="badge-float">
        <div className="badge-sculpture">
          {Array.from({ length: 13 }, (_, layer) => (
            <span key={layer} className="badge-edge" style={{ transform: `translateZ(${layer - 6}px)` }} />
          ))}
          <div className="badge-face badge-front">
            <img src={badge.image} alt="" width="340" height="340" loading="lazy" decoding="async" />
          </div>
          <div className="badge-face badge-back">
            <img src={badge.image} alt="" width="340" height="340" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </div>
  );
}
