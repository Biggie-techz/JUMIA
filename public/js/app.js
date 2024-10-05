const firebaseConfig = {
  apiKey: "AIzaSyAPzH_KoY2sotcvyFu773nNr0WiFhzRZnM",
  authDomain: "jumia-950fe.firebaseapp.com",
  projectId: "jumia-950fe",
  storageBucket: "jumia-950fe.appspot.com",
  messagingSenderId: "556601518531",
  appId: "1:556601518531:web:00a72d6a48c52d58ecf576",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

async function getProducts() {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getTopSellers() {
  let topSellersElement = document.getElementById("topSelling");
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const topSellers = await response.json();
    console.log(topSellers);
    topSellersElement.innerHTML = "";
    for (let index = 0; index < 6; index++) {
      topSellersElement.innerHTML += `
      <div class="section2-content" onclick="showProduct(${index + 1})">
        <img src="${topSellers[index].image}" alt="" />
        <p class="title">${topSellers[index].title}</p>
        <p class="price">₦${topSellers[index].price * 1600}</p>  
      </div>
      `;
    }
  } catch (error) {
    console.log(error);
  }
}

function showProduct(index) {
  localStorage.setItem("selectedProduct", index);
  window.location.href = "products.html";
}

getTopSellers();

getProducts();
