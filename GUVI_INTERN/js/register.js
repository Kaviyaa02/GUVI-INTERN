const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmpassword");
const result = document.querySelector("p");
const submit = document.getElementById("submit");
const profileSubmit = document.getElementById("profile-btn");
const profile = document.getElementById("profilecard");
const fname = document.querySelector("#firstName");
const lname = document.querySelector("#lastName");
const dob = document.querySelector("#birthdayDate");
const phone = document.querySelector("#phoneNumber");
const place = document.querySelector("#place");
localEmail = localStorage.getItem("email");
window.onload = function () {
  if (localEmail != null) {
    window.location.assign("./profile.html");
  }
};

confirmPassword.addEventListener("input", () => {
  if (password.value != confirmPassword.value) {
    result.innerText = "Confirm password does not match";
    profile.classList.remove("d-none");
    profile.classList.add("d-block");

    submit.disabled = true;
  } else {
    result.innerText = "";
    submit.disabled = false;
  }
});

$(document).ready(function () {
  $("#register").submit(function (e) {
    e.preventDefault();
    var postData = {
      email: email.value,
      password: confirmPassword.value,
    };
    $.ajax({
      type: "POST",
      url: "./php/register.php",
      data: postData,
      encode: true,
    }).done(function (res) {
      if (res == "Registration Successful") {
        profile.classList.remove("d-none");
        profile.classList.add("d-block");

        $("#profileInfo").modal({ backdrop: "static", keyboard: false });
        $("#profileInfo").modal("show");
      } else if (res == "Registeration Failed") {
        swal({
          title: "Error",
          text: "Registeration Failed!",
          icon: "info",
          button: "reload!",
        }).then((e) => location.reload());
      } else if (res == "email already exists") {
        swal({
          title: "Nope",
          text: "Email Already Exists!",
          icon: "warning",
          button: "Go to Login!",
        }).then((e) => window.location.assign("./login.html"));
      } else if (res == "oops error! try again") {
        swal({
          title: "Error",
          text: "Try Again!",
          icon: "error",
          button: "reload!",
        }).then((e) => location.reload());
      }
    });
  });
  $("#profile").submit(function (e) {
    e.preventDefault();
    profileSubmit.disabled = true;

    var formData = {
      firstName: fname.value,
      lastName: lname.value,
      dob: dob.value,
      place: place.value,
      phoneNo: phone.value,
      email: email.value,
    };
    console.log(formData);
    $.ajax({
      type: "POST",
      url: "./php/profile.php",
      data: formData,
      encode: true,
    }).done(function (res) {
      if (res == "success") {
        swal({
          title: "Success!",
          text: "Registered Successfully!",
          icon: "success",
          button: "ok!",
        }).then(() => window.location.assign("./login.html"));
      } else if (res == "oops error! try again") {
        swal({
          title: "Error",
          text: "Try Again!",
          icon: "error",
          button: "reload!",
        }).then((e) => (profileSubmit.disabled = false));
      } else if (res == "failed") {
        swal({
          title: "Error",
          text: "Try Again!",
          icon: "error",
          button: "reload!",
        }).then((e) => (profileSubmit.disabled = false));
      }
    });
  });
});
