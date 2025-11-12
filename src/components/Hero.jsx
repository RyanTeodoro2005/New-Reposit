import { useEffect, useRef, useState } from 'react';
import profileImage from '../assets/profile.jpg';

export default function Hero({ content, theme = 'dark' }) {
  const [typedText, setTypedText] = useState('');
  const timeoutRef = useRef(null);
  const isDark = theme === 'dark';
  const message = content?.typing ?? '';

  useEffect(() => {
    let index = 0;
    let direction = 1;

    const schedule = (delay) => {
      timeoutRef.current = window.setTimeout(step, delay);
    };

    const step = () => {
      index += direction;

      if (index > message.length) {
        index = message.length;
        setTypedText(message.slice(0, index));
        direction = -1;
        schedule(1400);
        return;
      }

      if (index < 0) {
        index = 0;
        setTypedText('');
        direction = 1;
        schedule(600);
        return;
      }

      setTypedText(message.slice(0, index));
      schedule(direction === 1 ? 120 : 60);
    };

    setTypedText('');
    if (message.length > 0) {
      schedule(120);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message]);

  const role = content?.role ?? '';
  const description = content?.description ?? '';
  const primaryCta = content?.ctaPrimary ?? '';
  const secondaryCta = content?.ctaSecondary ?? '';
  const secondaryHref = content?.ctaSecondaryHref ?? 'mailto:ryanbryansilvateodoro@gmail.com';
  const locationItems = content?.location ?? [];
  const profile = content?.profile ?? {};
  const cards = content?.cards ?? [];

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <div className="space-y-6 opacity-0 animate-fade-up">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <span className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 shadow-lg shadow-sky-500/20">
            <img
              src={profileImage}
              alt={content?.profileAlt ?? 'Foto de perfil de Ryan Teodoro'}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </span>
          <div className="space-y-2">
            <h1 className="typing-heading text-4xl font-semibold leading-tight sm:text-5xl">
              {(typedText || '').split('\n').map((segment, index, arr) => (
                <span key={`${segment}-${index}`}>
                  {segment}
                  {index < arr.length - 1 && <br />}
                </span>
              ))}
              <span className="typing-cursor">|</span>
            </h1>
            {role && (
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-200">
                {role}
              </p>
            )}
          </div>
        </div>
        {description && (
          <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
            {description}
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          {primaryCta && (
            <a
              className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 animate-glow"
              href="#projetos"
            >
              {primaryCta}
            </a>
          )}
          {secondaryCta && (
            <a
              className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 ${
                isDark
                  ? 'border border-white/20 text-white hover:border-sky-400/60 hover:text-sky-100'
                  : 'border border-slate-300 text-slate-800 hover:border-sky-400/60 hover:text-sky-700'
              }`}
              href={secondaryHref}
            >
              {secondaryCta}
            </a>
          )}
        </div>
        {(locationItems.length > 0 || profile?.label) && (
          <ul className={`flex flex-wrap gap-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {locationItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {profile?.label && (
              <li>
                <a
                  className={`${isDark ? 'text-slate-100 hover:text-sky-400' : 'text-slate-800 hover:text-sky-500'}`}
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {profile.label}
                </a>
              </li>
            )}
          </ul>
        )}
      </div>

      <div className="grid gap-4 opacity-0 animate-fade-up-delayed">
        {cards.map(({ title, description }) => (
          <article
            key={title}
            className={`group relative overflow-hidden rounded-3xl p-6 transition duration-300 hover:-translate-y-1 ${
              isDark
                ? 'border border-white/15 bg-white/5 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.85)] hover:border-sky-500/50 hover:bg-sky-500/15'
                : 'border border-slate-200 bg-white shadow-[0_25px_45px_-30px_rgba(15,23,42,0.25)] hover:border-sky-400/60 hover:bg-sky-100/60'
            }`}
          >
            <span
              className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(circle at top, rgba(56,189,248,0.25), transparent 60%)',
              }}
            />
            <span className={`text-xs font-semibold uppercase tracking-[0.28em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {title}
            </span>
            <p className={`mt-3 relative z-10 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
