# Portfólio – Ryan Teodoro

> Landing page responsiva construída com React + Vite para apresentar experiências, projetos e competências com identidade moderna e suporte a múltiplos idiomas.

## Reformulação visual — 2026

A abertura exibe `src/assets/portrait-ink.png`, a ilustração aprovada. O componente `PortraitAvatar` usa íris SVG independentes, com acabamento de tinta, dentro de máscaras alinhadas às aberturas dos olhos. As pálpebras originais permanecem fixas e o olhar acompanha o cursor com deslocamento limitado. O retrato recebe apenas uma pequena translação e inclinação em 2D. O site não carrega modelo 3D, Three.js ou WebGL. GSAP ScrollTrigger mantém a sequência de deslocamento e saída do retrato.

Os scripts de estudo 3D estão preservados em `scripts`. Os arquivos de trabalho do Blender e as referências em `design/avatar` são locais e não fazem parte do site publicado. Esses estudos não são necessários para rodar o portfólio.

- `src/components/PortraitAvatar.jsx`: imagem, máscaras das pálpebras, íris e movimento 2D. A animação só roda enquanto o olhar está se ajustando e é suspensa fora da tela ou com a aba oculta.
- `src/App.jsx`: composição editorial, navegação responsiva e sequência de scroll.
- `src/index.css`: direção visual vinho/grafite/marfim, temas e breakpoints.
- `src/data/i18n.js`: conteúdo atualizado conforme o currículo de 2026, com traduções PT/EN/ES, experiência Full Stack na Alest, formação e sete certificações.
- `src/components/CertificationBadge.jsx`: badges com volume seguindo seu contorno, frente e verso, giro de 360° e flutuação em CSS 3D. Respeita pausa e movimento reduzido.

O botão de pausa e a preferência `prefers-reduced-motion` exibem a imagem original estática e mantêm o conteúdo visível. Toques não acionam o olhar. As capas dos projetos são composições gráficas editoriais, não capturas dos projetos.

Execute `npm install` e `npm run dev`. A versão local abre em `http://localhost:5173/`. `npm run build` gera o resultado em `dist/`.

## ✨ Visão Geral

Este projeto nasceu com foco em apresentar o perfil profissional de Ryan Teodoro. O layout prioriza clareza, personalização por tema (claro/escuro) e rápida navegação, mantendo boas práticas de acessibilidade, semântica e performance.

### Principais seções

- **Hero**: destaque para nome, papel profissional, foto, CTA e dados de contato.
- **Sobre**: narrativa de carreira, valores e diferenciais.
- **Experiência** e **Formação**: histórico acadêmico e profissional com detalhes relevantes.
- **Skills**: linguagens, ferramentas e competências, com foco em .NET, C#, Vue.js, TypeScript e PostgreSQL.
- **Projetos no ar**: J.J Manutenção de Empilhadeiras e Fernando Laqueações, com links diretos para os sites.
- **Certificações**: sete badges oficiais com efeitos de profundidade, rotação e flutuação.
- **Contato** e **Footer**: canais diretos e créditos.

## 🛠️ Stack Tecnológica

| Categoria           | Tecnologias / Ferramentas |
|---------------------|---------------------------|
| Front-end           | React 18, Vite 5 |
| Estilo & UI         | Tailwind CSS 3, animações utilitárias |
| Ícones              | `react-icons` (Simple Icons, FontAwesome, Tabler, Phosphor) |
| Build & Dev Server  | Vite (`npm run dev`, `npm run build`) |
| Deploy              | GitHub Pages (`gh-pages` npm package) |
| Organização         | Scripts npm, estrutura modular em `/src/components` |

### Metodologias aplicadas

- **Design responsivo e mobile-first**: grids fluidas, breakpoints Tailwind.
- **Acessibilidade e semântica**: landmarks (`header`, `main`, `section`), contraste ajustado, aria-labels.
- **Internacionalização (i18n)**: conteúdo centralizado em `src/data/i18n.js` com suporte a PT, EN e ES.
- **Controle de tema**: persistência do tema claro/escuro via `localStorage` e `prefers-color-scheme`.
- **Mentalidade AI-First**: evidenciada na narrativa e nas competências técnicas.

## 📂 Estrutura de pastas

```
src/
├─ assets/               # imagens (foto de perfil)
├─ components/           # componentes reutilizáveis (Hero, Navbar, Skills, etc.)
├─ data/
│  ├─ content.js         # dados estáticos legados
│  └─ i18n.js            # textos e skills por idioma
├─ index.css             # estilos globais e utilitários
├─ main.jsx              # bootstrap do React
└─ App.jsx               # composição das seções e controle de tema/idioma
```

## 🚀 Como rodar localmente

1. **Pré-requisitos**
   - Node.js 18+ (recomendado usar `nvm` ou `fnm`)
   - NPM 9+

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Rodar em modo desenvolvimento**
   ```bash
   npm run dev
   ```
   - Vite abrirá o servidor em `http://localhost:5173/`.
   - Suporta hot module replacement (HMR).

4. **Gerar build de produção**
   ```bash
   npm run build
   ```
   - Resultado será emitido em `dist/`.

5. **Pré-visualizar build**
   ```bash
   npm run preview
   ```

## 🌐 Deploy no GitHub Pages

Há dois caminhos possíveis:

1. **Script automático (`npm run deploy`)**
   - Executa `npm run build` e publica `dist/` com o pacote `gh-pages`.
   - Em Windows, se ocorrer `spawn ENAMETOOLONG`, utilize o fluxo manual abaixo.

2. **Fluxo manual com `git subtree`**
   ```bash
   npm run build
   git checkout -b deploy-temp
   git add dist
   git commit -m "chore: deploy build"
   git subtree split --prefix dist -b gh-pages-deploy
   git push origin gh-pages-deploy:gh-pages --force
   git checkout main
   git branch -D deploy-temp gh-pages-deploy
   ```
   - Este processo gera um snapshot da pasta `dist/` e força o branch `gh-pages` a ser atualizado.
   - `vite.config.js` usa `base: './'` para que os assets funcionem também no caminho `/New-Reposit/` do GitHub Pages.

Após o push, aguarde alguns minutos e acesse: **https://ryanteodoro2005.github.io/New-Reposit/**.

## 🧪 Boas práticas adotadas

- Componentização semântica e reutilizável.
- State management simples com Hooks (`useState`, `useMemo`, `useEffect`).
- Persistência de preferências (tema e idioma) no `localStorage`.
- Conteúdo textual separado da view, facilitando manutenção e tradução.
- Build enxuto com Vite + tree shaking de ícones.

## 📬 Contato

Se tiver sugestões ou encontrar problemas, abra uma issue ou entre em contato pelo e-mail **ryanbryansilvateodoro@gmail.com**.

---

> Desenvolvido com foco em código limpo, performance e uma mentalidade AI First para acelerar entregas e gerar valor real.
