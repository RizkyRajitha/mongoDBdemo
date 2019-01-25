console.log("in view.js");

const txtName = document.querySelector("#objid");
const btn = document.querySelector("#btn1");
const divres = document.querySelector('#divres')

btn.addEventListener("click", e => {
  e.preventDefault();
  let nametxt = txtName.value;

  let data = { name: nametxt };

  console.log(data);

  fetch("/viewUsers", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  }).then( res => res.json() ).then((r)=>{
    console.log(r)
    //console.log(length(r))
    divres.innerHTML = "";

    r.forEach(element => {

      //divres.innerHTML += "<p> name -  "+element.name +"<br> passowrd - "+element.password+"<br> age - "+element.age+"<br> hometown - "+element.hometown+"<br> city - "+element.city+"</p>"
      divres.innerHTML+=`\
      \
      <div class="row">\
      <div class="col s12 ">\
        <div class="card grey darken-4">\
          <div class="card-content white-text">\
            <span class="card-title">${element.name}</span>\
            <p id="p1">${element.name}</p>
            <p id="p2">${element.password}</p>
            <p id="p3">${element.age}</p>
            <p id="p4">${element.hometown}</p>
            <p id="p5">${element.city}</p>
          </div>
        </div>
      </div>
    </div>
      
      
      
      `


    });
  
  
  })

});
