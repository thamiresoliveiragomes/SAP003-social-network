import Button from '../components/button.js';
import Input from '../components/input.js';

function create() {
  const email = document.querySelector('.js-email-input').value;
  const password = document.querySelector('.js-password-input').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    window.location = '#config';
  }, (error) => {
    const errorCode = error.code;
    const errorMessage = document.querySelector('.error');
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
