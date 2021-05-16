const hotelMaisBarato = require('./hotel');

test('Deve retornar: Parque das flores como hotel mais barato', () => {
    expect(hotelMaisBarato('Regular: 16Mar2020(mon), 17Mar2020(tues), 18Mar2020(wed)')).toBe('Parque das flores');
});

test('Deve retornar: Jardim Botânico como hotel mais barato em desempate', () => {
    expect(hotelMaisBarato('Regular: 20Mar2020(fri), 21Mar2020(sat), 22Mar2020(sun)')).toBe('Jardim Botânico');
});

test('Deve retornar: Mar Atlântico como hotel mais barato em desempate', () => {
    expect(hotelMaisBarato('Fidelidade: 26Mar2020(thur), 27Mar2020(fri), 28Mar2020(sat)')).toBe('Mar Atlântico');
});