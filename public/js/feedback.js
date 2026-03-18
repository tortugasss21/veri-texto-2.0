// ═══════════════════════════════════════════════════════════════
// LÓGICA DE FEEDBACK
// ═══════════════════════════════════════════════════════════════

let feedbackSelecionado = null;

class FeedbackUI {
    static selecionarFeedback(correta) {
        feedbackSelecionado = correta;

        // Atualizar visualmente
        const btnSim = document.getElementById('btnSim');
        const btnNao = document.getElementById('btnNao');
        
        btnSim.className = 'btn-feedback btn-yes' + (correta ? ' selected-yes' : '');
        btnNao.className = 'btn-feedback btn-no' + (!correta ? ' selected-no' : '');

        // Mostrar campo de observações e botão de envio
        document.getElementById('feedbackObs').style.display = 'block';
        document.getElementById('feedbackObs').classList.add('show');
        document.getElementById('feedbackSend').style.display = 'flex';
        document.getElementById('feedbackSend').classList.add('show');
    }

    static async enviarFeedback() {
        if (feedbackSelecionado === null || !analiseAtualId) {
            return;
        }

        const obs = document.getElementById('feedbackObsText').value.trim();
        const msg = document.getElementById('feedbackMsg');
        const sendBtn = document.getElementById('feedbackSend');
        const btnSim = document.getElementById('btnSim');
        const btnNao = document.getElementById('btnNao');

        // Desabilitar botões enquanto envia
        sendBtn.disabled = true;
        btnSim.disabled = true;
        btnNao.disabled = true;

        try {
            await API.enviarFeedback(analiseAtualId, feedbackSelecionado, obs);
            
            msg.textContent = '✓ Obrigado pelo feedback!';
            msg.classList.add('show');
            
            // Limpar campos
            document.getElementById('feedbackObsText').value = '';
            
            // Esconder após alguns segundos
            setTimeout(() => {
                document.getElementById('feedbackObs').classList.remove('show');
                document.getElementById('feedbackObs').style.display = 'none';
                sendBtn.classList.remove('show');
                sendBtn.style.display = 'none';
            }, 2000);
        } catch (erro) {
            msg.textContent = `❌ ${erro.message}`;
            msg.classList.add('show', 'erro');
            
            // Habilitar botões novamente
            sendBtn.disabled = false;
            btnSim.disabled = false;
            btnNao.disabled = false;

            // Remover mensagem após alguns segundos
            setTimeout(() => {
                msg.classList.remove('show');
            }, 3000);
        }
    }
}

// Expor globalmente
const feedbackUI = FeedbackUI;
