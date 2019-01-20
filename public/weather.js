console.log("in weather.js");

api = "http://localhost:3000/weatherData";

let btn = document.querySelector("#btn1");
let name1 = document.querySelector("#in1").value;
//btn.addEventListener

btn.addEventListener("click", () => {
  let name1 = document.querySelector("#in1").value;
  let data = JSON.stringify({ name: name1 });
  console.log(name1);
  console.log(data);
  fetch(api, {
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(result => {
      console.log(result);
        document.querySelector('#main').innerHTML = "<p>  name - "+name1+"<br> city - "+ result.city +"<br> tempurature = "+result.temp+"<br> forcast - "+result.summry+"   </p>"

    });
});
