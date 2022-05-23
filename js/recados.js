const form = document.getElementById("form_lista");
const tabela = document.getElementById("tbody");
let editing = false;
let indiceParaEditar = 0;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const descricao = form.descricao.value;
  const detalhamento = form.detalhamento.value;

  const recados = pegarRecadosDoLocalStorage();

  if (editing) {
    recados[indiceParaEditar].descricao = form.descricao.value;
    recados[indiceParaEditar].detalhamento = form.detalhamento.value;
    editing = false;
  } else {
    recados.push({
      id: definirID(),
      descricao: descricao,
      detalhamento: detalhamento,
    });
  }

  salvarRecadosDoLocalStorage(recados);
  form.reset();
  preencherTabela();
});

function pegarRecadosDoLocalStorage() {
  return JSON.parse(localStorage.getItem("recados") ?? "[]");
}

function salvarRecadosDoLocalStorage(data) {
  localStorage.setItem("recados", JSON.stringify(data));
}

function preencherTabela() {
  const recados = pegarRecadosDoLocalStorage();
  tabela.innerHTML = ``;

  for (const recado of recados) {
    tabela.innerHTML += `
        <tr>
            <td>${recado.id}</td>
            <td>${recado.descricao}</td>
            <td>${recado.detalhamento}</td>
            <td>
            <button class="btn_login" id="botaoEditar" onclick="editarRecado(${recado.id})">Editar</button>
            <button class="btn_login" id="botaoApagar" onclick="removeRecado(${recado.id})">Apagar</button>
            </td>
        </tr>
        `;
  }
}

preencherTabela();

const removeRecado = (id) => {
  const recados = pegarRecadosDoLocalStorage();

  const indiceRecado = recados.findIndex((recado) => recado.id === id);

  if (indiceRecado < 0) return;

  recados.splice(indiceRecado, 1);
  salvarRecadosDoLocalStorage(recados);
  alert("Recado removido!");

  preencherTabela();
};

const definirID = () => {
  let max = 0;

  const recados = pegarRecadosDoLocalStorage();

  recados.forEach((recado) => {
    if (recado.id > max) {
      max = recado.id;
    }
  });

  return max + 1;
};

const editarRecado = (id) => {
  const recados = pegarRecadosDoLocalStorage();
  const indiceRecado = recados.findIndex((recado) => recado.id === id);
  if (indiceRecado < 0) return;
  form.descricao.value = recados[indiceRecado].descricao;
  form.detalhamento.value = recados[indiceRecado].detalhamento;

  editing = true;
  indiceParaEditar = indiceRecado;
};
