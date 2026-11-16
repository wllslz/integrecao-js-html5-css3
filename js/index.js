document.addEventListener("DOMContentLoaded", () => {
  const formTarefa = document.getElementById("form-tarefa");
  const inputTarefa = document.getElementById("input-tarefa");
  const selectPrioridade = document.getElementById("select-prioridade");
  const mensagemErro = document.getElementById("mensagem-erro");
  const listaTarefas = document.querySelector(".lista-tarefas");
  const templateTarefa = document.getElementById("tpl-tarefa");
  const botoesFiltro = document.querySelectorAll(".btn-filtro");
  const btnLimparConcluidas = document.getElementById("btn-limpar-concluidas");
  const btnTema = document.getElementById("btn-tema");

  const PRIORIDADES_VALIDAS = ["baixa", "media", "alta"];
  let filtroAtual = "todas";
  let tarefas = JSON.parse(localStorage.getItem("tarefas_app")) || [];

  // Carregar preferência de tema
  if (localStorage.getItem("tema_app") === "escuro") {
    document.body.classList.add("tema-escuro");
  }

  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-escuro");
    const temaAtivo = document.body.classList.contains("tema-escuro")
      ? "escuro"
      : "claro";
    localStorage.setItem("tema_app", temaAtivo);
  });

  function salvarTarefas() {
    localStorage.setItem("tarefas_app", JSON.stringify(tarefas));
  }

  function exibirErro(texto) {
    mensagemErro.textContent = texto;
    mensagemErro.classList.remove("oculto");
  }

  function limparErro() {
    mensagemErro.textContent = "";
    mensagemErro.classList.add("oculto");
  }

  function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    const tarefasFiltradas = tarefas.filter((tarefa) => {
      if (filtroAtual === "pendentes") return !tarefa.concluida;
      if (filtroAtual === "concluidas") return tarefa.concluida;
      return true;
    });

    tarefasFiltradas.forEach((tarefa) => {
      const clone = templateTarefa.content.cloneNode(true);
      const li = clone.querySelector(".tarefa");
      const checkbox = clone.querySelector(".tarefa__check");
      const spanTexto = clone.querySelector(".tarefa__texto");
      const btnRemover = clone.querySelector(".tarefa__remover");

      const prioridadeSegura = PRIORIDADES_VALIDAS.includes(tarefa.prioridade)
        ? tarefa.prioridade
        : "media";

      li.dataset.prioridade = prioridadeSegura;
      if (tarefa.concluida) {
        li.classList.add("concluida");
      }

      checkbox.checked = tarefa.concluida;
      spanTexto.textContent = tarefa.texto;

      checkbox.addEventListener("change", () => {
        tarefa.concluida = checkbox.checked;
        salvarTarefas();
        renderizarTarefas();
      });

      btnRemover.addEventListener("click", () => {
        li.classList.add("saindo");
        li.addEventListener(
          "animationend",
          () => {
            tarefas = tarefas.filter((t) => t.id !== tarefa.id);
            salvarTarefas();
            renderizarTarefas();
          },
          { once: true }
        );
      });

      listaTarefas.appendChild(clone);
    });
  }

  formTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const texto = inputTarefa.value.trim();

    if (texto.length < 3) {
      exibirErro("A tarefa deve ter pelo menos 3 caracteres.");
      inputTarefa.focus();
      return;
    }

    if (texto.length > 60) {
      exibirErro("A tarefa deve ter no máximo 60 caracteres.");
      inputTarefa.focus();
      return;
    }

    limparErro();

    tarefas.push({
      id: Date.now(),
      texto,
      prioridade: selectPrioridade.value,
      concluida: false,
    });

    salvarTarefas();
    renderizarTarefas();
    formTarefa.reset();
    inputTarefa.focus();
  });

  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      botoesFiltro.forEach((b) => b.classList.remove("ativo"));
      botao.classList.add("ativo");
      filtroAtual = botao.dataset.filtro;
      renderizarTarefas();
    });
  });

  btnLimparConcluidas.addEventListener("click", () => {
    tarefas = tarefas.filter((tarefa) => !tarefa.concluida);
    salvarTarefas();
    renderizarTarefas();
  });

  renderizarTarefas();
});
