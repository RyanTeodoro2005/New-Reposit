export default function AboutSection({ content, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const eyebrow = content?.eyebrow ?? 'Sobre mim';
  const title = content?.title ?? '';
  const paragraphs = content?.paragraphs ?? [];
  const highlights = content?.highlights ?? [];

  return (
    <section id="sobre" className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-400">{eyebrow}</p>
        {title && <h2 className={`text-3xl font-semibold ${isDark ? '' : 'text-slate-900'}`}>{title}</h2>}
      </header>
      <div className="grid gap-8 items-start lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)]">
        <div className="space-y-6 text-left">
          {paragraphs.map((text, index) => (
            <p key={index} className={`${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
              {text}
            </p>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {highlights.map(({ heading, description }) => (
            <article
              key={heading}
              className={`rounded-3xl p-5 backdrop-blur border ${
                isDark ? 'border-white/15 bg-white/5' : 'border-slate-200 bg-white'
              }`}
            >
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{heading}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
