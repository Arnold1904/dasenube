import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js"
import { getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
   GoogleAuthProvider, 
   signInWithPopup,  
   FacebookAuthProvider
  } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
  import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js"


const firebaseConfig = {
  apiKey: "AIzaSyCj3ud3nETOc8jw797ILj4niD2DRI80Tck",
  authDomain: "desanube.firebaseapp.com",
  projectId: "desanube",
  storageBucket: "desanube.appspot.com",
  messagingSenderId: "952391997342",
  appId: "1:952391997342:web:c5c856fa9a1a3aaf77688f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//gestiona la autenticacion del usuario
const auth = getAuth(app);



//constantes exportadas a las distintas paginas
export const loginvalidation=(email,password)=>signInWithEmailAndPassword(auth, email, password);
export const Usercreate=(email, password)=>createUserWithEmailAndPassword(auth, email, password);

export const logout=()=>signOut(auth);

export const addcollection=(email,contra,first,last,born)=>
addDoc(collection(db,"usersinhos"),{
  email,
  contra,
  first,
  last,
  born
});
 
export const adduser=(cedula,nombre,apellido,celular,imagen)=>
  setDoc(doc(db, "usuarios", cedula),{
    cedula,
    nombre,
    apellido,
    celular,
    imagen 
  });

 export const readuser=(cedula)=>
 getDoc(doc(db, "usuarios", cedula));

export const getcollections=()=>
  getDocs(collection(db, "usersinhos"));


export function state(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("registrado");
    } else {
      // User is signed out
      // ...
      
      console.log("no registrado");
      window.location.href="../index.html"
    }
  });
}
export function checkAdminAccess() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Verificar el correo electrónico del usuario
      if (user.email === 'admin@a.com') {
        // El usuario es el administrador, redirigir a la página de administrador
        window.location.href = '../Templates/inicio.html';
      } else {
        // El usuario no es el administrador, redirigir a otra página
        window.location.href = '../Templates/registrar.html';
      }
    } else {
      // El usuario no está autenticado, redirigir a otra página
      window.location.href = 'otra-pagina.html';
    }
  });
}
export const loginWhitFace =()=>{
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    alert("Sesión iniciada correctamente con Facebok.");
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
}


export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  //return signInWithPopup(auth, provider);
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    alert("Sesión iniciada correctamente con Google.");
    window.location.href="../Templates/inicio.html";
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
};





