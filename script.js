/**
 * Monitor de Risco de Queimadas - Guardião Rural
 * Lógica funcional para validação de dados e cálculo de risco meteorológico.
 * Focado nas diretrizes de sustentabilidade e segurança do Concurso Agrinho 2026.
 */

// 1. Captura dos elementos do DOM utilizando document.querySelector
const formulario = document.querySelector('#formulario-clima');
const inputTemperatura = document.querySelector('#temperatura');
const inputUmidade = document.querySelector('#umidade');
const painelResultado = document.querySelector('#painel-resultado');

// 2. Adição do escutador de eventos (Event Listener) para o envio do formulário
formulario.addEventListener('submit', function (evento) {
    // Evita o comportamento padrão de recarregar a página ao enviar o formulário
    evento.preventDefault();

    // Captura os valores e converte explicitamente para números de ponto flutuante
    const temperatura = parseFloat(inputTemperatura.value);
    const umidade = parseFloat(inputUmidade.value);

    // 3. Validação Estrita de Dados (Tratamento de Erros com UX Amigável)
    if (isNaN(temperatura) || isNaN(umidade)) {
        exibirMensagem('Por favor, preencha todos os campos com números válidos.', 'erro');
        return; // Interrompe a execução
    }

    if (temperatura < -10 || temperatura > 60) {
        exibirMensagem('A temperatura inserida parece incorreta. Digite um valor entre -10°C e 60°C.', 'erro');
        return;
    }

    if (umidade < 0 || umidade > 100) {
        exibirMensagem('A umidade relativa do ar deve estar obrigatoriamente entre 0% e 100%.', 'erro');
        return;
    }

    // 4. Processamento dos Dados (Lógica de Negócio / "IA Local")
    // O risco aumenta drasticamente se a umidade estiver baixa e a temperatura alta.
    let nivelRisco = 'Baixo';
    let classeEstilo = 'risco-baixo';
    let recomendacao = 'Condições seguras. Continue monitorando e mantendo a limpeza preventiva.';

    // Regra de negócio simplificada baseada em alertas reais do SENAR-PR
    if (temperatura > 30 && umidade < 30) {
        nivelRisco = 'Crítico / Emergência';
        classeEstilo = 'risco-critico';
        recomendacao = 'ALERTA MÁXIMO! Risco extremo de incêndio. Evite qualquer tipo de fagulha, inspecione a fuligem das máquinas agrícolas e utilize drones para vigilância se disponível.';
    } else if (temperatura > 2
