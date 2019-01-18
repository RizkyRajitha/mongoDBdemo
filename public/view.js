console.log("in view.js");

const txtName = document.querySelector("#objid");
const btn = document.querySelector("#btn1");
const divres = document.querySelector('#divres')

btn.addEventListener("click", e => {
  e.preventDefault();
  let nametxt = txtName.value;

  let data = { name: nametxt };

  console.log(data);

  fetch("http://localhost:3000/viewUsers", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  }).then( res => res.json() ).then((r)=>{
    console.log(r)
    //console.log(length(r))
    divres.innerHTML = "";

    r.forEach(element => {

      divres.innerHTML += "<p> "+element.name +"<br>"+element.password+"<br>"+element.age+"</p>"
      
    });
  
  
  })

});
