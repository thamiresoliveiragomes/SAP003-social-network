import Button from '../components/button.js';
import Input from '../components/input.js';

function create() {
  const name = document.querySelector('.js-name-input').value;
  const email = document.querySelector('.js-email-input').value;
  const password = document.querySelector('.js-password-input').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).then((certo) => {
    console.log('certo');
    window.location = '#config';
  }, (error) => {
  // Handle Errors here.
    const errorCode = error.code;
    
    console.log('errooooo');
    if (errorCode === 'auth/weak-password') errorMessage.textContent = 'A senha deve possuir no mínimo 6 caracteres';
    if (errorCode === 'auth/email-already-in-use') errorMessage.textContent = 'O e-mail informado já está em uso';
    if (errorCode === 'auth/operation-not-allowed') errorMessage.textContent = 'Conta não ativada';
    if (errorCode === 'auth/invalid-email') errorMessage.textContent = 'Email inválido';
  });
}

function Register() {
  const template = `
    <section class="box-login">
    <h1>Criar Conta</h1>
    <form>
      ${Input({ type: 'email', class: 'js-email-input', placeholder: 'email' })}<br>
      ${Input({ type: 'password', class: 'js-password-input', placeholder: 'senha' })}<br>
      ${Button({ class: 'create', title: 'Criar conta', onclick: create })}<br>
    </form>
    <p class="error"></p><br>
    <p>Já tem uma conta? <a href="#login">Login</a></p>
    </section>
  `;
  return template;
}


export default Register;
