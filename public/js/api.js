// ═══════════════════════════════════════════════════════════════
// FUNÇÕES DE API
// ═══════════════════════════════════════════════════════════════

class API {
    static async analisarTexto(texto) {
        try {
            const response = await fetch(`${CONFIG.API_URL}/analisar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ texto })
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.erro || 'Erro desconhecido');
            }

            return await response.json();
        } catch (erro) {
            throw new Error(erro.message || 'Erro ao conectar com o servidor');
        }
    }

    static async analisarUrl(url) {
        try {
            const response = await fetch(`${CONFIG.API_URL}/analisar-url`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.erro || 'Erro desconhecido');
            }

            return await response.json();
        } catch (erro) {
            throw new Error(erro.message || 'Erro ao conectar com o servidor');
        }
    }

    static async buscarAnalise(id) {
        try {
            const response = await fetch(`${CONFIG.API_URL}/analise/${id}`);

            if (!response.ok) {
                throw new Error('Análise não encontrada');
            }

            return await response.json();
        } catch (erro) {
            throw new Error(erro.message || 'Erro ao buscar análise');
        }
    }

    static async enviarFeedback(id, avaliacaoCorreta, observacoes) {
        try {
            const response = await fetch(`${CONFIG.API_URL}/feedback/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avaliacaoCorreta,
                    observacoes: observacoes || ''
                })
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.erro || 'Erro ao enviar feedback');
            }

            return await response.json();
        } catch (erro) {
            throw new Error(erro.message || 'Erro ao enviar feedback');
        }
    }

    static async carregarEstatisticas() {
        try {
            const response = await fetch(`${CONFIG.API_URL}/estatisticas`);

            if (!response.ok) {
                throw new Error('Erro ao carregar estatísticas');
            }

            return await response.json();
        } catch (erro) {
            throw new Error(erro.message || 'Erro ao carregar estatísticas');
        }
    }
}
