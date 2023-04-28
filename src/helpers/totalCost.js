import { fetchProduct } from './fetchFunctions';

export default async function totalCost() {
  const objSelected = JSON.parse(localStorage.getItem('cartProducts'));
  if (objSelected !== null) {
    const promises = objSelected.map((product) => fetchProduct(product));
    const allProducts = await Promise.all(promises);
    const total = allProducts.reduce((acc, curr) => acc + curr.price, 0);
    document.querySelector('.total-price').innerText = total.toFixed(2);
  }
}
