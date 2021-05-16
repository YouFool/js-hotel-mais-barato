const moment = require('moment');

/**
 * Recebe uma data no formato 'DDMMMYYYY(ddd)' e formata a mesma em uma data do tipo {*|moment.Moment}
 * @param data data no formato 'DDMMMYYYY(ddd)' ex: 20Mar2020(fri)
 * @returns {*|moment.Moment} data no formato do moment
 */
const formatarData = data => {
    return moment(data, 'DDMMMYYYY(ddd)');
}

module.exports = formatarData;