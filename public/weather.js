console.log("in weather.js");

api = "/weatherData";

let btn = document.querySelector("#btn1");
let name1 = document.querySelector("#in1").value;
//btn.addEventListener

let loading = document.querySelector("#loading");
loading.style.display = "none";

btn.addEventListener("click", () => {
  loading.style.display = "";
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
      loading.style.display = "none";

      console.log(result);
      temperature = Ftoc(result.temp);

      document.querySelector("#main").innerHTML =
        "<p>  name - " +
        name1 +
        "<br> city - " +
        result.city +
        "<br> tempurature = " +
        temperature +
        "<br> forcast - " +
        result.summry +
        "   </p>";
    });
});

Ftoc = far => {
  return (far - 32) * (5 / 9);
};
