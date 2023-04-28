export const getAddress = async (cep) => {
  const responseOne = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const responseTwo = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const dataOne = await responseOne.json();
  const dataTwo = await responseTwo.json();

  return Promise.any([dataOne, dataTwo])
    .then((result) => result)
    .catch((error) => error.message);
};

export const searchCep = async (cep) => {
  const field = document.querySelector('.cart__address');
  try {
    const add = await getAddress(cep);
    const address = (add.address === undefined) ? add.street : add.address;
    const district = (add.district === undefined) ? add.neighborhood : add.district;

    if (!address && !district && !add.city && !add.state) {
      field.innerHTML = 'CEP não encontrado';
    } else {
      field.innerHTML = `${address} - ${district} - ${add.city} - ${add.state}`;
    }
  } catch (error) {
    field.innerHTML = 'CEP não encontrado';
    return error.message;
  }
};
