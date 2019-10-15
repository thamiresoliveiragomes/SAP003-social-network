import Button from '../components/button.js';
import Input from '../components/input.js';
import RoundButton from '../components/round-button.js';

function signIn() {
  const email = document.querySelector('.js-email-input').value;
  const password = document.querySelector('.js-password-input').value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    window.location = '#feed';
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = document.querySelector('.error');
    if (errorCode === 'auth/invalid-email') errorMessage.textContent = 'Email inválido';
    if (errorCode === 'auth/user-disabled') errorMessage.textContent = 'Usuário desabilitado';
    if (errorCode === 'auth/user-not-found') errorMessage.textContent = 'Usuário não encontrado';
    if (errorCode === 'auth/wrong-password') errorMessage.textContent = 'Senha incorreta';
  });
}

function google() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(() => {
    window.location = '#feed';
  });

  // This gives you a Google Access Token. You can use it to access the Google API.
  // const token = result.credential.accessToken;
  // console.log(token);

  // The signed-in user info.
  // const user = result.user;
  // document.querySelector('.greetings').innerHTML = `Olá ${user.displayName}`;
  // const test = document.querySelector('.greetings');
  // console.log(test)

  // }).catch((error) => {
  //   // Handle Errors here.
  //   // const errorCode = error.code;
  //   // const errorMessage = error.message;
  //   // The email of the user's account used.
  //   // const email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   // const credential = error.credential;
  //   // ...
  // });
}

function Login() {
  const template = `
  <figure>
    <img class="logo" src="imagens/viagens-2c.png"/> 
  </figure>

    <section class="box-login">
      <h1 class="title">&lt nomeee &gt</h1>
      <h3 class="subtitle">Bem vindo, viajante!</h3>
        <form>
          ${Input({ type: 'email', class: 'js-email-input', placeholder: ' Email' })}<br>
          ${Input({ type: 'password', class: 'js-password-input', placeholder: ' Senha' })}<br>
          ${Button({ class: 'signIn', title: 'Entrar', onclick: signIn })}
       </form>
      <section class="error"></section><br>
      <section>Entrar com a conta do Google<br>
        ${RoundButton({ icone: 'fab fa-google', class: 'google', title: 'google', onclick: google })}
      </section>
    <p>Ainda não tem uma conta? <a href="#register">Registre-se</a></p>
    </section>
    `;
  window.location = '#login';

  return template;
}

export default Login;
