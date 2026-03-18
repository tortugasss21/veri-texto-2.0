// ═══════════════════════════════════════════════════════════════
// LÓGICA PRINCIPAL E EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Setup de tabs
    document.querySelectorAll('[data-tab]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            UI.mudarTab(e.target.dataset.tab);
        });
    });

    // Setup de modo de input
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            UI.mudarModo(e.target.dataset.mode);
        });
    });

    // Setup do botão dark mode
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', toggleDarkMode);
    }

    // Setup do formulário de texto
    const formularioTexto = document.getElementById('formularioTexto');
    if (formularioTexto) {
        formularioTexto.addEventListener('submit', analisarTexto);
        formularioTexto.addEventListener('reset', limparFormularioTexto);

        // Habilitar botão limpar conforme digita
        document.getElementById('texto').addEventListener('input', function () {
            document.getElementById('btnLimpar').disabled = this.value.trim() === '';
        });
    }

    // Setup do formulário de URL
    const formularioUrl = document.getElementById('formularioUrl');
    if (formularioUrl) {
        formularioUrl.addEventListener('submit', analisarUrl);
        formularioUrl.addEventListener('reset', limparFormularioUrl);

        // Habilitar botão limpar conforme digita
        document.getElementById('urlInput').addEventListener('input', function () {
            document.getElementById('btnLimparUrl').disabled = this.value.trim() === '';
        });
    }

    // Setup do botão copiar
    const btnCopiar = document.getElementById('btnCopiar');
    if (btnCopiar) {
        btnCopiar.addEventListener('click', UI.copiarResultado);
    }

    // Setup dos botões de feedback
    const btnSim = document.getElementById('btnSim');
    const btnNao = document.getElementById('btnNao');
    if (btnSim) {
        btnSim.addEventListener('click', () => FeedbackUI.selecionarFeedback(true));
    }
    if (btnNao) {
        btnNao.addEventListener('click', () => FeedbackUI.selecionarFeedback(false));
    }

    // Setup do botão enviar feedback
    const feedbackSend = document.getElementById('feedbackSend');
    if (feedbackSend) {
        feedbackSend.addEventListener('click', () => FeedbackUI.enviarFeedback());
    }

    // Atalho de teclado: D para dark mode (quando não em input)
    document.addEventListener('keydown', (e) => {
        if ((e.key === 'd' || e.key === 'D') && 
            !document.activeElement.matches('textarea, input')) {
            toggleDarkMode();
        }
    });

    // Limpar mensagens ao focar no input
    document.getElementById('texto')?.addEventListener('focus', UI.limparMensagens);
    document.getElementById('urlInput')?.addEventListener('focus', UI.limparMensagens);
});

// ═══════════════════════════════════════════════════════════════
// FUNÇÕES DE ANÁLISE
// ═══════════════════════════════════════════════════════════════

async function analisarTexto(e) {
    e.preventDefault();

    UI.limparMensagens();

    const texto = document.getElementById('texto').value;
    const validacao = UI.validarTexto(texto);

    if (!validacao.valido) {
        UI.mostrarErro(validacao.erro, 'texto');
        return;
    }

    await executarAnalise(texto, 'texto');
}

async function analisarUrl(e) {
    e.preventDefault();

    UI.limparMensagens();

    const url = document.getElementById('urlInput').value;
    const validacao = UI.validarUrl(url);

    if (!validacao.valido) {
        UI.mostrarErro(validacao.erro, 'url');
        return;
    }

    await executarAnalise(url, 'url');
}

async function executarAnalise(entrada, tipo) {
    UI.mostrarLoading(true);
    document.getElementById('btnAnalisar').disabled = true;
    document.getElementById('btnAnalisarUrl').disabled = true;

    try {
        let resultado;

        if (tipo === 'texto') {
            resultado = await API.analisarTexto(entrada);
        } else {
            resultado = await API.analisarUrl(entrada);
        }

        UI.renderizarResultados(resultado);
    } catch (erro) {
        const tipoMsg = tipo === 'url' ? 'url' : 'texto';
        UI.mostrarErro(erro.message, tipoMsg);
        console.error('Erro na análise:', erro);
    } finally {
        UI.mostrarLoading(false);
        document.getElementById('btnAnalisar').disabled = false;
        document.getElementById('btnAnalisarUrl').disabled = false;
    }
}

// ═══════════════════════════════════════════════════════════════
// FUNÇÕES DE LIMPEZA
// ═══════════════════════════════════════════════════════════════

function limparFormularioTexto() {
    UI.esconderResultados();
    document.getElementById('texto').value = '';
    document.getElementById('btnLimpar').disabled = true;
    UI.limparMensagens();
    document.getElementById('texto').focus();
}

function limparFormularioUrl() {
    UI.esconderResultados();
    document.getElementById('urlInput').value = '';
    document.getElementById('btnLimparUrl').disabled = true;
    UI.limparMensagens();
    document.getElementById('urlInput').focus();
}

// ═══════════════════════════════════════════════════════════════
// INICIALIZAÇÃO
// ═══════════════════════════════════════════════════════════════

// Exibir modo padrão
window.addEventListener('load', () => {
    // Desabilitar botão limpar inicialmente
    document.getElementById('btnLimpar').disabled = true;
    document.getElementById('btnLimparUrl').disabled = true;

    // Focar no input principal
    document.getElementById('texto').focus();
});
