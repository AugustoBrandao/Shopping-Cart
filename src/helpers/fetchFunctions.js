export const fetchProduct = async (id) => {
  if (id === undefined) throw new Error('ID não informado');
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (termo) => {
  if (termo === undefined) throw new Error('Termo de busca não informado');

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${termo}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    return error.message;
  }
};
