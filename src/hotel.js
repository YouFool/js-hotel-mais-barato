const formatarData = require("./utils/dataUtils");
const obterHoteis = require('./data/hotels.js');

/**
 * Recebe uma solicitação de reserva e retorna o nome do hotel mais barato.
 * @param reserva string com a reserva no formato <tipo_do_cliente>: <data1>, <data2>, <data3>
 * @returns {string|*} o nome do hotel mais barato
 */
const hotelMaisBarato = reserva => {
    const partesReserva = reserva.split(":");
    const tipoDoCliente = partesReserva[0];
    const diasEstadiaFormatados = partesReserva[1]
        .split(",")
        .map(data => formatarData(data));

    return _hotelMaisBarato(tipoDoCliente, diasEstadiaFormatados);
}

/**
 * Obtém uma lista de opções de hotéis e para cada hotel realiza o cálculo do custo de suas diárias.
 * Após isso, retorna o nome do hotel de menor custo e melhor classificação.
 *
 * @param tipoDoCliente tipo do cliente (fidelidade/regular)
 * @param diasEstadia array com os dias da estadia
 * @returns {string|*} o nome do hotel mais barato
 * @private
 */
const _hotelMaisBarato = (tipoDoCliente, diasEstadia) => {
    const opcoes = obterHoteis();

    const resultados = [];
    for (let i = 0; i < opcoes.length; i++) {
        let hotelAtual = opcoes[i];

        const diarias = _calcularEstadiaDiariasPorHotel(tipoDoCliente, diasEstadia, hotelAtual);

        resultados.push({
            nome: hotelAtual.nome,
            classificacao: hotelAtual.classificacao,
            diarias: diarias,
            valorTotal: diarias.reduce((a, b) => a + b, 0)
        });
    }

    return _obterMelhorHotelPorSimulacoes(resultados).nome;
}

/**
 * Calcula o valor da estadia de acordo com o tipo do cliente e diárias.
 * @param tipoDoCliente tipo do cliente (fidelidade/regular)
 * @param diasEstadia array com os dias da estadia
 * @param hotel informações do hotel para serem usados no cálculo
 * @returns array com os valores de cada diária
 * @private
 */
const _calcularEstadiaDiariasPorHotel = (tipoDoCliente, diasEstadia, hotel) => {
    const diarias = [];

    diasEstadia.forEach(dia => {
        switch (dia.day()) {
            case 0:
            case 6:
                if (tipoDoCliente === "Fidelidade") {
                    diarias.push(hotel.fidelidade.finalDeSemana);
                } else {
                    diarias.push(hotel.regular.finalDeSemana);
                }
                break;
            default:
                if (tipoDoCliente === "Fidelidade") {
                    diarias.push(hotel.fidelidade.diaDeSemana);
                } else {
                    diarias.push(hotel.regular.diaDeSemana);
                }
        }
    });

    return diarias;
}

/**
 * Percorre todas as simulações feitas e verifica qual a simulação com o menor valor.
 * Caso uma simulação tenha o mesmo valor, a classificação é usada como critério de desempate.
 * @param simulacoes array com simulações
 * @returns a simulação mais barata
 * @private
 */
function _obterMelhorHotelPorSimulacoes(simulacoes) {
    let opcaoMenorCusto = simulacoes[0];

    for (let i = 1; i < simulacoes.length; i++) {
        const simulacaoAtual = simulacoes[i];

        if (simulacaoAtual.valorTotal < opcaoMenorCusto.valorTotal ||
            simulacaoAtual.valorTotal === opcaoMenorCusto.valorTotal && simulacaoAtual.classificacao > opcaoMenorCusto.classificacao) {
            opcaoMenorCusto = simulacaoAtual;
        }
    }

    return opcaoMenorCusto;
}

module.exports = hotelMaisBarato;
