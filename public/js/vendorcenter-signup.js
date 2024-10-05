let form = document.getElementById("form");
let country = document.getElementById("country");
let receivedCode;
let signupDetails = {};
country.addEventListener("change", function () {
  signupDetails.country = country.value;
});

console.log(signupDetails);

function submit() {
  console.log(signupDetails);

  if (country.value == "0") {
    alert("Please select your country");
    return;
  }

  document.querySelector(".register").style.display = "none";
  document.querySelector(".haveAnAccount").style.display = "none";
  document.querySelector(".heading").innerHTML = "Setup your account";
  document.querySelector(".sub-heading").innerHTML =
    "Please provide your email address to create your account";

  form.innerHTML = `
    <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
    </div>
    <div onclick="verifyEmail()" id="submit">VERIFY</div>`;
}

function verifyEmail() {
  let email = document.getElementById("floatingInput");
  if (email.value == "" || email.value.includes("@") == false) {
    email.classList.add("is-invalid");
    return;
  }
  signupDetails.email = email.value;
  console.log(signupDetails);

  form.innerHTML = `
    <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInputDisabled" placeholder="name@example.com" value="${email.value}" disabled>
        <label for="floatingInputDisabled">Email address</label>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Enter the verification code</label>
    </div>
    <div onclick="verifyCode()" id="submit">VERIFY</div>
    <div onclick="resendCode()" id="submit">RESEND</div>`;
  generateVerificationCode();
  console.log(receivedCode);
}

function resendCode() {
  generateVerificationCode();
  console.log(receivedCode);
}
function verifyCode() {
  let code = document.getElementById("floatingInput");
  if (code.value == "" || code.value !== receivedCode) {
    code.classList.add("is-invalid");
    return;
  }
  signupDetails.verificationCode = code.value;
  console.log(signupDetails);

  form.innerHTML = `
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" >
        <label for="floatingInput">Phone number*</label>
    </div>
    <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="">
        <label for="floatingPassword">Password*</label>
    </div>
    <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingConfirmPassword" placeholder="">
        <label for="floatingConfirmPassword">Confirm password</label>
    </div>
    <div class="register">
        <p>Password should contain at least 8 characters containing a capital letter, a lower letter, a number and a special character</p>
    </div>
    <div onclick="verifyPassword()" id="submit">NEXT</div>`;
}

function generateVerificationCode(length = 6) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let verificationCode = "";
  for (let i = 0; i < length; i++) {
    verificationCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  receivedCode = verificationCode;
}
