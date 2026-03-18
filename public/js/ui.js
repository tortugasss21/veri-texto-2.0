// ═══════════════════════════════════════════════════════════════
// MANIPULAÇÃO DA INTERFACE
// ═══════════════════════════════════════════════════════════════

let modoInput = 'texto'; // 'texto' ou 'url'
let analiseAtualId = null;

class UI {
    // TABS
    static mudarTab(tabName) {
        // Desativar todas as abas
        document.querySelectorAll('.tab-content').forEach(el => {
            el.classList.remove('active');
        });
        document.querySelectorAll('[role="tab"]').forEach(el => {
            el.classList.remove('active');
            el.setAttribute('aria-selected', 'false');
        });

        // Ativar nova aba
        const tabEl = document.getElementById(`tab-${tabName}`);
        if (tabEl) {
            tabEl.classList.add('active');
        }

        const btnEl = document.querySelector(`[data-tab="${tabName}"]`);
        if (btnEl) {
            btnEl.classList.add('active');
            btnEl.setAttribute('aria-selected', 'true');
        }

        // Se for stats, carregar dados
        if (tabName === 'stats') {
            UI.carregarEstatisticas();
        }
    }

    // MODO DE INPUT
    static mudarModo(modo) {
        modoInput = modo;
        
        // Atualizar botões
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${modo}"]`).classList.add('active');

        // Mostrar/esconder formulários
        const formTexto = document.getElementById('formularioTexto');
        const formUrl = document.getElementById('formularioUrl');

        if (modo === 'texto') {
            formTexto.style.display = 'block';
            formUrl.style.display = 'none';
            formTexto.classList.remove('hidden');
        } else {
            formTexto.style.display = 'none';
            formUrl.style.display = 'block';
            formUrl.classList.remove('hidden');
        }

        // Esconder resultados anteriores
        UI.esconderResultados();
    }

    // MOSTRAR ERRO
    static mostrarErro(mensagem, tipo = 'texto') {
        const errorEl = tipo === 'url' 
            ? document.getElementById('errorMessageUrl')
            : document.getElementById('errorMessage');

        if (errorEl) {
            errorEl.textContent = mensagem;
            errorEl.style.display = 'block';
            errorEl.classList.add('show');

            // Auto-remover após 5 segundos
            setTimeout(() => {
                errorEl.classList.remove('show');
                errorEl.style.display = 'none';
            }, 5000);
        }
    }

    // LIMPAR MENSAGENS
    static limparMensagens() {
        const msgs = document.querySelectorAll('.mensagem');
        msgs.forEach(msg => {
            msg.classList.remove('show');
            msg.style.display = 'none';
        });
    }

    // MOSTRAR LOADING
    static mostrarLoading(visible = true) {
        const loader = document.getElementById('skeletonLoader');
        if (loader) {
            loader.style.display = visible ? 'flex' : 'none';
        }
    }

    // ESCONDER RESULTADOS
    static esconderResultados() {
        const resultados = document.getElementById('resultados');
        if (resultados && resultados.style.display !== 'none') {
            resultados.classList.add('fade-out');
            setTimeout(() => {
                resultados.style.display = 'none';
                resultados.classList.remove('fade-out');
            }, CONFIG.ANIMATION_DURATION);
        }
    }

    // RENDERIZAR RESULTADOS
    static renderizarResultados(analise) {
        // Atualizar badge de risco
        const riscoBadge = document.getElementById('riskBadge');
        const riscoClass = `risco-${analise.risco}`;
        riscoBadge.className = `risk-badge ${riscoClass}`;

        // Atualizar percentual
        document.getElementById('riskPercentage').textContent = `${analise.percentualRisco}%`;

        // Atualizar título de risco
        const riskTitles = {
            'baixo': '🟢 Risco Baixo',
            'medio': '🟡 Risco Médio',
            'alto': '🔴 Risco Alto'
        };
        document.getElementById('riskTitle').textContent = riskTitles[analise.risco] || 'Análise';

        // Atualizar descrição
        const descricoes = {
            'baixo': 'Este conteúdo parece confiável e legítimo.',
            'medio': 'Este conteúdo apresenta alguns sinais de desconfiança.',
            'alto': 'Este conteúdo apresenta múltiplos sinais de desinformação.'
        };
        document.getElementById('riskDescription').textContent = descricoes[analise.risco];

        // Atualizar explicação
        document.getElementById('explanation').textContent = analise.explicacao;

        // Atualizar sinais
        const sinaisWrapper = document.getElementById('sinaisWrapper');
        const sinaisList = document.getElementById('sinaisList');

        if (analise.sinais && analise.sinais.length > 0) {
            sinaisWrapper.style.display = 'block';
            sinaisList.innerHTML = analise.sinais
                .map(sinal => `<li class="signal-item">${UI.escaparHTML(sinal)}</li>`)
                .join('');
        } else {
            sinaisWrapper.style.display = 'none';
        }

        // Atualizar recomendação
        document.getElementById('recommendation').textContent = analise.recomendacao;

        // Atualizar fontes sugeridas
        const fontesWrapper = document.getElementById('fontesWrapper');
        const fontesList = document.getElementById('fontesList');

        if (analise.fontesSugeridas && analise.fontesSugeridas.length > 0) {
            fontesWrapper.style.display = 'block';
            fontesList.innerHTML = analise.fontesSugeridas
                .map(fonte => {
                    const q = encodeURIComponent(fonte);
                    return `<a class="fonte-btn" href="https://www.google.com/search?q=${q}" target="_blank" rel="noopener">
                        🔍 ${UI.escaparHTML(fonte)}
                    </a>`;
                })
                .join('');
        } else {
            fontesWrapper.style.display = 'none';
        }

        // Mostrar resultados
        const resultados = document.getElementById('resultados');
        resultados.style.display = 'block';
        resultados.classList.add('visible');

        // Reset feedback
        document.getElementById('feedbackMsg').textContent = '';
        document.getElementById('feedbackObs').style.display = 'none';
        document.getElementById('feedbackSend').style.display = 'none';
        document.getElementById('btnSim').className = 'btn-feedback btn-yes';
        document.getElementById('btnNao').className = 'btn-feedback btn-no';
        document.getElementById('btnSim').disabled = false;
        document.getElementById('btnNao').disabled = false;

        // Salvar ID da análise
        analiseAtualId = analise._id;

        // Scroll para resultados
        setTimeout(() => {
            resultados.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    // COPIAR RESULTADO
    static copiarResultado() {
        const titulo = document.getElementById('riskTitle').textContent;
        const percentual = document.getElementById('riskPercentage').textContent;
        const descricao = document.getElementById('riskDescription').textContent;
        const sinais = Array.from(document.querySelectorAll('.signal-item'))
            .map(el => '• ' + el.textContent.trim())
            .join('\n');
        const analise = document.getElementById('explanation').textContent;
        const recomendacao = document.getElementById('recommendation').textContent;

        const texto = [
            'VeriTexto — Resultado da Análise',
            '',
            `${titulo} (${percentual})`,
            descricao,
            '',
            sinais ? `Sinais identificados:\n${sinais}` : '',
            '',
            'Análise detalhada:',
            analise,
            '',
            'Recomendação:',
            recomendacao,
        ].filter(Boolean).join('\n');

        navigator.clipboard.writeText(texto).then(() => {
            const btn = document.getElementById('btnCopiar');
            const textoOriginal = btn.textContent;
            btn.textContent = '✓ Copiado!';
            btn.classList.add('copied');

            setTimeout(() => {
                btn.textContent = textoOriginal;
                btn.classList.remove('copied');
            }, 2000);
        }).catch(() => {
            UI.mostrarErro('Não foi possível copiar o resultado');
        });
    }

    // CARREGAR ESTATÍSTICAS
    static async carregarEstatisticas() {
        try {
            const statsContainer = document.getElementById('statsContainer');
            statsContainer.innerHTML = '<p class="loading">Carregando...</p>';

            const stats = await API.carregarEstatisticas();

            const riscoStats = stats.porRisco.map(r => {
                const porcentagem = stats.totalAnalises > 0 
                    ? (r.quantidade / stats.totalAnalises) * 100 
                    : 0;

                const cores = {
                    'baixo': '#10b981',
                    'medio': '#f59e0b',
                    'alto': '#ef4444'
                };

                return `
                    <div class="stat-item">
                        <div class="stat-label">
                            <span>${r._id ? r._id.charAt(0).toUpperCase() + r._id.slice(1) : 'Indefinido'}</span>
                            <span>${r.quantidade} análises</span>
                        </div>
                        <div class="stat-bar">
                            <div class="stat-bar-fill" style="width: ${porcentagem}%; background: ${cores[r._id] || '#0066ff'};">
                                ${porcentagem.toFixed(0)}%
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            statsContainer.innerHTML = `
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="font-size: 2.5em; font-weight: bold; color: var(--primary);">
                        ${stats.totalAnalises}
                    </div>
                    <div style="color: var(--text-light);">Análises Realizadas</div>
                </div>
                <h3 style="margin-bottom: 16px; margin-top: 24px;">Distribuição de Risco:</h3>
                ${riscoStats || '<p>Nenhuma análise realizada ainda.</p>'}
            `;
        } catch (erro) {
            const statsContainer = document.getElementById('statsContainer');
            statsContainer.innerHTML = `<p style="color: var(--danger);">Erro ao carregar estatísticas: ${erro.message}</p>`;
        }
    }

    // UTILIDADES
    static escaparHTML(texto) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(texto).replace(/[&<>"']/g, m => map[m]);
    }

    // VALIDAR TEXTO
    static validarTexto(texto) {
        if (!texto || texto.trim().length === 0) {
            return { valido: false, erro: 'Digite algo para analisar' };
        }

        if (texto.trim().length < CONFIG.MIN_TEXTO) {
            return { 
                valido: false, 
                erro: `O texto deve ter pelo menos ${CONFIG.MIN_TEXTO} caracteres` 
            };
        }

        if (texto.trim().length > CONFIG.MAX_TEXTO) {
            return { 
                valido: false, 
                erro: `O texto não pode ter mais de ${CONFIG.MAX_TEXTO} caracteres` 
            };
        }

        return { valido: true };
    }

    // VALIDAR URL
    static validarUrl(urlStr) {
        if (!urlStr || urlStr.trim().length === 0) {
            return { valido: false, erro: 'Digite uma URL' };
        }

        try {
            new URL(urlStr.trim());
            return { valido: true };
        } catch {
            return { 
                valido: false, 
                erro: 'URL inválida. Verifique o formato (ex: https://exemplo.com)' 
            };
        }
    }
}
