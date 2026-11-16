# Integração JS, HTML5 e CSS3 — Lista de Tarefas

Aplicação web interativa de gerenciamento de tarefas desenvolvida com HTML5 semântico (`<template>`), CSS3 moderno (variáveis CSS, seletores `data-*` e animações) e JavaScript Vanilla (manipulação segura do DOM e `localStorage`).

## Comparativo: Antes e Depois

| Arquivo | Estado Inicial (`v0.1-antes`) | Estado Final (`v1.0-depois`) |
| :--- | :--- | :--- |
| **`index.html`** | Script apontava para `js/app.js` inexistente, atributo `aria-label` sem aspas de fechamento e falhas de encoding UTF-8 (`M dia`, `Conclu`). | Importação corrigida para `js/index.js`, atributos HTML/ARIA fechados corretamente e acentuação UTF-8 restaurada. |
| **`css/estilo.css`** | Chaves de fechamento `}` ausentes em todos os blocos CSS e seletor universal quebrado, impedindo layout e temas. | Sintaxe CSS restaurada, variáveis `:root` funcionais, bordas dinâmicas por prioridade (`data-prioridade`) e modo escuro (`body.tema-escuro`). |
| **`js/index.js`** | Contia apenas `console.log(document.querySelector("h1"));` sem funcionalidades. | CRUD completo com validação inline (3 a 60 caracteres), filtros (`Todas`, `Pendentes`, `Concluídas`), limpeza em lote, tema persistente e prevenção de XSS via `textContent`. |

## Como Executar
1. Clone o repositório:
   `git clone https://github.com/wllslz/integrecao-js-html5-css3.git`
2. Abra o arquivo `index.html` diretamente no navegador.
