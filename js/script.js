// import { products } from "./products.js";   <== importare la lista prodotti in modo locale

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener('click', (e) => {
    cartList.push(productsList.find(product => parseInt(e.currentTarget.id) === product.id));
    cartProductsNum.textContent = `Numero prodotti nel carrello: ${cartList.length}`;
    alert(`Prodotto aggiunto al carrello.\nProdotti totali: ${cartList.length}`);

    localStorage.setItem('total_cart_items', cartList.length);
  });
}

function createImg(parent, imgUrl, productTitle) {
  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = productTitle;

  parent.appendChild(image);
}

function createText(parent, productTitle, textPrice) {
  const title = document.createElement("h4");
  title.textContent = productTitle;

  const price = document.createElement("strong");
  price.textContent = `${textPrice} $`;

  parent.append(title, price);
}


function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(wrapperProducts, product.image, product.title, product.price, product.id);
  });
}


const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;
  renderProducts(data);
}

const localStorageTot = localStorage.getItem('total_cart_items');
let productsList = [];
const wrapperProducts = document.querySelector(".wrapper__products");

const cartBtn = document.querySelector('.cartBtn');
const cartProductsNum = document.querySelector('.cartProductsNum');
const cartClearBtn = document.querySelector('.cartClearBtn');
let cartList = [];

cartProductsNum.textContent = `Numero prodotti nel carrello: ${localStorageTot}`;
getProductsList();

cartBtn.addEventListener('click', () => {
  console.log(cartList)
})

cartClearBtn.addEventListener('click', () => {
  cartList = [];
  localStorage.setItem('total_cart_items', cartList.length);
  cartProductsNum.textContent = `Carrello vuoto`;
})