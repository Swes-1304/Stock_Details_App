"use strict";
let users = [];
let signup = () => {
  var pwdpattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/;
  if (document.getElementById("password").value.match(pwdpattern)) {
    var existingusers = JSON.parse(localStorage.getItem("userdetails"));
    if (existingusers == null) existingusers = [];
    let newuser = {
      Full_Name: document.getElementById("fullname").value,
      Email: document.getElementById("email").value,
      Password: btoa(document.getElementById("password").value),
    };

    if (
      existingusers.some(
        (mail) => mail.Email == document.getElementById("email").value
      )
    ) {
      alert("User already exits!!!!");
      setTimeout(function () {
        window.location.href = "signup";
      });
    } else {
      existingusers.push(newuser);
      localStorage.setItem("userdetails", JSON.stringify(existingusers));
      setTimeout(function () {
        window.location.href = "thankyou";
      });
    }
  } else alert(" Enter a Valid password !");
};
