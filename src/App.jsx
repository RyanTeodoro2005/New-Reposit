import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { languages, translations } from "./data/i18n.js";
import PortraitAvatar from "./components/PortraitAvatar.jsx";
import CertificationBadge from "./components/CertificationBadge.jsx";

gsap.registerPlugin(ScrollTrigger);
const editorial = {
  pt: {
    portfolio: "Portfólio pessoal",
    available: "Aberto a conexões",
    intro: "Código com intenção.",
    introItalic: "Experiências com personalidade.",
    hello: "Prazer, Ryan.",
    move: "Mova o cursor. Eu acompanho.",
    scroll: "Role para me conhecer",
    selected: "Projetos",
    selectedItalic: "no ar.",
    projects: "Projetos no ar",
    journey: "Cada passo,",
    journeyItalic: "uma nova perspectiva.",
    about: "Curiosidade é o",
    aboutItalic: "ponto de partida.",
    skills: "Minha caixa",
    skillsItalic: "de ferramentas.",
    contact: "Vamos criar",
    contactItalic: "algo juntos?",
    back: "Voltar ao topo",
    theme: "Alternar tema",
    motion: "Pausar animações",
    resume: "Ativar animações",
    menu: "Abrir menu",
    close: "Fechar menu",
    avatar:
      "Retrato ilustrado de Ryan em desenho a tinta, com olhar que acompanha o cursor",
    source: "Visitar site",
    current: "Agora",
    focus: "Desenvolvimento · Design · Pessoas",
    more: "Um pouco mais sobre mim",
  },
  en: {
    portfolio: "Personal portfolio",
    available: "Open to connections",
    intro: "Code with intention.",
    introItalic: "Experiences with personality.",
    hello: "Nice to meet you, Ryan.",
    move: "Move your cursor. I follow.",
    scroll: "Scroll to get to know me",
    selected: "Projects,",
    selectedItalic: "live.",
    projects: "Live projects",
    journey: "Every step,",
    journeyItalic: "a new perspective.",
    about: "Curiosity is the",
    aboutItalic: "starting point.",
    skills: "Inside my",
    skillsItalic: "toolbox.",
    contact: "Let’s create",
    contactItalic: "something together.",
    back: "Back to top",
    theme: "Toggle theme",
    motion: "Pause animations",
    resume: "Enable animations",
    menu: "Open menu",
    close: "Close menu",
    avatar:
      "Ink illustration of Ryan with eyes that follow the cursor",
    source: "Visit website",
    current: "Now",
    focus: "Development · Design · People",
    more: "A little more about me",
  },
  es: {
    portfolio: "Portafolio personal",
    available: "Abierto a conexiones",
    intro: "Código con intención.",
    introItalic: "Experiencias con personalidad.",
    hello: "Mucho gusto, Ryan.",
    move: "Mueve el cursor. Te sigo.",
    scroll: "Desliza para conocerme",
    selected: "Proyectos",
    selectedItalic: "en línea.",
    projects: "Proyectos en línea",
    journey: "Cada paso,",
    journeyItalic: "una nueva perspectiva.",
    about: "La curiosidad es el",
    aboutItalic: "punto de partida.",
    skills: "Mi caja",
    skillsItalic: "de herramientas.",
    contact: "¿Creamos",
    contactItalic: "algo juntos?",
    back: "Volver arriba",
    theme: "Cambiar tema",
    motion: "Pausar animaciones",
    resume: "Activar animaciones",
    menu: "Abrir menú",
    close: "Cerrar menú",
    avatar:
      "Retrato ilustrado de Ryan a tinta, con ojos que siguen el cursor",
    source: "Visitar sitio",
    current: "Ahora",
    focus: "Desarrollo · Diseño · Personas",
    more: "Un poco más sobre mí",
  },
};
function saved(key, defaultValue) {
  try {
    return localStorage.getItem(key) || defaultValue;
  } catch {
    return defaultValue;
  }
}
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}
const Arrow = () => <span aria-hidden="true">↗</span>;
function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number} /</span>
      <span>{children}</span>
    </div>
  );
}
function ProjectArt({ project, index, status }) {
  return (
    <div className={`project-art live-art live-art-${project.key}`} aria-hidden="true">
      <span className="art-corner live-status"><i />{status}</span>
      <div className="live-art-lines" />
      <strong className="live-brand">{project.brand}<span>{project.subtitle}</span></strong>
      <span className="art-caption">{project.domain}</span>
      <span className="art-index">0{index + 1}</span>
    </div>
  );
}
export default function App() {
  const root = useRef(null);
  const [language, setLanguage] = useState(() => {
    const value = saved("language", "pt");
    return translations[value] ? value : "pt";
  });
  const [theme, setTheme] = useState(() =>
    saved("theme", "dark") === "light" ? "light" : "dark",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const systemReducedMotion = useReducedMotion();
  const reducedMotion = systemReducedMotion || paused;
  const content = translations[language];
  const copy = editorial[language];
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = language === "pt" ? "pt-BR" : language;
    try {
      localStorage.setItem("theme", theme);
      localStorage.setItem("language", language);
    } catch {
      /* Preferences are optional. */
    }
  }, [theme, language]);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menuOpen]);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      if (reducedMotion) return;
      gsap.from(".hero-enter", {
        y: 24,
        opacity: 0,
        duration: 1.15,
        stagger: 0.1,
        ease: "power3.out",
      });
      media.add(
        { desktop: "(min-width: 801px)", mobile: "(max-width: 800px)" },
        ({ conditions }) => {
          const mobile = conditions.mobile;
          const story = gsap.timeline({
            scrollTrigger: {
              trigger: ".story",
              start: "top top",
              end: "bottom 15%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
          story
            .to(".hero-copy", { autoAlpha: 0, y: -65, duration: 0.2 }, 0)
            .to(
              ".avatar-stage",
              {
                x: () =>
                  mobile
                    ? -window.innerWidth * 0.26
                    : -window.innerWidth * 0.265,
                y: () => (mobile ? -window.innerHeight * 0.12 : 12),
                scale: mobile ? 0.57 : 0.86,
                duration: 0.33,
                ease: "power2.inOut",
              },
              0.04,
            )
            .to(
              ".hero-halo",
              {
                x: () => -window.innerWidth * (mobile ? 0.26 : 0.265),
                scale: 0.82,
                duration: 0.33,
              },
              0.04,
            )
            .fromTo(
              ".story-intro",
              { autoAlpha: 0, y: 50 },
              { autoAlpha: 1, y: 0, duration: 0.23 },
              0.2,
            )
            .to(".story-intro", { autoAlpha: 0, y: -50, duration: 0.2 }, 0.8)
            .to(".avatar-stage", { autoAlpha: 0, y: -65, duration: 0.2 }, 0.8)
            .to(".hero-halo", { autoAlpha: 0, duration: 0.2 }, 0.8);
        },
      );
      gsap.utils.toArray(".reveal").forEach((element) =>
        gsap.from(element, {
          y: 45,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 93%", once: true },
        }),
      );
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, root);
    let active = true;
    document.fonts?.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    return () => {
      active = false;
      media.revert();
      context.revert();
    };
  }, [language, reducedMotion]);
  return (
    <div
      ref={root}
      className={`portfolio ${reducedMotion ? "motion-reduced" : ""}`}
    >
      <a className="skip-link" href="#sobre">
        {content.about.eyebrow}
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a
          href="#inicio"
          className="wordmark"
          aria-label="Ryan Teodoro — início"
        >
          rt<span>®</span>
        </a>
        <nav
          aria-label={language === "pt" ? "Navegação principal" : "Navigation"}
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          id="main-nav"
        >
          {content.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              <span className="nav-dot" />
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <select
            value={language}
            onChange={(event) => {
              setLanguage(event.target.value);
              setMenuOpen(false);
            }}
            aria-label={content.languageLabel}
          >
            {languages.map((lang) => (
              <option value={lang.code} key={lang.code}>
                {lang.code.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            className="icon-button theme-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={copy.theme}
            title={copy.theme}
          >
            {theme === "dark" ? "☼" : "◐"}
          </button>
          <button
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? copy.close : copy.menu}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "−" : "+"}
          </button>
        </div>
      </header>
      <main>
        <section className="story" id="inicio" aria-label={copy.portfolio}>
          <div className="story-sticky">
            <div className="hero-grid" aria-hidden="true" />
            <div className="hero-halo" aria-hidden="true" />
            <div className="hero-copy">
              <div className="hero-topline hero-enter">
                <span>
                  {copy.portfolio} — {new Date().getFullYear()}
                </span>
                <span className="status">
                  <i />
                  {copy.available}
                </span>
              </div>
              <h1 className="hero-name hero-enter">
                <span>RYAN</span>
                <span>
                  TEODORO<span className="name-asterisk">✳</span>
                </span>
              </h1>
              <div className="hero-caption hero-enter">
                <span className="small-cross">+</span>
                <p>
                  {content.hero.role}
                  <br />
                  <span>{copy.focus}</span>
                </p>
              </div>
              <a className="hero-project-link hero-enter" href="#projetos">
                <span>{content.hero.ctaPrimary}</span>
                <span className="round-arrow">
                  <Arrow />
                </span>
              </a>
              <div className="hero-bottom hero-enter">
                <a href="#sobre">
                  <span className="scroll-icon">↓</span>
                  {copy.scroll}
                </a>
                <span className="location">
                  {content.hero.location[0]} <span>↗ 23°33′ S</span>
                </span>
                <span className="hero-edition">
                  VOL. 01 / DIGITAL EXPLORATIONS
                </span>
              </div>
            </div>
            <div className="avatar-stage">
              <PortraitAvatar reducedMotion={reducedMotion} label={copy.avatar} />
              <div className="avatar-shadow" />
              <span className="avatar-caption">
                <span className="tracking-dot" />
                {copy.move}
              </span>
            </div>
            <div className="story-intro">
              <SectionLabel number="01">{copy.hello}</SectionLabel>
              <h2>
                {copy.intro}
                <br />
                <em>{copy.introItalic}</em>
              </h2>
              <p>{content.hero.description}</p>
              <a className="text-link" href="#sobre">
                {copy.more} <span>↓</span>
              </a>
            </div>
            {!systemReducedMotion && (
              <button
                className="motion-toggle"
                onClick={() => setPaused(!paused)}
                aria-pressed={paused}
                aria-label={paused ? copy.resume : copy.motion}
                title={paused ? copy.resume : copy.motion}
              >
                {paused ? "▷" : "Ⅱ"}
              </button>
            )}
          </div>
        </section>
        <section className="about-section section-wrap" id="sobre">
          <SectionLabel number="01">{content.about.eyebrow}</SectionLabel>
          <div className="about-layout">
            <div className="about-heading reveal">
              <h2 className="display-heading">
                {copy.about}
                <br />
                <em>{copy.aboutItalic}</em>
              </h2>
              <div className="about-signature">
                Ryan Teodoro <span>↗</span>
              </div>
              <span className="tiny-text">
                {content.hero.location.join(" / ")}
              </span>
            </div>
            <div className="about-text reveal">
              {content.about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <a
                className="text-link"
                href={content.hero.profile.href}
                target="_blank"
                rel="noreferrer"
              >
                GitHub <Arrow />
              </a>
            </div>
          </div>
          <div className="about-highlights">
            {content.about.highlights.map((item) => (
              <div key={item.heading} className="reveal">
                <h3>{item.heading}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <div className="intentions">
            {content.hero.cards.map((card, index) => (
              <div key={card.title}>
                <span className="tiny-text">
                  0{index + 1} / {card.title}
                </span>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="projects-section section-wrap" id="projetos">
          <div className="section-top">
            <SectionLabel number="02">{copy.projects}</SectionLabel>
            <span className="tiny-text">
              {String(content.projects.list.length).padStart(2, "0")} / {content.projects.status}
            </span>
          </div>
          <h2 className="display-heading reveal">
            {copy.selected}
            <br />
            <em>{copy.selectedItalic}</em>
          </h2>
          <div className="project-grid">
            {content.projects.list.map((project, index) => (
              <article className="project-card reveal" key={project.key}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="project-visual-link"
                  aria-label={`${copy.source}: ${project.name}`}
                >
                  <ProjectArt project={project} index={index} status={content.projects.status} />
                  <span className="project-open">
                    <Arrow />
                  </span>
                </a>
                <div className="project-meta">
                  <span>{project.tag}</span>
                  <span>0{index + 1} / {String(content.projects.list.length).padStart(2, "0")}</span>
                </div>
                <h3>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    {project.name}
                    <Arrow />
                  </a>
                </h3>
                <p>{project.description}</p>
                <a className="text-link project-visit" href={project.url} target="_blank" rel="noreferrer">
                  {content.projects.linkLabel} <Arrow />
                </a>
              </article>
            ))}
          </div>
        </section>
        <div className="marquee" aria-hidden="true">
          <div>
            CREATIVE MIND. DEVELOPER SOUL. <span>✳</span> CREATIVE MIND.
            DEVELOPER SOUL. <span>✳</span>
          </div>
        </div>
        <section className="journey-section section-wrap" id="experiencia">
          <SectionLabel number="03">{content.experience.eyebrow}</SectionLabel>
          <h2 className="display-heading reveal">
            {copy.journey}
            <br />
            <em>{copy.journeyItalic}</em>
          </h2>
          {content.experience.entries.map((entry, index) => (
            <div className="timeline-row reveal" key={`${entry.company}-${entry.role}`}>
              <div className="timeline-period">
                {entry.current && <span className="status"><i />{copy.current}</span>}
                <span>{entry.period}</span>
                <span>0{index + 1} /</span>
              </div>
              <div className="timeline-body">
                <h3>{entry.company}</h3>
                <span className="role-label">{entry.role}</span>
                <p className="tiny-text">{entry.location}</p>
                <ul>{entry.responsibilities.map((text) => <li key={text}>{text}</li>)}</ul>
              </div>
              <span className="timeline-arrow">↗</span>
            </div>
          ))}
          <div id="formacao" className="education-block">
            <SectionLabel number="04">{content.education.title}</SectionLabel>
            <div className="education-grid">
              {content.education.cards.map((card, index) => (
                <article key={card.title} className="reveal">
                  <span className="education-number">0{index + 1}</span>
                  <h3>{card.title}</h3>
                  {card.subtitle && (
                    <span className="role-label">{card.subtitle}</span>
                  )}
                  {card.description && <p>{card.description}</p>}
                  {card.bullets && (
                    <ul>
                      {card.bullets.map((text) => (
                        <li key={text}>{text}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
            <div className="certifications-block">
              <h3>{content.certifications.title}</h3>
              <div className="certification-list">
                {content.certifications.items.map((certificate, index) => (
                  <article className="certification-item reveal" key={certificate.name}>
                    <div className="certification-copy">
                    <span className="tiny-text">{certificate.issuer} · {certificate.date}</span>
                    <h4>{certificate.name}</h4>
                    {certificate.url && (
                      <a className="text-link" href={certificate.url} target="_blank" rel="noreferrer"
                        aria-label={`${content.certifications.linkLabel}: ${certificate.name}`}>
                        {content.certifications.linkLabel} <Arrow />
                      </a>
                    )}
                    </div>
                    <CertificationBadge name={certificate.name} index={index} />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="skills-section section-wrap" id="competencias">
          <SectionLabel number="05">{content.skills.eyebrow}</SectionLabel>
          <div className="skills-layout">
            <h2 className="display-heading reveal">
              {copy.skills}
              <br />
              <em>{copy.skillsItalic}</em>
              <span className="skills-star" aria-hidden="true">
                ✳
              </span>
            </h2>
            <div className="skill-groups">
              {content.skills.groups.map((group, index) => (
                <div className="skill-group reveal" key={group.key}>
                  <h3>
                    <span>0{index + 1}</span>
                    {group.title}
                  </h3>
                  <div className="skill-tags">
                    {group.items.map((item) => (
                      <span key={item.key}>{item.label}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="contact-section section-wrap" id="contato">
          <div className="section-top">
            <SectionLabel number="06">{content.contact.eyebrow}</SectionLabel>
            <span className="status">
              <i />
              {copy.available}
            </span>
          </div>
          <a className="contact-title reveal" href={content.contact.ctaHref}>
            <h2>
              {copy.contact}
              <br />
              <em>{copy.contactItalic}</em>
            </h2>
            <span className="contact-arrow">↗</span>
          </a>
          <div className="contact-bottom">
            <p>{content.contact.description}</p>
            <div className="contact-links">
              {content.contact.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {item.value}
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a className="wordmark" href="#inicio">
          rt<span>®</span>
        </a>
        <p>
          {content.footer.text.replace("{{year}}", new Date().getFullYear())}
        </p>
        <a href="#inicio">{copy.back} ↑</a>
      </footer>
    </div>
  );
}
