export default function ProjectsSection({ content, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const eyebrow = content?.eyebrow ?? 'Projetos';
  const title = content?.title ?? '';
  const list = content?.list ?? [];
  const linkLabel = content?.linkLabel ?? 'Ver no GitHub';

  return (
    <section id="projetos" className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-400">{eyebrow}</p>
        {title && <h2 className={`text-3xl font-semibold ${isDark ? '' : 'text-slate-900'}`}>{title}</h2>}
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {list.map(({ key, name, tag, description, url }) => (
          <article
            key={key ?? name}
            className={`rounded-3xl p-6 shadow-lg backdrop-blur border ${
              isDark ? 'border-white/15 bg-white/5' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
              {tag && (
                <span className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sky-500">
                  {tag}
                </span>
              )}
            </div>
            {description && (
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
            )}
            {url && (
              <a
                className={`mt-4 inline-flex items-center text-sm font-semibold transition ${
                  isDark ? 'text-slate-100 hover:text-sky-300' : 'text-slate-700 hover:text-sky-500'
                }`}
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                {linkLabel}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
