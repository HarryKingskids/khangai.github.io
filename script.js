// index.js

const products = [
    { name: "Product 1", price: 20, image: "https://via.placeholder.com/150" },
    { name: "Product 2", price: 30, image: "https://via.placeholder.com/150" },
    { name: "Product 3", price: 40, image: "https://via.placeholder.com/150" }
];

const productList = document.getElementById("product-list");

products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
    `;
    productList.appendChild(productElement);
});

function addToCart(name, price) {
    const cartCount = document.getElementById("cart-count");
    let count = parseInt(cartCount.textContent);
    cartCount.textContent = count + 1;
}
