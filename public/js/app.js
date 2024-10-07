const firebaseConfig = {
  apiKey: "AIzaSyAPzH_KoY2sotcvyFu773nNr0WiFhzRZnM",
  authDomain: "jumia-950fe.firebaseapp.com",
  projectId: "jumia-950fe",
  storagecket: "jumia-950fe.appspot.com",
  messagingSenderId: "556601518531",
  appId: "1:556601518531:web:00a72d6a48c52d58ecf576",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    document.getElementById("displayName").textContent = `Hi ${user.displayName}`;
  }
});

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

    // Format the price to Nigerian Naira
    function currencyFormatter(number) {
      return number.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }

    for (let index = 0; index < 6; index++) {
      const formattedCurrency = currencyFormatter(
        topSellers[index].price * 1650
      );
      topSellersElement.innerHTML += `
      <div class="section2-content" onclick="showProduct(${index + 1})">
        <img src="${topSellers[index].image}" alt="" />
        <p class="title">${topSellers[index].title}</p>
        <p class="price">₦ ${formattedCurrency}</p>  
      </div>
      `;
    }
  } catch (error) {
    console.log(error);
  }
}
async function getCategories() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const categories = await response.json();
    console.log(categories);
  } catch (error) {
    console.log(error);
  }
}
getCategories();

document.addEventListener("DOMContentLoaded", function () {
  // Get the buttons and dropdown elements by ID
  const accountBtn = document.getElementById("accountBtn");
  const helpBtn = document.getElementById("helpBtn");
  const dropdown1 = document.getElementById("dropdown1");
  const dropdown2 = document.getElementById("dropdown2");

  // Add event listeners to the buttons
  accountBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent this click from bubbling up to the document
    dropdown1.classList.toggle("show");
    dropdown2.classList.remove("show"); // Close the other dropdown if open
  });

  helpBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent this click from bubbling up to the document
    dropdown2.classList.toggle("show");
    dropdown1.classList.remove("show"); // Close the other dropdown if open
  });

  // Event listener to close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    // If the click is outside both the dropdowns and buttons, close the dropdowns
    if (
      !accountBtn.contains(event.target) &&
      !dropdown1.contains(event.target)
    ) {
      dropdown1.classList.remove("show");
    }
    if (!helpBtn.contains(event.target) && !dropdown2.contains(event.target)) {
      dropdown2.classList.remove("show");
    }
  });
});

function showProduct(index) {
  localStorage.setItem("selectedProduct", index);
  window.location.href = "products.html";
}

document.querySelector(".signInBtn").addEventListener("click", () => {
  window.location.href = "sign-in.html";
  console.log("eror");
});

getTopSellers();

getProducts();
