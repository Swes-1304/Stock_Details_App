"use strict";
window.addEventListener("load", (event) => {
  console.log("page is fully loaded");

  var form = document.querySelector("form");
  var inputs = document.querySelectorAll("input");
  var required_inputs = document.querySelectorAll("input[required]");
  var register = document.querySelector('input[type="submit"]');
  form.addEventListener("keyup", function (e) {
    var disabled = false;
    required_inputs.forEach(function (input, index) {
      if (input.value === "" || !input.value.replace(/\s/g, "").length) {
        disabled = true;
      }
    });
    if (disabled) {
      register.setAttribute("disabled", "disabled");
    } else {
      register.removeAttribute("disabled");
    }
  });
});

var mygetstock = () => {
  return new Promise(function (resolve, reject) {
    let stocknaming = document.getElementById("stockname").value;
    const url =
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
      stocknaming +
      "&interval=5min&apikey=1WAIFMCCJ4HJG14C";
    //console.log(url)
    axios
      .get(url)
      .then((response) => {
        let a = JSON.stringify(response.data);
        const datasplit = a.split(/,|{|}/);
        console.log(datasplit);
        if (datasplit.length < 6) alert(" Provide a Valid Equity name!!");
        else {
          for (var i = 0; i < datasplit.length; i++) {
            datasplit[i] = datasplit[i].replace(/"+/g, "");
            document.getElementById("values").innerHTML +=
              datasplit[i] + "<br /> ";
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    document.getElementById("values").innerHTML = "";
    document.stockdetails.reset();
  });
};

var main = async () => {
  const btn = document.querySelector("check");
  var Count = 0;
  var guestusers = [];
  var guestusers = JSON.parse(localStorage.getItem("guestuserdetails"));
  console.log(guestusers);
  if (guestusers === null) {
    guestusers = [{ Email: "Emails of Guest Users", Count: 0 }];
  }
  console.log(guestusers);
  let newguestuser = {
    Email: JSON.stringify(document.getElementById("email").value),
    Count: ++Count,
  };
  console.log(guestusers);
  console.log(JSON.stringify(document.getElementById("email").value));
  // var checkemail =(mail) => {
  //     return mail == (JSON.stringify(document.getElementById("email").value))
  // }
  var indexofuser = guestusers.findIndex(
    (z) => z.Email === JSON.stringify(document.getElementById("email").value)
  );
  console.log(indexofuser);
  if (indexofuser < 0) {
    guestusers.push(newguestuser);
    console.log(guestusers);
    localStorage.setItem("guestuserdetails", JSON.stringify(guestusers));
  } else if (
    indexofuser > 0 &&
    guestusers[indexofuser].Count > 3 &&
    guestusers[indexofuser].Email ==
      JSON.stringify(document.getElementById("email").value)
  ) {
    console.log(guestusers[indexofuser].count);

    alert(
      " You have execeed your limit of 4 requests! you must register and login to view our pricing tier!!"
    );
    setTimeout(function () {
      window.location.href = "index";
    }, 250);
  } else if (
    indexofuser > 0 &&
    guestusers[indexofuser].Count < 4 &&
    guestusers[indexofuser].Email ==
      JSON.stringify(document.getElementById("email").value)
  ) {
    console.log(guestusers, guestusers[indexofuser].count);
    guestusers[indexofuser].Count++;
    localStorage.setItem("guestuserdetails", JSON.stringify(guestusers));
    console.log(guestusers[indexofuser].count);
    //setTimeout(function(){window.location.href ="stock";},500)
  }

  var result = await mygetstock();
};

//1WAIFMCCJ4HJG14C
//stock1();
