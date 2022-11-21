localEmail = localStorage.getItem("email");
logout = document.getElementById("logout");
edit = document.getElementById("edit");
fName = document.getElementById("fname");
lName = document.getElementById("lname");
email = document.getElementById("email");
place = document.getElementById("place");
phone = document.getElementById("phone");
dob = document.getElementById("dob");

const pFirstname = document.querySelector("#firstNamefield");
const pLastname = document.querySelector("#lastNamefield");
const pDob = document.querySelector("#birthdayDatefield");
const pPhone = document.querySelector("#phoneNumberfield");
const pPlace = document.querySelector("#placefield");
const profileSubmit = document.getElementById("profile-btn");
const profile = document.getElementById("profilecard");
window.onload = function () {
  if (localEmail == null) {
    window.location.assign("./login.html");
  }
};
logout.addEventListener("click", logoutFunc);

function logoutFunc() {
  swal({
    title: "Logout?",
    text: "Want to logout!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((e) => {
    if (e) {
      localStorage.clear();

      window.location.assign("./");
    }
  });
}
edit.addEventListener("click", editProfile);

function editProfile() {
  profile.classList.remove("d-none");
  profile.classList.add("d-block");

  $("#profileInfo").modal("show");
}

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "./php/profile.php",
    data: {
      email: localEmail,
    },
    encode: true,
  }).done(function (e) {
    if (e == "login again") {
      console.log("error");
    } else {
      res = JSON.parse(e);

      email.innerHTML = res.email;
      fName.innerHTML = res.firstName.toUpperCase();
      lName.innerHTML = res.lastName.toUpperCase();
      phone.innerHTML = res.phoneNo;
      place.innerHTML = res.place;
      dob.innerHTML = res.dob;
    }
  });
});

$("#profile").submit(function (e) {
  e.preventDefault();

  var formData = {
    firstName: pFirstname.value,
    lastName: pLastname.value,
    dob: pDob.value,
    place: pPlace.value,
    phoneNo: pPhone.value,
    email: localEmail,
  };
  console.log(formData);
  $.ajax({
    type: "PUT",
    url: "./php/profile.php",
    data: formData,
    encode: true,
  }).done(function (res) {
    if (res == "success") {
      swal({
        title: "Success!",
        text: "Updated Successfully!",
        icon: "success",
        button: "ok!",
      }).then(() => location.reload());
    } else if (res == "failed") {
      swal({
        title: "Error",
        text: "Try Again!",
        icon: "error",
        button: "reload!",
      }).then((e) => location.reload());
    }
  });
});
