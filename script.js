/**
 * SISTEMA AUTOMÁTICO E MODERNO DE ABAS (TABS)
 * Desenvolvido com Event Listeners para garantir escalabilidade e segurança.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Captura todos os botões e conteúdos do ecrã
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Adiciona o evento de clique a cada um dos botões de forma dinâmica
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            
            // 1. Remove a classe 'active' de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 2. Remove a classe 'active' de todos os blocos de conteúdo
            tabContents.forEach(content => content.classList.remove('active'));

            // 3. Adiciona a classe 'active' apenas ao botão que foi clicado
            e.currentTarget.classList.add('active');

            // 4. Pega o valor do atributo 'data-tab' do botão clicado
            const targetId = e.currentTarget.getAttribute('data-tab');
            
            // 5. Procura a div que tem o ID correspondente
            const targetContent = document.getElementById(targetId);
            
            // 6. Se a div existir, adiciona a classe 'active' para a mostrar no ecrã
            if (targetContent) {
                targetContent.classList.add('active');
            } else {
                console.warn(`Aviso: Não foi encontrada nenhuma aba com o ID "${targetId}".`);
            }
        });
    });
});

// 1. A NOSSA BASE DE DADOS (Array com 30 estudantes)
// Adicionei os vossos nomes e preenchi o resto com nomes fictícios.
const estudantes = [
    { nome: "Cícero Manuel", prov: "Luanda", idade: 16, modulo: "Arquitetura de Sistemas" },
    { nome: "Moisés Alberto", prov: "Benguela", idade: 16, modulo: "JavaScript" },
    { nome: "Sadrack Tudilu", prov: "Luanda", idade: 17, modulo: "UI/UX Design" },
    { nome: "Helder Nhimi", prov: "Huambo", idade: 16, modulo: "Estrutura de Dados" },
    { nome: "Ana Silva", prov: "Luanda", idade: 15, modulo: "HTML/CSS" },
    { nome: "Bruno Costa", prov: "Benguela", idade: 18, modulo: "Python" },
    { nome: "Carlos Sousa", prov: "Huíla", idade: 17, modulo: "C/C++" },
    { nome: "Daniela Rocha", prov: "Luanda", idade: 16, modulo: "HTML/CSS" },
    { nome: "Eduardo Lima", prov: "Cabinda", idade: 17, modulo: "Python" },
    { nome: "Fernanda Gomes", prov: "Luanda", idade: 15, modulo: "Lógica" },
    { nome: "Gabriel Mendes", prov: "Huambo", idade: 16, modulo: "Redes" },
    { nome: "Hugo Martins", prov: "Luanda", idade: 18, modulo: "C/C++" },
    { nome: "Inês Santos", prov: "Benguela", idade: 15, modulo: "HTML/CSS" },
    { nome: "João Pinto", prov: "Luanda", idade: 17, modulo: "Python" },
    { nome: "Kátia Almeida", prov: "Huíla", idade: 16, modulo: "Redes" },
    { nome: "Luís Fernandes", prov: "Luanda", idade: 17, modulo: "JavaScript" },
    { nome: "Mariana Ribeiro", prov: "Cabinda", idade: 15, modulo: "Lógica" },
    { nome: "Nuno Carvalho", prov: "Huambo", idade: 18, modulo: "HTML/CSS" },
    { nome: "Paulo Monteiro", prov: "Luanda", idade: 16, modulo: "C/C++" },
    { nome: "Raquel Dias", prov: "Benguela", idade: 17, modulo: "UI/UX Design" },
    { nome: "Sara Marques", prov: "Luanda", idade: 15, modulo: "Python" },
    { nome: "Tiago Pereira", prov: "Huíla", idade: 16, modulo: "Lógica" },
    { nome: "Úrsula Neves", prov: "Benguela", idade: 18, modulo: "Redes" },
    { nome: "Vasco Silva", prov: "Luanda", idade: 17, modulo: "JavaScript" },
    { nome: "Xavier Lopes", prov: "Huambo", idade: 16, modulo: "C/C++" },
    { nome: "Yara Cunha", prov: "Luanda", idade: 15, modulo: "HTML/CSS" },
    { nome: "Zeca Afonso", prov: "Cabinda", idade: 18, modulo: "Python" },
    { nome: "Beatriz Tavares", prov: "Luanda", idade: 16, modulo: "Lógica" },
    { nome: "Diogo Faria", prov: "Benguela", idade: 17, modulo: "Redes" },
    { nome: "Marta Soares", prov: "Luanda", idade: 15, modulo: "JavaScript" }
];

// 2. ORDENAÇÃO ALFABÉTICA
// Esta linha organiza automaticamente o array de A a Z
estudantes.sort((a, b) => a.nome.localeCompare(b.nome));

// 3. VARIÁVEIS DE CONTROLO DA PAGINAÇÃO E FILTRO
let paginaAtual = 1;
const limitePorPagina = 15; // Quantos alunos mostrar por página
let estudantesFiltrados = [...estudantes]; // Array que muda quando usamos o filtro

// 4. FUNÇÃO QUE DESENHA A TABELA
function renderizarTabela() {
    const tbody = document.getElementById("tabela-body");
    tbody.innerHTML = ""; // Limpa a tabela antes de escrever

    // Calcula de onde até onde vamos cortar a lista (Ex: Pag 1 = 0 a 15)
    const inicio = (paginaAtual - 1) * limitePorPagina;
    const fim = inicio + limitePorPagina;
    const alunosDaPagina = estudantesFiltrados.slice(inicio, fim);

    // Escreve as linhas da tabela
    alunosDaPagina.forEach((aluno, index) => {
        // A cor do avatar muda com base na primeira letra, só para dar estilo
        const corAvatar = ["c-bg", "m-bg", "s-bg", "h-bg", "d-bg"][index % 5];
        const numeroReal = (inicio + index + 1).toString().padStart(2, '0');

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${numeroReal}</td>
            <td>
                <div class="aluno-info">
                    <div class="avatar ${corAvatar}">${aluno.nome.charAt(0)}</div>
                    ${aluno.nome}
                </div>
            </td>
            <td>${aluno.prov}</td>
            <td>${aluno.idade} anos</td>
            <td><span class="status-ativo">${aluno.modulo}</span></td>
        `;
        tbody.appendChild(tr);
    });

    atualizarPaginacao();
}

// 5. FUNÇÃO PARA ATUALIZAR OS BOTÕES E O TEXTO DA PAGINAÇÃO
function atualizarPaginacao() {
    const infoPaginacao = document.getElementById("info-paginacao");
    const btnAnterior = document.getElementById("btn-anterior");
    const btnProximo = document.getElementById("btn-proximo");

    const totalAlunos = estudantesFiltrados.length;
    const totalPaginas = Math.ceil(totalAlunos / limitePorPagina);
    
    // Atualiza o texto (Ex: "A mostrar 1 a 15 de 30 estudantes")
    const numInicio = totalAlunos === 0 ? 0 : ((paginaAtual - 1) * limitePorPagina) + 1;
    const numFim = Math.min(paginaAtual * limitePorPagina, totalAlunos);
    infoPaginacao.innerText = `A mostrar ${numInicio} a ${numFim} de ${totalAlunos} estudantes`;

    // Desativa botões se estivermos na primeira ou última página
    btnAnterior.disabled = paginaAtual === 1;
    btnProximo.disabled = paginaAtual === totalPaginas || totalPaginas === 0;
}

// 6. EVENTOS DE CLIQUE PARA PAGINAÇÃO E FILTRO
// Avançar página
document.getElementById("btn-proximo").addEventListener("click", () => {
    paginaAtual++;
    renderizarTabela();
});

// Recuar página
document.getElementById("btn-anterior").addEventListener("click", () => {
    paginaAtual--;
    renderizarTabela();
});

// Filtro do "Menu Província"
// Ouve sempre que mudas o select e filtra os dados
const selectFiltro = document.getElementById("filtro");
if(selectFiltro) {
    selectFiltro.addEventListener("change", (evento) => {
        const valorEscolhido = evento.target.value.toLowerCase();
        
        if (valorEscolhido === "todas") {
            estudantesFiltrados = [...estudantes];
        } else {
            // Filtra o array pela província selecionada
            estudantesFiltrados = estudantes.filter(aluno => aluno.prov.toLowerCase() === valorEscolhido);
        }
        
        paginaAtual = 1; // Volta sempre para a página 1 ao filtrar
        renderizarTabela();
    });
}

// 7. ARRANQUE INICIAL
renderizarTabela();