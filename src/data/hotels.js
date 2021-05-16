/**
 * Retorna todos os hotéis disponíveis com informações de nome, classificação e preços.
 */
const obterHoteis = () => {
    return [
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
    ];
}

module.exports = obterHoteis;