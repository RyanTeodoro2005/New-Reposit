import { useEffect, useRef, useState } from 'react';

export default function Navbar({
  navLinks,
  menuOpen,
  onToggle,
  onLinkClick,
  theme = 'dark',
  onThemeToggle,
  languages = [],
  currentLanguage = 'pt',
  onLanguageChange,
  languageLabel = 'Idioma',
}) {
  const isDark = theme === 'dark';
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentLanguageLabel =
    languages.find(({ code }) => code === currentLanguage)?.label ?? currentLanguage.toUpperCase();
  const languageButtonClasses = (active) =>
    `rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] transition ${
      active
        ? isDark
          ? 'border-sky-400/80 bg-sky-500/20 text-sky-200'
          : 'border-sky-500/80 bg-sky-100 text-sky-700'
        : isDark
        ? 'border-white/20 text-slate-200 hover:border-sky-400/60 hover:text-sky-100'
        : 'border-slate-300 text-slate-700 hover:border-sky-500/60 hover:text-sky-700'
    }`;
  const handleLanguageClick = (code) => {
    if (code !== currentLanguage && onLanguageChange) {
      onLanguageChange(code);
    }
    setLangMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) {
      setLangMenuOpen(false);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!langMenuOpen) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [langMenuOpen]);

  return (
    <nav className="flex items-center justify-center gap-6 mb-16">
      <button
        type="button"
        className={`inline-flex items-center justify-center w-11 h-11 rounded-full border transition lg:hidden ${
          isDark ? 'border-white/20 text-white' : 'border-slate-300 text-slate-700'
        }`}
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        onClick={onToggle}
      >
        <span className="sr-only">Toggle menu</span>
        <div className="space-y-1.5">
          <span className={`block h-0.5 w-6 transition ${
            isDark ? 'bg-white' : 'bg-slate-800'
          } ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 transition ${
            isDark ? 'bg-white' : 'bg-slate-800'
          } ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 transition ${
            isDark ? 'bg-white' : 'bg-slate-800'
          } ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
        </div>
      </button>
      <ul
        className={`z-20 flex flex-col gap-6 rounded-2xl border p-6 text-sm font-medium uppercase tracking-[0.2em] shadow-xl backdrop-blur transition lg:flex lg:flex-row lg:gap-8 lg:border-0 lg:p-0 lg:shadow-none lg:backdrop-blur-0 ${
          menuOpen ? 'absolute left-1/2 top-20 -translate-x-1/2' : 'hidden lg:flex'
        } ${
          isDark
            ? 'border-white/10 bg-night/80 lg:bg-transparent'
            : 'border-slate-200 bg-white/90 text-slate-700 lg:bg-transparent'
        }`}
      >
        {navLinks.map(({ label, href }) => (
          <li key={href}>
            <a
              className={`group relative inline-flex items-center transition ${
                isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              href={href}
              onClick={onLinkClick}
            >
              <span className={`absolute inset-x-0 bottom-[-8px] h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                isDark ? 'bg-sky-400' : 'bg-sky-500'
              }`} />
              {label}
            </a>
          </li>
        ))}
        {languages.length > 0 && (
          <li className="lg:hidden">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen((open) => !open)}
                className={`w-full rounded-full border px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] transition ${
                  isDark
                    ? 'border-white/20 text-slate-100 hover:border-sky-400/60'
                    : 'border-slate-300 text-slate-700 hover:border-sky-500/60'
                }`}
                aria-haspopup="listbox"
                aria-expanded={langMenuOpen}
              >
                {languageLabel}: {currentLanguageLabel}
              </button>
              {langMenuOpen && (
                <div
                  className={`mt-2 w-full rounded-2xl border p-2 shadow-lg ${
                    isDark ? 'border-white/15 bg-night/90' : 'border-slate-200 bg-white'
                  }`}
                >
                  <ul role="listbox" className="flex flex-col gap-2">
                    {languages.map(({ code, label }) => (
                      <li key={code}>
                        <button
                          type="button"
                          onClick={() => handleLanguageClick(code)}
                          className={`${languageButtonClasses(code === currentLanguage)} w-full text-center`}
                          role="option"
                          aria-selected={code === currentLanguage}
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        )}
        <li className="lg:hidden">
          <button
            type="button"
            onClick={onThemeToggle}
            className={`w-full rounded-full px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] transition ${
              isDark
                ? 'border border-white/20 text-slate-100 hover:border-sky-400/60'
                : 'border border-slate-300 text-slate-700 hover:border-sky-500/60'
            }`}
            aria-pressed={theme === 'light'}
          >
            <span className="sr-only">Alterar tema</span>
            <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
          </button>
        </li>
      </ul>
      <div className="hidden items-center gap-3 lg:flex" ref={dropdownRef}>
        {languages.length > 0 && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen((open) => !open)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition ${
                isDark
                  ? 'border-white/20 text-slate-100 hover:border-sky-400/60'
                  : 'border-slate-300 text-slate-700 hover:border-sky-500/60'
              }`}
              aria-haspopup="listbox"
              aria-expanded={langMenuOpen}
            >
              {currentLanguageLabel}
              <span aria-hidden="true" className="text-base">
                {langMenuOpen ? '▲' : '▼'}
              </span>
            </button>
            {langMenuOpen && (
              <div
                className={`absolute right-0 z-20 mt-2 w-40 rounded-2xl border p-2 shadow-xl ${
                  isDark ? 'border-white/15 bg-night/95' : 'border-slate-200 bg-white'
                }`}
              >
                <p className={`px-2 text-[0.6rem] uppercase tracking-[0.32em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {languageLabel}
                </p>
                <ul role="listbox" className="mt-2 flex flex-col gap-2">
                  {languages.map(({ code, label }) => (
                    <li key={code}>
                      <button
                        type="button"
                        onClick={() => handleLanguageClick(code)}
                        className={`${languageButtonClasses(code === currentLanguage)} w-full text-center`}
                        role="option"
                        aria-selected={code === currentLanguage}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <button
          type="button"
          onClick={onThemeToggle}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition ${
            isDark
              ? 'border border-white/20 text-slate-100 hover:border-sky-400/60'
              : 'border border-slate-300 text-slate-700 hover:border-sky-500/60'
          }`}
          aria-pressed={theme === 'light'}
        >
          <span className="sr-only">Alterar tema</span>
          <span aria-hidden="true" className="text-lg">{isDark ? '☀️' : '🌙'}</span>
        </button>
      </div>
    </nav>
  );
}
