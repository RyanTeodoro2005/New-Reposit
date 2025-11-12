export default function ContactSection({ content, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const eyebrow = content?.eyebrow ?? 'Contato';
  const title = content?.title ?? '';
  const description = content?.description ?? '';
  const cta = content?.cta ?? 'Enviar e-mail';
  const ctaHref = content?.ctaHref ?? 'mailto:ryanbryansilvateodoro@gmail.com';
  const items = content?.items ?? [];

  return (
    <section id="contato" className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-400">{eyebrow}</p>
        {title && <h2 className={`text-3xl font-semibold ${isDark ? '' : 'text-slate-900'}`}>{title}</h2>}
      </header>
      <div
        className={`rounded-[32px] border p-8 shadow-xl transition ${
          isDark
            ? 'border-sky-500/30 bg-gradient-to-br from-sky-500/30 via-sky-400/10 to-cyan-500/10 backdrop-blur'
            : 'border-slate-300 bg-gradient-to-br from-white via-sky-100/40 to-sky-200/40'
        }`}
      >
        {description && (
          <p className={`text-base leading-relaxed ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>
            {description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] shadow-lg transition ${
              isDark
                ? 'bg-sky-500 text-white shadow-sky-500/30 hover:bg-sky-400'
                : 'bg-sky-500 text-white shadow-sky-400/40 hover:bg-sky-400'
            }`}
            href={ctaHref}
          >
            {cta}
          </a>
        </div>
        {items.length > 0 && (
          <ul className={`mt-6 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            {items.map(({ label, value, href }) => (
              <li key={`${label}-${value}`}>
                <span className={`block text-xs font-semibold uppercase tracking-[0.3em] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{label}</span>
                <a
                  className={`mt-1 inline-flex items-center transition ${
                    isDark ? 'text-slate-100 hover:text-sky-300' : 'text-slate-800 hover:text-sky-600'
                  }`}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {value}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
