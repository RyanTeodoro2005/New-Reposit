import {
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiTypescript,
  SiReact,
  SiAngular,
  SiBootstrap,
  SiGit,
  SiFigma,
  SiPostgresql,
  SiNodedotjs,
  SiAwsorganizations,
  SiGoogle,
  SiNotion,
} from 'react-icons/si';
import { FaDatabase, FaJava, FaRobot } from 'react-icons/fa';
import { TbDeviceMobileCheck, TbHeadset, TbArrowsShuffle } from 'react-icons/tb';
import { LuFileStack } from 'react-icons/lu';
import { PiChatsCircleBold } from 'react-icons/pi';

const iconByKey = {
  html: SiHtml5,
  js: SiJavascript,
  sql: FaDatabase,
  ts: SiTypescript,
  react: SiReact,
  angular: SiAngular,
  bootstrap: SiBootstrap,
  java: FaJava,
  git: SiGit,
  figma: SiFigma,
  postgres: SiPostgresql,
  mysql: SiMysql,
  node: SiNodedotjs,
  aws: SiAwsorganizations,
  workspace: SiGoogle,
  notion: SiNotion,
  workvivo: null,
  responsive: TbDeviceMobileCheck,
  docs: LuFileStack,
  support: TbHeadset,
  communication: PiChatsCircleBold,
  agile: TbArrowsShuffle,
  ai: FaRobot,
};

export default function SkillsSection({ content, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const eyebrow = content?.eyebrow ?? 'Competências';
  const title = content?.title ?? '';
  const groups = content?.groups ?? [];

  return (
    <section id="competencias" className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-400">{eyebrow}</p>
        {title && <h2 className={`text-3xl font-semibold ${isDark ? '' : 'text-slate-900'}`}>{title}</h2>}
      </header>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {groups.map(({ key, title: groupTitle, items }) => (
          <SkillGroup key={key} title={groupTitle} items={items} theme={theme} />
        ))}
      </div>
    </section>
  );
}

function SkillGroup({ title, items, theme = 'dark' }) {
  const isDark = theme === 'dark';
  return (
    <article
      className={`rounded-3xl p-6 backdrop-blur border ${
        isDark ? 'border-white/15 bg-white/5' : 'border-slate-200 bg-white'
      }`}
    >
      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map(({ label, key }) => (
          <span
            key={key}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${
              isDark
                ? 'border-sky-500/40 bg-sky-500/10 text-slate-100'
                : 'border-sky-400/60 bg-sky-100/60 text-slate-800'
            }`}
          >
            <SkillIcon iconKey={key} label={label} />
            <span>{label}</span>
          </span>
        ))}
      </div>
    </article>
  );
}

function SkillIcon({ iconKey, label }) {
  const IconComponent = iconByKey[iconKey];

  if (!IconComponent) {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/80 text-xs font-bold text-white">
        {label.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return <IconComponent aria-hidden className="h-5 w-5" />;
}
