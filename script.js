/**
 * Monitor de Risco de Queimadas - Guardião Rural
 * Lógica de inteligência local para validação estrita e análise de risco.
 * Desenvolvido para as diretrizes de sustentabilidade do Concurso Agrinho 2026.
 */

// 1. CAPTURA DOS ELEMENTOS DO DOM (Utilizando querySelector)
const formularioClima = document.querySelector('#formulario-clima');
const inputTemperatura = document.querySelector('#temperatura');
const inputUmidade = document.querySelector('#umidade');
const painelResultado = document.querySelector('#painel-resultado');

// 2. ESCUTADOR DE EVENTOS (Event Listener) para interceptar o envio
formularioClima.addEventListener('submit', function(evento) {
    // Evita o comportamento padrão de recarregar a tela
    evento.preventDefault();

    // Limpa qualquer resultado anterior antes de fazer a nova validação
    painelResultado.innerHTML = '';

    // Captura e conversão estrita dos dados para números de ponto flutuante
    const temperatura = parseFloat(inputTemperatura.value);
    const umidade = parseFloat(inputUmidade.value);

    // 3. VALIDAÇÃO ESTRITA DE DADOS (UX Amigável sem Console.log oculto)
    if (isNaN(temperatura) || isNaN(umidade)) {
        renderizarMensagem('Por favor, insira valores numéricos válidos em todos os campos.', 'mensagem-erro');
        return; // Interrompe a execução (Early Return)
    }

    if (temperatura < -10 || temperatura > 60) {
        renderizarMensagem('A temperatura inserida está fora dos limites operacionais reais do campo (-10°C a 60°C).', 'mensagem-erro');
        return;
    }

    if (umidade < 0 || umidade > 100) {
        renderizarMensagem('A umidade relativa do ar não pode ser menor que 0% ou maior que 100%.', 'mensagem-erro');
        return;
    }

    // 4. PROCESSAMENTO DOS DADOS (Regras de negócio baseadas no Sistema FAEP/SENAR-PR)
    let tituloResultado = '';
    let recomendacaoText = '';
    let classeEstilo = '';

    // Condição de Risco Crítico / Alerta Vermelho (Temperatura alta + Umidade baixa)
    if (temperatura >= 30 && umidade <= 30) {
        tituloResultado = '🚨 ALERTA MÁXIMO: Risco Crítico de Incêndio';
        classeEstilo = 'resultado-perigo'; // Ativa o estilo vermelho moderno do CSS
        recomendacaoText = 'Condições climáticas extremamente propícias para propagação de fogo. Recomendação: Suspenda queimas controladas, redobre a inspeção de fuligem e limpeza de máquinas agrícolas, mantenha aceiros umedecidos e utilize drones para monitoramento de focos iniciais.';
    } 
    // Condição de Risco Moderado / Alerta Laranja
    else if ((temperatura >= 25 && temperatura < 30) || (umidade > 30 && umidade <= 45)) {
        tituloResultado = '⚠️ ATENÇÃO: Risco Moderado de Queimadas';
        classeEstilo = 'resultado-alerta'; // Ativa o estilo laranja do CSS
        recomendacaoText = 'O clima apresenta índices que requerem atenção. Certifique-se de que os trabalhadores rurais estejam instruídos sobre normas de segurança e que equipamentos de combate ao fogo estejam acessíveis.';
    } 
    // Condição de Risco Baixo / Alerta Seguro
    else {
        tituloResultado = '✅ SITUAÇÃO SEGURA: Risco Baixo';
        classeEstilo = 'resultado-alerta'; // Reutiliza layout com tom preventivo seguro
        recomendacaoText = 'Índices meteorológicos dentro da normalidade. Continue praticando as ações preventivas do checklist para garantir a sustentabilidade da propriedade rural.';
    }

    // 5. RENDERIZAÇÃO DINÂMICA DO RESULTADO NA TELA DO USUÁRIO
    const containerResultado = document.createElement('div');
    containerResultado.className = classeEstilo;

    containerResultado.innerHTML = `
        <h3>${tituloResultado}</h3>
        <p style="margin-top: 0.5rem; font-size: 0.95rem;"><strong>Temperatura:</strong> ${temperatura}°C | <strong>Umidade:</strong> ${umidade}%</p>
        <p style="margin-top: 0.8rem; font-size: 0.95rem; line-height: 1.5;">${recomendacaoText}</p>
    `;

    painelResultado.appendChild(containerResultado);
});

/**
 * Função Auxiliar para renderizar mensagens de erro customizadas na tela
 */
function renderizarMensagem(texto, classeDoEstilo) {
    const erroDiv = document.createElement('div');
    erroDiv.className = classeDoEstilo;
    erroDiv.textContent = texto;
    painelResultado.appendChild(erroDiv);
}
