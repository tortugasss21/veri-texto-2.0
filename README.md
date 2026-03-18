# 🔍 VeriTexto IA

**Detector de Desinformação com Inteligência Artificial**

Um aplicativo web que usa a IA do Google Gemini para analisar textos e URLs, identificando possíveis sinais de desinformação de forma inteligente e educacional.

---

## ✨ Funcionalidades

- 📝 **Análise de Texto**: Cole qualquer texto e obtenha uma análise detalhada
- 🌐 **Análise de URL**: Insira um link de site para análise automática
- 🤖 **IA Inteligente**: Usa Google Gemini para análises contextualizadas
- 📊 **Estatísticas**: Acompanhe o histórico de análises realizadas
- 💬 **Feedback do Usuário**: Ajude a melhorar o sistema com seus comentários
- 🌙 **Modo Escuro**: Interface confortável para trabalhar à noite
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🚀 **Rápido e Eficiente**: Análises em tempo real

---

## 🎯 O que o VeriTexto Detecta

O sistema identifica vários sinais de desinformação:

1. **Linguagem alarmista** - Urgência artificial, apelos para compartilhar
2. **Falta de fontes** - Ausência de referências verificáveis
3. **Afirmações absolutas** - "Cientistas provaram", "Todos sabem"
4. **Inconsistências** - Dados que contradizem fatos conhecidos
5. **Contexto manipulado** - Informação real, mas com contexto enganoso
6. **Erros e spam** - Erros gramaticais excessivos, formatação típica de spam
7. **Sensacionalismo** - Apelos emocionais exagerados
8. **Teorias de conspiração** - Alegações sem evidências

---

## 🚀 Como Usar

### 1. Instalação

```bash
# Clone ou baixe o projeto
git clone https://github.com/seu-usuario/veritexto-ia.git
cd veritexto-ia

# Instale as dependências
npm install
```

### 2. Configuração

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Abra o arquivo .env e preencha com seus dados:
# - MONGODB_URI: sua conexão MongoDB
# - GEMINI_API_KEY: sua chave da API Google Gemini
```

#### Obtendo as Chaves Necessárias

**MongoDB:**
- Opção 1 (Local): [Instale MongoDB](https://www.mongodb.com/try/download/community)
- Opção 2 (Cloud): [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuito)

**Google Gemini API:**
1. Acesse [ai.google.dev](https://ai.google.dev/)
2. Clique em "Get API Key"
3. Crie um novo projeto no Google Cloud
4. Copie a chave gerada para o arquivo `.env`

### 3. Iniciar o Servidor

```bash
# Modo desenvolvimento
npm run dev

# Ou modo produção
npm start
```

O servidor estará disponível em: **http://localhost:3000**

---

## 📁 Estrutura do Projeto

```
veritexto-ia/
├── server.js                 # Servidor principal
├── public/
│   ├── index.html           # Página principal
│   ├── css/
│   │   ├── style.css        # Estilos principais
│   │   └── responsive.css   # Estilos mobile
│   └── js/
│       ├── config.js        # Configurações
│       ├── api.js           # Funções de API
│       ├── ui.js            # Manipulação de UI
│       ├── feedback.js      # Sistema de feedback
│       └── app.js           # Lógica principal
├── package.json             # Dependências
├── .env.example             # Template .env
└── README.md                # Este arquivo
```

---

## 🔧 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados
- **Google Gemini API** - IA para análise
- **Cheerio** - Parser HTML/CSS

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo
- **JavaScript Vanilla** - Sem dependências

---

## 📖 Como Usar a Interface

### 1. Analisar Texto

1. Vá para a aba "Análise"
2. Clique em "📝 Analisar Texto"
3. Cole o texto que deseja verificar (mínimo 20 caracteres)
4. Clique em "✓ Analisar Texto"

### 2. Analisar URL

1. Vá para a aba "Análise"
2. Clique em "🌐 Analisar URL"
3. Cole o link do site (ex: https://exemplo.com)
4. Clique em "✓ Analisar URL"

### 3. Interpretar Resultados

**Risco Baixo 🟢**
- Conteúdo parece confiável
- Poucos ou nenhum sinal de alerta

**Risco Médio 🟡**
- Alguns sinais de desconfiança detectados
- Recomenda-se verificar em fontes adicionais

**Risco Alto 🔴**
- Múltiplos sinais de desinformação
- Provável que seja conteúdo enganoso

### 4. Enviar Feedback

Depois de cada análise, você pode:
- Confirmar se a análise foi útil
- Adicionar observações opcionais
- Ajudar a melhorar o sistema

### 5. Ver Estatísticas

Acesse a aba "Estatísticas" para ver:
- Total de análises realizadas
- Distribuição de riscos detectados

---

## 🌙 Atalhos de Teclado

- **D** - Alternar modo escuro (quando não está digitando)
- **Enter** - Enviar análise (quando em um formulário)

---

## 📱 Compatibilidade

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iPhone, Android)
- ✅ Modo escuro em todos os navegadores

---

## ⚠️ Observações Importantes

### Este é um Projeto Educacional

- O VeriTexto **não é uma fonte definitiva** de verdade
- Sempre verifique informações em **múltiplas fontes confiáveis**
- Use como **ferramenta de apoio**, não como verdade absoluta
- A IA pode cometer erros - nunca confie 100% automaticamente

### Limitações

- Análise é baseada em padrões linguísticos, não em fatos reais
- Contexto cultural pode afetar as análises
- Conteúdo muito recente pode não ter fontes confiáveis ainda

### Dicas de Uso

1. **Seja crítico** - Questione os resultados se parecerem errados
2. **Use múltiplas fontes** - Combine com outras ferramentas
3. **Verifique contextualmente** - Entenda o contexto original
4. **Reporte erros** - Ajude melhorando o feedback

---

## 🐛 Solução de Problemas

### "Erro ao conectar com MongoDB"
- Verifique se MongoDB está rodando
- Confirme a URL em `.env`
- Tente conectar com um cliente MongoDB

### "Erro: GEMINI_API_KEY não configurada"
- Copie o arquivo `.env.example` para `.env`
- Preencha a chave da API Gemini
- Reinicie o servidor

### "A página não carrega"
- Verificar console do navegador (F12)
- Confirmar que o servidor está rodando
- Limpar cache do navegador

### "Análise muito lenta"
- A API Gemini pode estar lenta
- Tente novamente em alguns minutos
- Verifique sua conexão de internet

---

## 📚 Exemplos de Uso

### Exemplo 1: Analisar uma Notícia

```
Texto:
"URGENTE! Cientistas descobrem que água é veneno! 
Compartilhe antes que apaguem! Nos 5 comentários abaixo..."

Resultado esperado: Risco Alto 🔴
- Sinais: Urgência artificial, apelos emocionais, falta de fontes
```

### Exemplo 2: Analisar Informação Legítima

```
Texto:
"A água é composta por moléculas de H2O, conforme descoberto 
por Henry Cavendish em 1781. Mais informações em fontes 
como a Universidade de São Paulo."

Resultado esperado: Risco Baixo 🟢
- Sinais: Nenhum ou mínimos
- Confiabilidade: Alta
```

---

## 🎓 Aprenda Mais

### Recursos sobre Desinformação
- [Project Fact](https://www.projectfact.com.br/) - Verificação de fatos
- [Comprova](https://www.comprova.org/) - Coalizão de combate desinformação
- [BBC Reality Check](https://www.bbc.com/news/reality_check) - Verificação BBC

### Recursos sobre IA e ética
- [AI Explainability](https://ai.google/responsibility/) - Google IA Responsável
- [Future of Humanity](https://www.futureofhumanity.ox.ac.uk/) - Oxford University

---

## 📜 Licença

Este projeto está sob a licença **MIT** - veja o arquivo LICENSE para detalhes.

---

## 🤝 Contribuindo

Melhorias são bem-vindas! Se você tem ideias:

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add some MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 👨‍💻 Autor

**Eduardo**

---

## 📞 Suporte

Se tiver dúvidas ou encontrar problemas:

1. Verifique a seção "Solução de Problemas"
2. Abra uma issue no GitHub
3. Entre em contato (se houver contato disponível)

---

## 🎉 Versão

**v1.0.0** - Versão Inicial

---

**Bem-vindo ao VeriTexto IA! Ajude a combater a desinformação de forma inteligente.** 🔍✨
