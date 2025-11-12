# Portfólio – Ryan Teodoro

> Landing page responsiva construída com React + Vite para apresentar experiências, projetos e competências com identidade moderna e suporte a múltiplos idiomas.

## ✨ Visão Geral

Este projeto nasceu com foco em apresentar o perfil profissional de Ryan Teodoro. O layout prioriza clareza, personalização por tema (claro/escuro) e rápida navegação, mantendo boas práticas de acessibilidade, semântica e performance.

### Principais seções

- **Hero**: destaque para nome, papel profissional, foto, CTA e dados de contato.
- **Sobre**: narrativa de carreira, valores e diferenciais.
- **Experiência** e **Formação**: histórico acadêmico e profissional com detalhes relevantes.
- **Skills**: divisão em linguagens, ferramentas e competências, exibindo logos oficiais.
- **Projetos**: links diretos para repositórios GitHub com breve descrição.
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
   - Vite abrirá o servidor em `http://localhost:5173/New-Reposit/`.
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
   - Certifique-se de que `vite.config.js` possui `base: '/New-Reposit/'` para caminhos relativos corretos.

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
