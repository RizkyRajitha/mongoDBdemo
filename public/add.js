console.log("awoooooo");

const api = "/addUser";

const btnclk = document.querySelector("#btn1");
const txtfeild1 = document.querySelector("#name1");
const txtfeild2 = document.querySelector("#pass1");
const txtfeild3 = document.querySelector("#age1");
const txtfeild4 = document.querySelector("#hometown1");
const txtfeild5 = document.querySelector("#city1");

btnclk.addEventListener("click", e => {
  e.preventDefault();
  console.log("button clicked");
  let name = txtfeild1.value;
  let pass = txtfeild2.value;
  let age = txtfeild3.value;
  let hometown = txtfeild4.value;
  let city = txtfeild5.value;

  let mess = {
    name: name,
    pass: pass,
    age: age,
    hometown: hometown,
    city: city
  };

  let data = JSON.stringify(mess);

  console.log(data);

  fetch(api, {
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/json" }
    //headers: { "content-type": "application/json" }
  });

  window.location = api;
});
