const firebaseConfig = {
  apiKey: "AIzaSyAPzH_KoY2sotcvyFu773nNr0WiFhzRZnM",
  authDomain: "jumia-950fe.firebaseapp.com",
  projectId: "jumia-950fe",
  storagebucket: "jumia-950fe.appspot.com",
  messagingSenderId: "556601518531",
  appId: "1:556601518531:web:00a72d6a48c52d58ecf576",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

let form = document.querySelector(".form");
let userDetails = {};
let receivedCode;
let emailValue;
let passwordValue;
let firstNameValue;
let lastNameValue;
let phoneNumberValue;
let gender;
let birthDate;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,16}$/;

// function to generaate verification code
function generateVerificationCode(length = 4) {
  const characters = "0123456789";
  let verificationCode = "";
  for (let i = 0; i < length; i++) {
    verificationCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  receivedCode = verificationCode;
}

// 1st step
function verifyEmail(ev) {
  ev.preventDefault();
  let email = document.getElementById("floatingInput");
  emailValue = email.value;

  // Function to check if a user with emailValue exists in the database

  userDetails.email = emailValue;
  if (emailValue == "" || emailValue.includes("@") == false) {
    email.classList.add("is-invalid");
    return;
  }

  ev.target.innerHTML = `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;

  setTimeout(() => {
    document.querySelector(".loginWithFacebook").style.display = "none";

    form.innerHTML = `
      <img src="./assets/images/star-jumia.png" alt="star" />
      <p class="heading">Verify your email address</p>
      <p class="sub-heading">
        We have sent a verification code to ${emailValue}
      </p>
      <div class="form-floating mb-5 w-100">
          <input type="text" maxlength="4" class="form-control w-100" id="floatingCode" placeholder="" oninput="validateCode()">
          <label for="floatingCode" id="label">Verify code</label>
      </div>
      <div onclick="verifyCode(event)" id="continue" class="w-100 p-2 fs-5 mb-2" disabled>VERIFY CODE</div>
      <div onclick="resendCode(event)" id="continueInverse" class="w-100 p-2 fs-5">REQUEST A NEW CODE</div>`;

    // call the function to generate verification code
    generateVerificationCode();
    console.log(receivedCode);
  }, 1500);
}

// function to resend verification code
function resendCode() {
  generateVerificationCode();
  console.log(receivedCode);
}

// function to verify code on submit
// 2nd step(i)

function validateCode() {
  if (document.querySelector("#floatingCode").value.length < 4) {
    return;
  }
  if (document.querySelector("#floatingCode").value.length === 4) {
    verifyCode();
  }
}
function verifyCode() {
  let code = document.getElementById("floatingCode");
  document.getElementById("continue").disabled = true;
  document.getElementById("continue").innerHTML = `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;
  setTimeout(() => {
    if (code.value == "" || code.value !== receivedCode) {
      code.classList.add("is-invalid");
      document.getElementById("continue").disabled = false;
      document.getElementById("continue").innerHTML = `SUBMIT`;
      document.getElementById("label").textContent = `Invalid code`;
      document.getElementById("label").classList.add = "text-danger";
      return;
    }
    code.classList.remove("is-invalid");
    document.getElementById("continue").disabled = false;
    document.getElementById("continue").innerHTML = `SUBMIT`;
    form.innerHTML = `
      <img src="./assets/images/star-jumia.png" alt="star" />
      <p class="heading">Create your account</p>
      <p class="sub-heading">
        Lets get started by creating your account
      </p>
      <p class="sub-heading">
        To keep your account safe, we need a strong password
      </p>
      <div class="form-floating mb-3 w-100">
          <input type="text" class="form-control w-100" id="floatingInputDisabled" placeholder="" oninput="validateCode()" value="${emailValue}" disabled>
      </div>
      <div class="form-floating mb-3 w-100">
          <input type="password" class="form-control w-100" id="floatingPassword" placeholder="" >
          <label for="floatingPassword" id="label">Password</label>
          <i class="fa-solid fa-eye eye" onclick="togglePasswordEye('floatingPassword', 'viewPassword')" id="viewPassword"></i>
      </div>
      <div class="form-floating mb-3 w-100">
          <input type="password" class="form-control w-100" id="floatingConfirmPassword" placeholder="" >
          <label for="floatingConfirmPassword" id="label">Confirm password</label>
          <i class="fa-solid fa-eye eye" onclick="togglePasswordEye('floatingConfirmPassword', 'viewConfirmPassword')" id="viewConfirmPassword"></i>  
      </div>
      <div onclick="submit(event)" id="continue" class="w-100 p-2 fs-5 mb-2">CONTINUE</div>`;
  }, 1500);
}

// function to toggle password visibility
function togglePasswordEye(inputId, iconId) {
  let inputField = document.getElementById(inputId); // Get the input field (password or confirm password)
  let icon = document.getElementById(iconId); // Get the eye icon

  if (icon.classList.contains("fa-eye")) {
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
    inputField.type = "text"; // Show password
  } else {
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
    inputField.type = "password"; // Hide password
  }
}

// 3rd step
// function to submit form
function submit(ev) {
  ev.preventDefault();
  let password = document.getElementById("floatingPassword");
  let confirmPassword = document.getElementById("floatingConfirmPassword");
  if (password.value == "" || confirmPassword.value == "") {
    password.classList.add("is-invalid");
    confirmPassword.classList.add("is-invalid");
    return;
  }
  if (password.value !== confirmPassword.value) {
    password.classList.add("is-invalid");
    confirmPassword.classList.add("is-invalid");
    return;
  }
  if (!passwordRegex.test(password.value)) {
    password.classList.add("is-invalid");
    return;
  }
  password.classList.remove("is-invalid");
  confirmPassword.classList.remove("is-invalid");
  passwordValue = password.value;
  userDetails.password = passwordValue;

  document.getElementById("continue").innerHTML = `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;

  setTimeout(() => {
    form.innerHTML = `
      <img src="./assets/images/star-jumia.png" alt="star" />
      <p class="heading">Personal Details</p>
      <p class="sub-heading">
        We just need you to fill some details
      </p>
      <div class="form-floating mb-3 w-100">
          <input type="text" class="form-control w-100" id="floatingFirstName" placeholder="">
          <label for="floatingFirstName" id="label">First Name</label>
      </div>
      <div class="form-floating mb-3 w-100">
          <input type="text" class="form-control w-100" id="floatingLastName" placeholder="" >
          <label for="floatingLastName" id="label">Last Name</label>
      </div>
      <div class="form-floating mb-3 w-100">
          <input type="text" class="form-control w-100" id="floatingPhoneNumber" placeholder="" >
          <label for="floatingPhoneNumber" id="label">Phone Number</label>
      </div>
      <div onclick="verifyDetails(event)" id="continue" class="w-100 p-2 fs-5 mb-2">CONTINUE</div>`;
  }, 1500);
}

function verifyDetails() {
  let firstName = document.getElementById("floatingFirstName");
  firstNameValue = firstName.value;
  let lastName = document.getElementById("floatingLastName");
  lastNameValue = lastName.value;
  let phoneNumber = document.getElementById("floatingPhoneNumber");
  phoneNumberValue = phoneNumber.value;

  userDetails.firstName = firstNameValue;
  userDetails.lastName = lastNameValue;

  document.getElementById("continue").innerHTML = `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;

  setTimeout(() => {
    form.innerHTML = `
        <img src="./assets/images/star-jumia.png" alt="star" />
        <p class="heading">Personal Details</p>
        <p class="sub-heading">
          We just need you to fill some details
        </p>
        <div class="form-floating mb-3 w-100">
          <select class="form-select w-100" id="floatingSelect" aria-label="Floating label select example">
            <option selected></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label for="floatingSelect">Gender</label>
        </div>
        <div class="form-floating mb-3 w-100">
            <input type="date" class="form-control w-100" id="floatingDate" placeholder="" >
            <label for="floatingDate" id="label">Birth Date</label>
        </div>
        <div onclick="verifyGender(event)" id="continue" class="w-100 p-2 fs-5 mb-2">CONTINUE</div>`;
    // Get today's date
    const today = new Date();

    // Calculate the date 18 years ago from today
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];

    // Set the 'max' attribute to 18 years ago
    document
      .getElementById("floatingDate")
      .setAttribute("max", eighteenYearsAgo);
  }, 1500);
}

function verifyGender() {
  if (document.getElementById("floatingSelect").value == "") {
    document.getElementById("floatingSelect").classList.add("is-invalid");
    return;
  }
  if (document.getElementById("floatingDate").value == "") {
    document.getElementById("floatingDate").classList.add("is-invalid");
    return;
  }
  document.getElementById("floatingSelect").classList.remove("is-invalid");
  document.getElementById("floatingDate").classList.remove("is-invalid");
  gender = document.getElementById("floatingSelect").value;
  birthDate = document.getElementById("floatingDate").value;
  userDetails.gender = gender;
  userDetails.birthDate = birthDate;

  document.getElementById("continue").innerHTML = `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;

  // create user in firebase
  auth
    .createUserWithEmailAndPassword(emailValue, passwordValue)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      auth
        .signInWithEmailAndPassword(emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          userDetails.uid = user.uid;
          user.updateProfile({
            displayName: firstNameValue,
            phoneNumber: phoneNumberValue,
          });
          db.ref("users/" + user.uid).set(userDetails);
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1500);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      auth
        .signInWithEmailAndPassword(emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1500);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    });
}
