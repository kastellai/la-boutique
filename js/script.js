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
    alert(`Prodotto aggiunto al carrello.\nProdotti totali: ${cartList.length}`);
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

const wrapperProducts = document.querySelector(".wrapper__products");
const cartList = [];
const cartBtn = document.querySelector('.cartBtn');
let productsList = [];

getProductsList();

cartBtn.addEventListener('click', () => {
  console.log(cartList)
})