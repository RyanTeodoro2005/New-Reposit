export default function EducationSection({ content, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const eyebrow = content?.eyebrow ?? 'Formação';
  const title = content?.title ?? '';
  const cards = content?.cards ?? [];
  return (
    <section id="formacao" className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-400">{eyebrow}</p>
        {title && <h2 className={`text-3xl font-semibold ${isDark ? '' : 'text-slate-900'}`}>{title}</h2>}
      </header>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ title: cardTitle, subtitle, description, bullets }) => (
          <article
            key={cardTitle}
            className={`rounded-3xl p-6 border ${
              isDark
                ? 'border-white/15 bg-white/5 backdrop-blur'
                : 'border-slate-300 bg-white/95 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.25)]'
            }`}
          >
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{cardTitle}</h3>
            {subtitle && <p className={`mt-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{subtitle}</p>}
            {description && (
              <p className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{description}</p>
            )}
            {bullets && (
              <ul className={`mt-4 space-y-2 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {bullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${isDark ? 'bg-sky-400' : 'bg-sky-500'}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
