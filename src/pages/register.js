import Button from '../components/button.js';
import Input from '../components/input.js';

function create() {
  const email = document.querySelector('.js-email-input').value;
  const password = document.querySelector('.js-password-input').value;
  const passwordConfirmation = document.querySelector('.js-confirm-password-input').value;
  const errorMessage = document.querySelector('.error');
  if (password === passwordConfirmation) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      window.location = '#config';
    }).catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/weak-password') errorMessage.textContent = 'A senha deve possuir no mínimo 6 caracteres';
      if (errorCode === 'auth/email-already-in-use') errorMessage.textContent = 'O e-mail informado já está em uso';
      if (errorCode === 'auth/operation-not-allowed') errorMessage.textContent = 'Conta não ativada';
      if (errorCode === 'auth/invalid-email') errorMessage.textContent = 'Email inválido';
    });
  } else {
    errorMessage.textContent = 'Senha não confere';
  }
}

function Register() {
  const template = `
    <section class="box-login">
    <h1>Criar Conta</h1>
    <form>
      ${Input({ type: 'email', class: 'js-email-input', placeholder: 'email' })}<br>
      ${Input({ type: 'password', class: 'js-password-input', placeholder: 'senha' })}<br>
      ${Input({ type: 'password', class: 'js-confirm-password-input', placeholder: 'confirmar senha' })}<br>
      ${Button({ class: 'create', title: 'Criar conta', onclick: create })}<br>
    </form>
    <p class="error"></p><br>
    <p>Já tem uma conta? <a href="#login">Login</a></p>
    </section>
  `;
  return template;
}

export default Register;
