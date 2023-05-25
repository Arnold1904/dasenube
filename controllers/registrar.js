import { adduser,readuser } from "./global.js";

const btningdatos = document.getElementById('ingdatos')
const btn = document.getElementById('btnsearch')
const vizualizar = document.getElementById('container1')
async function ingdatos(){
    const cedula = document.getElementById('emailuser')
    const primer = document.getElementById('fname')
    const segundo = document.getElementById('lname')
    const tel = document.getElementById('phone')
    const img = document.getElementById('response')
    adduser(
        cedula.value,
        primer.value,
        segundo.value,
        tel.value,
        img.value)

        alert('Usuario'+primer.value+'registrado');
}
async function getdetails(){
    
    const ced=document.getElementById('edtid').value
    
    const docRef = readuser(ced);
    const docSnap = await docRef;

    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    let html=""
    html=`
        <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${docSnap.data().nombre}</h5>
        <p class="card-text">${docSnap.data().cedula}</p>
        <p class="card-text">${docSnap.data().apellido}</p>
        <p class="card-text">${docSnap.data().celular}</p>
        </div>
    </div>`
    vizualizar.innerHTML=html
    } else {
  // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
}
window.addEventListener('DOMContentLoaded',async()=>{
    btningdatos.addEventListener('click',ingdatos)
    btn.addEventListener('click',getdetails)
})