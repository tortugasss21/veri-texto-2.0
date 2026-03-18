// ═══════════════════════════════════════════════════════════════
// CONFIGURAÇÕES GLOBAIS
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
    API_URL: '/api',
    MIN_TEXTO: 20,
    MAX_TEXTO: 10000,
    DEBOUNCE_DELAY: 300,
    ANIMATION_DURATION: 300,
};

// Verificar tema salvo
window.addEventListener('load', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
});

// Função para alternar tema escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
    
    const btn = document.getElementById('darkModeBtn');
    if (btn) {
        btn.textContent = isDarkMode ? '☀️' : '🌙';
    }
}

// Atualizar ícone ao carregar
window.addEventListener('load', () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const btn = document.getElementById('darkModeBtn');
    if (btn) {
        btn.textContent = isDarkMode ? '☀️' : '🌙';
    }
});
