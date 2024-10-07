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

let selectedProduct = localStorage.getItem("selectedProduct");
console.log(selectedProduct);

const townsByState = {
  abia: ["Aba", "Umuahia", "Ohafia", "Arochukwu", "Isuikwuato"],
  adamawa: ["Yola", "Mubi", "Numan", "Ganye", "Michika"],
  "akwa-ibom": ["Uyo", "Ikot Ekpene", "Eket", "Oron", "Etinan"],
  anambra: ["Awka", "Onitsha", "Nnewi", "Ekwulobia", "Aguata"],
  bauchi: ["Bauchi", "Azare", "Misau", "Jama'are", "Tafawa Balewa"],
  bayelsa: ["Yenagoa", "Brass", "Sagbama", "Ogbia", "Ekeremor"],
  benue: ["Makurdi", "Gboko", "Otukpo", "Vandeikya", "Katsina-Ala"],
  borno: ["Maiduguri", "Biu", "Bama", "Gwoza", "Kukawa"],
  "cross-river": ["Calabar", "Ikom", "Ogoja", "Obudu", "Ugep"],
  delta: ["Asaba", "Warri", "Sapele", "Agbor", "Ughelli"],
  ebonyi: ["Abakaliki", "Afikpo", "Onueke", "Ezza", "Ishielu"],
  edo: ["Benin City", "Ekpoma", "Auchi", "Uromi", "Irrua"],
  ekiti: ["Ado-Ekiti", "Ikere", "Oye", "Ilawe", "Irepodun"],
  enugu: ["Enugu", "Nsukka", "Awgu", "Oji River", "Udi"],
  gombe: ["Gombe", "Kumo", "Deba", "Billiri", "Kaltungo"],
  imo: ["Owerri", "Orlu", "Okigwe", "Mbaise", "Oguta"],
  jigawa: ["Dutse", "Hadejia", "Kazaure", "Ringim", "Gumel"],
  kaduna: ["Kaduna", "Zaria", "Kafanchan", "Kagoro", "Saminaka"],
  kano: ["Kano", "Wudil", "Rano", "Gaya", "Bichi"],
  katsina: ["Katsina", "Daura", "Funtua", "Dutsin-Ma", "Malumfashi"],
  kebbi: ["Birnin Kebbi", "Argungu", "Yauri", "Zuru", "Kamba"],
  kogi: ["Lokoja", "Idah", "Okene", "Kabba", "Koton Karfe"],
  kwara: ["Ilorin", "Offa", "Omu-Aran", "Pategi", "Lafiagi"],
  lagos: ["Lagos", "Ikeja", "Epe", "Badagry", "Ikorodu"],
  nasarawa: ["Lafia", "Keffi", "Akwanga", "Nasarawa", "Karu"],
  niger: ["Minna", "Suleja", "Bida", "Kontagora", "Agaie"],
  ogun: ["Abeokuta", "Sagamu", "Ijebu Ode", "Ota", "Ilaro"],
  ondo: ["Akure", "Owo", "Ondo Town", "Ikare", "Okitipupa"],
  osun: ["Osogbo", "Ife", "Ilesa", "Ede", "Ikirun"],
  oyo: ["Ibadan", "Oyo", "Ogbomosho", "Iseyin", "Saki"],
  plateau: ["Jos", "Barkin Ladi", "Shendam", "Pankshin", "Mangu"],
  rivers: ["Port Harcourt", "Bonny", "Ahoada", "Degema", "Omoku"],
  sokoto: ["Sokoto", "Wamako", "Tambuwal", "Isa", "Bodinga"],
  taraba: ["Jalingo", "Wukari", "Takum", "Sardauna", "Bali"],
  yobe: ["Damaturu", "Potiskum", "Gashua", "Geidam", "Nguru"],
  zamfara: ["Gusau", "Kaura Namoda", "Shinkafi", "Anka", "Talata Mafara"],
  fct: ["Abuja", "Gwagwalada", "Kuje", "Kwali", "Bwari"],
};

const stateSelect = document.getElementById("state");
const townSelect = document.getElementById("town");

// Listen for changes in the state selection
stateSelect.addEventListener("change", function () {
  const selectedState = this.value;
  const towns = townsByState[selectedState] || []; // Get towns for the selected state or empty array if none

  // Clear the current town options
  townSelect.innerHTML = '<option value="">-- Select a town --</option>';

  // Populate the towns dropdown with new options
  towns.forEach((town) => {
    const option = document.createElement("option");
    option.value = town.toLowerCase().replace(/\s+/g, "-");
    option.textContent = town;
    townSelect.appendChild(option);
  });
});

async function getProduct() {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${selectedProduct}`
    );
    const data = await response.json();
    console.log(data);

    // Format the price to Nigerian Naira
    function currencyFormatter(number) {
      return number.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0 
      });
    }
    const formattedCurrency = currencyFormatter(data.price * 1650);
    document.title = `${data.title}`;
    document.getElementById("left").innerHTML = `
    <div class="top">
      <div class="left">
        <img src="${data.image}" alt="" />
        <div class="share">
          <p>Share this Product</p>
          <i class="fa-brands fa-facebook-f"></i>
          <i class="fa-brands fa-x-twitter"></i>
        </div>
      </div>
      <div class="right">
        <p class="product-title">${data.title}</p>
        <div class="price-addToCart">
          <p class="product-price">₦ ${formattedCurrency}</p>
          <p class="availability">In stock</p>
          <p class="shipping-detail">
            + shipping from ₦ 750 to LEKKI-AJAH (SANGOTEDO)
          </p>
          <p class="rating">
            <i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i
            ><i class="fa-regular fa-star"></i>
            <span class="rating-count">(${data.rating.count} verified ratings)</span>
          </p>
          <button class="add-to-cart">
            <i class="fa-solid fa-cart-plus"></i>
            <p>ADD TO CART</p>
          </button>
        </div>
        <div class="promotions">
          <p>PROMOTIONS</p>
          <a href="#">
            <img src="./assets/images/star-jumia.png" alt="" />Call
            07006000000 To Place Your Order</a
          >
          <a href="#">
            <img src="./assets/images/star-jumia.png" alt="" />Need
            extra money? Loan up to N500,000 on the JumiaPay Android
            app.</a
          >
          <a href="#">
            <img src="./assets/images/star-jumia.png" alt="" />Enjoy
            cheaper shipping fees when you select a PickUp Station at
            checkout.</a
          >
        </div>
      </div>
    </div>`;
  } catch (error) {
    console.log(error);
  }
}

getProduct();
