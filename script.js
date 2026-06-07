/**
 * SISTEMA AUTOMÁTICO E MODERNO - MÓDULO DE ABAS E PAGINAÇÃO
 * Código organizado para melhor legibilidade e manutenção.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o sistema de abas
    initTabs();
    
    // Inicializa o sistema de paginação e filtros
    initPagination();
});

/**
 * Lógica para o Sistema de Abas
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn'); // Seleciona todos os botões de abas
    const tabContents = document.querySelectorAll('.tab-content'); // Seleciona todos os blocos de conteúdo

    tabButtons.forEach(button => { // Itera sobre cada botão para adicionar o evento de clique
        button.addEventListener('click', (e) => { // Adiciona escuta de clique
            tabButtons.forEach(btn => btn.classList.remove('active')); // Remove a classe 'active' de todos os botões
            tabContents.forEach(content => content.classList.remove('active')); // Remove a classe 'active' de todos os conteúdos
            
            e.currentTarget.classList.add('active'); // Adiciona 'active' apenas ao botão clicado
            const targetId = e.currentTarget.getAttribute('data-tab'); // Captura o ID do alvo via atributo 'data-tab'
            const targetContent = document.getElementById(targetId); // Localiza o elemento de conteúdo correspondente
            
            if (targetContent) { // Se o conteúdo existir...
                targetContent.classList.add('active'); // ...ativa o conteúdo correspondente
            }
        });
    });
}

/**
 * Lógica para o Sistema de Paginação e Filtro
 */
function initPagination() {
    // --- Seleção de elementos do DOM ---
    const todasAsLinhas = Array.from(document.querySelectorAll('.tabela-estudantes tbody tr')); // Converte NodeList para Array para usar métodos de array
    const btnAnterior = document.getElementById('btn-anterior'); // Botão de página anterior
    const btnProximo = document.getElementById('btn-proximo'); // Botão de próxima página
    const textoPaginacao = document.getElementById('texto-paginacao'); // Elemento de texto que mostra o status atual
    const selectFiltro = document.getElementById('filtro'); // Dropdown de filtro por província

    // --- Variáveis de Estado ---
    let paginaAtual = 1; // Controla a página atual
    const alunosPorPagina = 15; // Define o limite de linhas por página
    let linhasFiltradas = [...todasAsLinhas]; // Copia todas as linhas para a variável de controle inicial

    // Função para remover acentos (auxiliar)
    const normalizarTexto = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // Função principal de renderização da página
    function mostrarPagina(pagina) {
        todasAsLinhas.forEach(linha => linha.style.display = 'none'); // Esconde todas as linhas inicialmente

        const totalFiltrados = linhasFiltradas.length; // Quantidade total de itens após filtro
        const totalPaginas = Math.ceil(totalFiltrados / alunosPorPagina) || 1; // Calcula total de páginas necessário

        const inicio = (pagina - 1) * alunosPorPagina; // Define o índice inicial da fatia
        const fim = inicio + alunosPorPagina; // Define o índice final da fatia

        // Itera sobre as linhas filtradas e exibe apenas as que pertencem à página atual
        linhasFiltradas.forEach((linha, index) => {
            if (index >= inicio && index < fim) {
                linha.style.display = ''; // Remove o display: none para mostrar a linha
            }
        });

        // Atualiza o texto informativo "A mostrar X a Y de Z"
        if (textoPaginacao) {
            const numeroFim = Math.min(fim, totalFiltrados); // Garante que o número não exceda o total
            const numeroInicio = totalFiltrados === 0 ? 0 : inicio + 1; // Define o início da contagem
            textoPaginacao.innerText = `A mostrar ${numeroInicio} a ${numeroFim} de ${totalFiltrados} estudantes`;
        }

        // --- Lógica de estado dos botões ---
        if (btnAnterior) { // Desabilita o botão anterior se for a primeira página
            btnAnterior.disabled = pagina === 1;
            btnAnterior.style.opacity = pagina === 1 ? '0.5' : '1';
            btnAnterior.style.cursor = pagina === 1 ? 'not-allowed' : 'pointer';
        }

        if (btnProximo) { // Desabilita o botão próximo se for a última página
            btnProximo.disabled = pagina >= totalPaginas;
            btnProximo.style.opacity = pagina >= totalPaginas ? '0.5' : '1';
            btnProximo.style.cursor = pagina >= totalPaginas ? 'not-allowed' : 'pointer';
        }
    }

    // --- Evento de mudança no Filtro ---
    if (selectFiltro) {
        selectFiltro.addEventListener('change', (e) => {
            const provinciaSelecionada = e.target.value.toLowerCase(); // Captura valor do filtro

            if (provinciaSelecionada === 'todas') {
                linhasFiltradas = [...todasAsLinhas]; // Reseta para todos os alunos
            } else {
                // Filtra a lista com base na coluna da província (3ª coluna)
                linhasFiltradas = todasAsLinhas.filter(linha => {
                    const tdProvincia = linha.querySelectorAll('td')[2]; 
                    const provinciaLimpa = normalizarTexto(tdProvincia.innerText.trim());
                    return provinciaLimpa === provinciaSelecionada; // Compara província
                });
            }

            paginaAtual = 1; // Reseta para a primeira página sempre que filtrar
            mostrarPagina(paginaAtual); // Renderiza a página
        });
    }

    // --- Ações de Clique (Anterior / Próximo) ---
    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => {
            if (paginaAtual > 1) { // Só retrocede se não estiver na página 1
                paginaAtual--;
                mostrarPagina(paginaAtual);
            }
        });
    }

    if (btnProximo) {
        btnProximo.addEventListener('click', () => {
            const totalPaginas = Math.ceil(linhasFiltradas.length / alunosPorPagina);
            if (paginaAtual < totalPaginas) { // Só avança se não estiver na última página
                paginaAtual++;
                mostrarPagina(paginaAtual);
            }
        });
    }

    // --- Inicialização ---
    mostrarPagina(1); // Exibe a primeira página ao carregar
}