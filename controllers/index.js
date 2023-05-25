import {loginvalidation, checkAdminAccess} from "./global.js"

const btnvalidar = document.getElementById('loginbtn');

async function LoginInit(){

    const user = document.getElementById('emailuser').value
    const pws = document.getElementById('pwsuser').value

    const sesion = loginvalidation(user,pws)
    const confirmation = await sesion

    .then((userCredential) => {
        // Signed in 
        alert("The user : "+user+" successfull")
        window.location.href="../Templates/inicio.html"
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("The user : "+user+" no validation " + errorMessage)
      });
      checkAdminAccess();
}

window.addEventListener('DOMContentLoaded',async()=>
{
    btnvalidar.addEventListener('click',LoginInit)
})

