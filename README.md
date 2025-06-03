# Estudos IA - Projeto React + Vite + TypeScript

Este repositório contém um projeto completo de front-end moderno, configurado para servir como base para aplicações React robustas, escaláveis e acessíveis. O projeto foi pensado para facilitar o desenvolvimento, testes, documentação, deploy e boas práticas de código.

Está servido de estudo, onde posso estou criando "quase tudo" via prompt do github copilot. O intuito é explorar ao máximo essa tecnologia pra que eu consiga depois criar um artigo com minhas percepções sobre o teama.

## Principais Tecnologias e Ferramentas

- **React 19 + Vite**: Estrutura moderna, rápida e com hot reload.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Material UI (MUI)**: Componentes visuais acessíveis e personalizáveis.
- **React Router DOM**: Navegação SPA com suporte a subdiretórios (basename dinâmico).
- **ESLint + Prettier**: Linting e formatação automática, incluindo regras de acessibilidade (jsx-a11y).
- **Vitest**: Testes unitários rápidos e integrados ao Vite.
- **Cypress**: Testes E2E automatizados.
- **Storybook**: Documentação interativa de componentes, com suporte a testes e acessibilidade.
- **EditorConfig**: Padronização de estilo entre editores.
- **GitHub Actions**: CI/CD para lint, testes, build e deploy automático no GitHub Pages.

## Estrutura do Projeto

```
├── src/
│   ├── components/         # Componentes reutilizáveis (ex: ColorText, Page)
│   ├── pages/              # Páginas principais (Home, FaleConosco)
│   ├── stories/            # Stories do Storybook
│   ├── themes.ts           # Temas light/dark do MUI
│   ├── ThemeWrapper.tsx    # Provider de tema e router
│   ├── App.tsx             # Layout principal e rotas
│   └── main.tsx            # Entry point
├── cypress/                # Testes E2E
├── .github/workflows/      # Workflows de CI/CD
├── .eslintrc.json          # Configuração do ESLint
├── package.json            # Scripts e dependências
├── vite.config.ts          # Configuração do Vite
└── README.md               # Este arquivo
```

## Funcionalidades e Configurações

- **Dark/Light Mode**: Alternância dinâmica de tema, com MUI.
- **Rotas SPA**: Suporte a subdiretório (`/estudos-ia/`) para deploy no GitHub Pages.
- **Componentes de Exemplo**: Inclui `ColorText` e exemplos de uso do MUI.
- **Testes Unitários**: Cobertura com Vitest, incluindo exemplos de interação.
- **Testes E2E**: Fluxos automatizados com Cypress (ex: alternância de tema, navegação).
- **Acessibilidade**: Lint com `eslint-plugin-jsx-a11y` e Storybook com addon a11y.
- **Documentação de Componentes**: Storybook com exemplos, playground e testes.
- **CI/CD**: Workflow único para lint, testes, build e deploy automático no GitHub Pages.
- **Deploy**: Site publicado em [https://deividmarques.github.io/estudos-ia/](https://deividmarques.github.io/estudos-ia/)

## Scripts Úteis

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera o build de produção
- `npm run preview` — Visualiza o build localmente
- `npm run lint` — Lint completo (inclui acessibilidade)
- `npm run lint:a11y` — Mostra apenas problemas de acessibilidade
- `npm run lint:fix` — Corrige problemas de lint e formata com Prettier
- `npm run test` — Roda testes unitários (Vitest)
- `npm run coverage` — Gera relatório de cobertura
- `npm run doc` — Inicia o Storybook
- `npm run build-doc` — Gera build estático do Storybook
- `npm run cypress:open` — Abre o Cypress para testes E2E
- `npm run cypress:run` — Roda testes E2E em modo headless

## Testes e Qualidade

- **Lint**: ESLint com regras para React, TypeScript, Prettier e acessibilidade.
- **Acessibilidade**: Regras automáticas via lint e Storybook.
- **Testes Unitários**: Cobertura mínima garantida via thresholds no Vitest.
- **Testes E2E**: Fluxos críticos automatizados com Cypress.
- **CI/CD**: Todos os checks são obrigatórios antes do deploy.

## Deploy no GitHub Pages

- O deploy é feito automaticamente via GitHub Actions a cada push na branch principal.
- O build considera o subdiretório `/estudos-ia/` para funcionar corretamente no Pages.
- O arquivo `.nojekyll` é criado automaticamente para evitar problemas com arquivos/pastas iniciados com `_`.

## Acessibilidade

- Uso de MUI, que já segue boas práticas de acessibilidade.
- Lint automático com `eslint-plugin-jsx-a11y`.
- Storybook com addon de acessibilidade.
- Títulos de página dinâmicos para melhor navegação por leitores de tela.

## Como contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature/fix: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: minha feature'`
4. Push para o branch: `git push origin minha-feature`
5. Abra um Pull Request

---

Dúvidas, sugestões ou problemas? Abra uma issue ou entre em contato!

Um abraço Deivid Marques - DvD 
