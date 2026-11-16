# Diário de Desenvolvimento — Integração JS, HTML5 e CSS3

**Autor:** Willian Lira de Souza (`wllslz`)  
**Turma:** ADS 2026.15.11 — SENAC  

## Registro de Atividades

### 16/11/2026 — Auditoria, Refatoração e Versionamento
- **Diagnóstico (`v0.1-antes`):** Identificados erros de referência de script (`js/app.js`), ausência de chaves `}` no CSS, corrupção de caracteres UTF-8 no HTML e ausência de lógica no JavaScript.
- **Refatoração HTML/CSS:** Padronizado encoding UTF-8, corrigido carregamento de `js/index.js` com `defer` e restaurada a cascata de estilos e variáveis CSS.
- **Implementação JS:** Desenvolvido gerenciamento de estado em memória sincronizado com `localStorage`, sanitização contra XSS usando `textContent` e animação de saída (`animationend`) antes de remover nós do DOM.
- **Documentação:** Criados `README.md` com tabela comparativa Antes/Depois, `CHANGELOG.md` e este `DIARIO.md` para acompanhamento contínuo.
