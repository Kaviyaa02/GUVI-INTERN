const email = document.querySelector("#email");
const password = document.querySelector("#password");
localEmail = localStorage.getItem("email");
window.onload = function () {
  if (localEmail != null) {
    window.location.assign("./profile.html");
  }
};
$(document).ready(function () {
  $("#login").submit(function (e) {
    e.preventDefault();

    var postData = {
      email: email.value,
      password: password.value,
    };
    $.ajax({
      type: "POST",
      url: "./php/login.php",
      data: postData,
      encode: true,
    }).done(function (res) {
      if (res == "success") {
        localStorage.setItem("email", email.value);

        swal({
          title: "Success!",
          text: "Login Success!",
          icon: "success",
          button: "ok!",
        }).then(() => window.location.assign("./profile.html"));
      } else if (res == "Wrong credentials") {
        swal({
          title: "Error",
          text: "Wrong email or password!",
          icon: "info",
          button: "reload!",
        });
      } else if (res == "Email not registered") {
        swal({
          title: "Nope",
          text: "Email Doesn't Exists!",
          icon: "warning",
          button: "Go to Register!",
        }).then((e) => window.location.assign("./register.html"));
      } else if (res == "error try again") {
        swal({
          title: "Error",
          text: "Try Again!",
          icon: "error",
          button: "reload!",
        }).then((e) => location.reload());
      }
    });
  });
});
