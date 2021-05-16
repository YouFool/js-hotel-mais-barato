const moment = require('moment');

// Input
// Regular: 16Mar2020(mon), 17Mar2020(tues), 18Mar2020(wed)

// Criar um objeto de opcoes com os valores da tabela de preços de cada hotel
const opcoes = [
    {
        nome: "Parque das flores",
        classificacao: 3,
        regular: {
            diaDeSemana: 110,
            finalDeSemana: 90
        },
        fidelidade: {
            diaDeSemana: 80,
            finalDeSemana: 80
        }
    },
    {
        nome: "Jardim Botânico",
        classificacao: 4,
        regular: {
            diaDeSemana: 160,
            finalDeSemana: 60
        },
        fidelidade: {
            diaDeSemana: 110,
            finalDeSemana: 50
        }
    },
    {
        nome: "Mar Atlântico",
        classificacao: 5,
        regular: {
            diaDeSemana: 220,
            finalDeSemana: 150
        },
        fidelidade: {
            diaDeSemana: 100,
            finalDeSemana: 40
        }
    }
]

const hotelMaisBarato = reserva => {
    let partesReserva = reserva.split(":");
    const tipoDoCliente = partesReserva[0];
    const diasEstadiaFormatados = partesReserva[1]
        .split(",")
        .map(data => formatarData(data));

    return _hotelMaisBarato(tipoDoCliente, diasEstadiaFormatados);
}

/**
 * Recebe uma data no formato 'DDMMMYYYY(ddd)' e formata a mesma em uma data do tipo {*|moment.Moment}
 * @param data data no formato 'DDMMMYYYY(ddd)' ex: 20Mar2020(fri)
 * @returns {*|moment.Moment} data no formato do moment
 */
const formatarData = data => {
    return moment(data, 'DDMMMYYYY(ddd)');
}


const _hotelMaisBarato = (tipoDoCliente, diasEstadia) => {
    let resultados = [];
    for (let i = 0; i < opcoes.length; i++) {
        // Pego o hotel
        let hotelAtual = opcoes[i];

        let valor = 0;
        const diarias = [];
        console.log(diasEstadia);
        diasEstadia.forEach(dia => {
            // Calculo o valor por dia conforme o obj opcoes
            switch (dia.day()) {
                case 0:
                case 6:
                    if (tipoDoCliente === "Fidelidade") {
                        diarias.push(hotelAtual.fidelidade.finalDeSemana);
                    } else {
                        diarias.push(hotelAtual.regular.finalDeSemana);
                    }
                    break;
                default:
                    if (tipoDoCliente === "Fidelidade") {
                        diarias.push(hotelAtual.fidelidade.diaDeSemana);
                    } else {
                        diarias.push(hotelAtual.regular.diaDeSemana);
                    }
            }

        })

        resultados.push({
            nome: hotelAtual.nome,
            classificacao: hotelAtual.classificacao,
            diarias: diarias,
            valorTotal: diarias.reduce((a, b) => a + b, 0)
        });
    }
    console.log(resultados);
    // Após ter todas as simulaçoes, devemos verificar qual das simulaçoes é a mais barata
    // Iterar resultados e pegar o resultado com menor valor

    let opcaoMenorCusto = resultados[0];
    for (let i = 1; i < resultados.length; i++) {
        const resultadoAtual = resultados[i];
        if (resultadoAtual.valorTotal < opcaoMenorCusto.valorTotal ||
            resultadoAtual.valorTotal === opcaoMenorCusto.valorTotal && resultadoAtual.classificacao > opcaoMenorCusto.classificacao) {
            // Tenho um hotel com menor custo
            opcaoMenorCusto = resultadoAtual;
        }
    }

    console.log(opcaoMenorCusto);

    return opcaoMenorCusto.nome;
}

module.exports = hotelMaisBarato;
