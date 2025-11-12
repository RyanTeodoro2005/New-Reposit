export default function ExperienceSection({ content, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const eyebrow = content?.eyebrow ?? 'Experiência';
  const title = content?.title ?? '';
  const role = content?.role ?? '';
  const period = content?.period ?? '';
  const company = content?.company ?? '';
  const responsibilities = content?.responsibilities ?? [];

  return (
    <section id="experiencia" className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-400">{eyebrow}</p>
        {title && <h2 className={`text-3xl font-semibold ${isDark ? '' : 'text-slate-900'}`}>{title}</h2>}
      </header>
      <article
        className={`rounded-3xl p-6 shadow-lg backdrop-blur border ${
          isDark ? 'border-white/15 bg-white/5' : 'border-slate-200 bg-white'
        }`}
      >
        <header className="mb-5 space-y-2">
          {role && <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{role}</h3>}
          {(period || company) && (
            <div className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {period && <span>{period}</span>}
              {period && company && <span className="mx-2">·</span>}
              {company && <span>{company}</span>}
            </div>
          )}
        </header>
        <ul className={`space-y-2 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {responsibilities.map((responsibility) => (
            <li key={responsibility} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400" />
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
