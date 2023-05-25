import { Usercreate, state, loginWithGoogle, loginWhitFace, addcollection, getcollections} from "./global.js";
state();

const btnvalidar=document.getElementById('createbtn');
const btngugul=document.getElementById('ingugul');
const btnface=document.getElementById('inface');
const datos = document.getElementById('ctrlreg');
function validarContrasena(contrasena) {
  if (contrasena.length < 14) {
    return false;
  }
  if (!/[A-Z]/.test(contrasena)) {
    return false;
  }
  if (!/\d/.test(contrasena)) {
    return false;
  }
  if (!/[!@#$%^&*]/.test(contrasena)) {
    return false;
  }
  return true;
}

async function goog(){
  await loginWithGoogle()
}

async function faceb(){
  await loginWhitFace()
}

async function getall(){
  datos.innerHTML=''
  const docref=getcollections()
  const querySnapshot = await docref
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} `);
      datos.innerHTML+=`
          <tr>
              <th scope="row">${doc.id}</th>
              <td>${doc.data().email}</td>
              <td>${doc.data().contra}</td>
              <td>${doc.data().first}</td>
              <td>${doc.data().last}</td>
              <td>${doc.data().born}</td>
          </tr>
      `
    });
}
async function registeruser(){

    const user = document.getElementById('emailuser').value
    const pws = document.getElementById('pwsuser').value
    const confirmPassword = document.getElementById("confirmpwsuser").value;
    const primer = document.getElementById('fname')
    const segundo = document.getElementById('lname')
    const tel = document.getElementById('phone')

    if (pws === confirmPassword) {
      if(validarContrasena(pws)){
        try {
          const userCredential = await Usercreate(user, pws);
          const registeredUser = userCredential.user;
          console.log(registeredUser);
          addcollection(
            user,
            pws,
            primer.value,
            segundo.value,
            tel.value)
    
            alert('Usuario'+primer.value+'registrado');
          alert('Usuario registrado');
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          alert(errorMessage);
        }}else{
        alert("La contraseña debe tener al menos 14 caracteres, una mayúscula, un número y un carácter especial");
      }} else {
      alert("Las contraseñas no coinciden");
    }
  }

window.addEventListener('DOMContentLoaded',async()=>{
    btnvalidar.addEventListener('click',registeruser)
    btngugul.addEventListener('click',goog)
    btnface.addEventListener('click',faceb)
    getall();
})

