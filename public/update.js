console.log('in uodate.js')

const api = "/updateUsers";


let upname1 = document.querySelector('#upname')
let btn = document.querySelector('#btn1')
const txtfeild1 = document.querySelector("#name1");
const txtfeild2 = document.querySelector("#pass1");
const txtfeild3 = document.querySelector("#age1");
const txtfeild4 = document.querySelector("#hometown1");

btn.addEventListener('click',e=>{
    e.preventDefault();
    let name = txtfeild1.value;
    let pass = txtfeild2.value;
    let age = txtfeild3.value;
    let hometown = txtfeild4.value;
    let upname = upname1.value;

    let message = { upname:upname, name:name , pass:pass , age:age , hometown:hometown}
    let data = JSON.stringify(message);
    //data = 'enwada'
    console.log(data)

    fetch(api,{
        method:'POST',
        body:data,
        headers:{"Content-Type": "application/json"}
    }).then()
    

})

