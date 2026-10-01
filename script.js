const URL_API = "http://localhost:3000/jogos";

const dashTotal = document.querySelector("#dashTotal");
const dashJogando = document.querySelector("#dashJogando");
const dashFinalizados = document.querySelector("#dashFinalizados");

const inputPesquisa = document.querySelector("#inputPesquisa");
const selectFiltroStatus = document.querySelector("#selectFiltroStatus");

const formJogo = document.querySelector("#formJogo");
const jogoId = document.querySelector("#jogoId");
const inputTitulo = document.querySelector("#inputTitulo");
const inputGenero = document.querySelector("#inputGenero");
const inputPlataforma = document.querySelector("#inputPlataforma");
const inputNota = document.querySelector("#inputNota");
const selectStatusForm = document.querySelector("#selectStatusForm");
const btnSalvar = document.querySelector("#btnSalvar");

const containerJogos = document.querySelector("#containerJogos");

let listaJogos = [];

const carregarJogos = () => {
    fetch(URL_API)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Erro na conexão com a API");
            }
            return resposta.json();
        })
        .then(jogos => {
            listaJogos = jogos;
            aplicarFiltros();
            atualizarDash(jogos);
        })
        .catch(erro => console.error(erro));
};

const renderizarJogos = (jogos) => {
    containerJogos.innerHTML = "";
    jogos.forEach(jogo => {
        const card = document.createElement("div");
        card.classList.add("cardJogo");
        card.innerHTML = `
            <h3>${jogo.titulo}</h3>
            <p><strong>Gênero:</strong> ${jogo.genero}</p>
            <p><strong>Plataforma:</strong> ${jogo.plataforma}</p>
            <p><strong>Nota:</strong> ${jogo.nota}</p>
            <p><strong>Status:</strong> ${jogo.status}</p>
            <button onclick="prepararEdicao('${jogo.id}')">Editar</button>
            <button onclick="excluirJogo('${jogo.id}')">Excluir</button>
        `;
        containerJogos.appendChild(card);
    });
};

const atualizarDash = (jogos) => {
    const total = jogos.length;
    const jogando = jogos.filter(j => j.status === "Jogando").length;
    const finalizados = jogos.filter(j => j.status === "Finalizado").length;

    dashTotal.textContent = `Total: ${total}`;
    dashJogando.textContent = `Jogando: ${jogando}`;
    dashFinalizados.textContent = `Finalizados: ${finalizados}`;
};

const aplicarFiltros = () => {
    const texto = inputPesquisa.value.toLowerCase();
    const status = selectFiltroStatus.value;

    const jogosFiltrados = listaJogos.filter(jogo => {
        const bateuTexto = jogo.titulo.toLowerCase().includes(texto);
        const bateuStatus = status === "Todos" || jogo.status === status;
        return bateuTexto && bateuStatus;
    });

    renderizarJogos(jogosFiltrados);
};

const prepararEdicao = (id) => {
    fetch(`${URL_API}/${id}`)
        .then(resposta => {
            if (!resposta.ok) throw new Error("Erro ao buscar jogo.");
            return resposta.json();
        })
        .then(jogo => {
            jogoId.value = jogo.id;
            inputTitulo.value = jogo.titulo;
            inputGenero.value = jogo.genero;
            inputPlataforma.value = jogo.plataforma;
            inputNota.value = jogo.nota;
            selectStatusForm.value = jogo.status;

            btnSalvar.textContent = "Atualizar Jogo";
        })
        .catch(erro => console.error(erro));
};

const excluirJogo = (id) => {
    if (confirm("Tem certeza que deseja excluir este jogo?")) {
        fetch(`${URL_API}/${id}`, {
            method: "DELETE"
        })
        .then(resposta => {
            if (!resposta.ok) throw new Error("Erro ao excluir o jogo.");
            carregarJogos();
        })
        .catch(erro => console.error(erro));
    }
};

formJogo.addEventListener("submit", (event) => {
    event.preventDefault();

    const dadosJogo = {
        titulo: inputTitulo.value,
        genero: inputGenero.value,
        plataforma: inputPlataforma.value,
        nota: Number(inputNota.value),
        status: selectStatusForm.value
    };

    if (jogoId.value) {
        fetch(`${URL_API}/${jogoId.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosJogo)
        })
        .then(resposta => {
            if (!resposta.ok) throw new Error("Erro ao atualizar jogo.");
            return resposta.json();
        })
        .then(() => {
            formJogo.reset();
            jogoId.value = "";
            btnSalvar.textContent = "Salvar Jogo";
            carregarJogos();
        })
        .catch(erro => console.error(erro));
    } else {
        fetch(URL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosJogo)
        })
        .then(resposta => {
            if (!resposta.ok) throw new Error("Erro ao cadastrar jogo.");
            return resposta.json();
        })
        .then(() => {
            formJogo.reset();
            carregarJogos();
        })
        .catch(erro => console.error(erro));
    }
});

inputPesquisa.addEventListener("input", aplicarFiltros);
selectFiltroStatus.addEventListener("change", aplicarFiltros);

document.addEventListener("DOMContentLoaded", carregarJogos);