import './mocks/fetchSimulator';
import { fetchProduct, fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste da função fetchProduct', () => {
  it('Se a função não tiver o Id como parâmetro deverá jogar um erro: ', async () => {
    await expect(() => fetchProduct()).rejects.toThrow(new Error('ID não informado'));
  });

  it('Verificar se o retorno está como esperado: ', async () => {
    const response = await fetch(`https://api.mercadolibre.com/items/MLB1405519561`)
    const objetoEsperado = await response.json();
    expect(await fetchProduct('MLB1405519561')).toEqual(objetoEsperado);
  });
});

describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function')
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Verificar se o valor retornado pelo fetchProductsList é igual ao computadorSearch', async () => {
    expect(await fetchProductsList('computador')).toEqual(computadorSearch);
  });

  it('Ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: Termo de busca não informado', async () => {
    await expect(() => fetchProductsList()).rejects.toThrow(new Error('Termo de busca não informado'));
  });

  it('Ao chamar a função fetchProductsList com uma categoria que não existe, deverá retornado uma mensagem de erro.', async () => {
    expect(await fetchProductsList('categoriaInvalida')).toEqual('URL não mapeadahttps://api.mercadolibre.com/sites/MLB/search?q=categoriaInvalida');
  })
});
