import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import totalCost from './helpers/totalCost';
import './style.css';

const olCartProducts = document.querySelector('.cart__products');

function loadProduct(obj) {
  const { id, title, price, pictures } = obj;
  const liProduto = createCartProductElement({ id, title, price, pictures });
  olCartProducts.appendChild(liProduto);
  totalCost();
}

window.onload = async function () {
  try {
    const ids = getSavedCartIDs();
    const arrayPromises = ids.map((item) => fetchProduct(item));
    const storedProducts = await Promise.all(arrayPromises);
    storedProducts.forEach((item) => {
      loadProduct(item);
    });
    totalCost();
  } catch (error) {
    console.log(error.message);
  }
};

const products = document.querySelector('.products');

const loading = (text, error) => {
  const loadingElement = document.createElement('p');
  loadingElement.innerHTML = `<strong>${text}</strong> <br><br> ${error}`;
  loadingElement.className = 'error';

  if (error === undefined) {
    loadingElement.innerHTML = `<strong>${text}</strong>`;
    loadingElement.className = 'loading';
  }
  products.appendChild(loadingElement);
};

const unloading = () => {
  const text = products.firstElementChild;
  products.removeChild(text);
};

try {
  loading('carregando...');
  const computadores = await fetchProductsList('computador');
  unloading();

  computadores.forEach((item) => {
    const obj = {
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      price: item.price,
    };
    const productElement = createProductElement(obj);
    products.appendChild(productElement);
  });
} catch (error) {
  loading('Algum erro ocorreu, recarregue a página e tente novamente!', error.message);
}

const button = document.querySelectorAll('.product__add');

async function adicionarCarrinho() {
  const objSelecionados = JSON.parse(localStorage.getItem('cartProducts'));

  objSelecionados.forEach(async (item) => {
    const objProduto = await fetchProduct(item);
    loadProduct(objProduto);
  });
}

button.forEach((item) => {
  item.addEventListener('click', async (event) => {
    event.preventDefault();
    const tagID = event.target.parentNode.firstChild.innerText;
    saveCartID(tagID);
    olCartProducts.innerHTML = '';
    adicionarCarrinho();
  });
});

document.querySelector('.cep-button').addEventListener('click', () => {
  const cep = document.querySelector('.cep-input').value;
  searchCep(cep);
});
