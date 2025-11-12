export default function Footer({ year, theme = 'dark', content }) {
  const isDark = theme === 'dark';
  const template = content?.text ?? '© {{year}} Ryan Teodoro. Construído com foco em código limpo e design responsivo.';
  const message = template.replace('{{year}}', year);

  return (
    <footer
      className={`mt-20 border-t py-8 text-center text-sm transition-colors ${
        isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
      }`}
    >
      {message}
    </footer>
  );
}
