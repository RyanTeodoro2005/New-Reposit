import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import AboutSection from './components/AboutSection.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import EducationSection from './components/EducationSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import { languages, translations } from './data/i18n.js';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'pt';
  const stored = window.localStorage.getItem('language');
  if (stored && translations[stored]) {
    return stored;
  }
  const browserLang = window.navigator.language?.slice(0, 2).toLowerCase();
  if (browserLang && translations[browserLang]) {
    return browserLang;
  }
  return 'pt';
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [language, setLanguage] = useState(getInitialLanguage);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const content = translations[language] ?? translations.pt;

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const changeLanguage = (code) => {
    if (translations[code]) {
      setLanguage(code);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem('language', language);
  }, [language]);

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-night text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {theme === 'dark' && <div className="gradient-overlay" aria-hidden="true" />}
      <div className="max-w-6xl mx-auto px-6 pb-24 lg:px-10">
        <header id="inicio" className="relative py-14 lg:py-20">
          <Navbar
            navLinks={content.navLinks}
            menuOpen={menuOpen}
            onToggle={toggleMenu}
            onLinkClick={closeMenu}
            theme={theme}
            onThemeToggle={toggleTheme}
            languages={languages}
            currentLanguage={language}
            onLanguageChange={changeLanguage}
            languageLabel={content.languageLabel}
          />
          <Hero content={content.hero} theme={theme} />
        </header>

        <main className="space-y-24 lg:space-y-28">
          <AboutSection content={content.about} theme={theme} />
          <ExperienceSection content={content.experience} theme={theme} />
          <EducationSection content={content.education} theme={theme} />
          <SkillsSection content={content.skills} theme={theme} />
          <ProjectsSection content={content.projects} theme={theme} />
          <ContactSection content={content.contact} theme={theme} />
        </main>

        <Footer year={currentYear} theme={theme} content={content.footer} />
      </div>
    </div>
  );
}
