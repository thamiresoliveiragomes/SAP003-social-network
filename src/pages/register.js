import Button from '../components/button.js';
import Input from '../components/input.js';

// function equal(string, string2) {
//   return (string === string2)
// }

function saveUser() {
  const firestoreUserCollection = firebase.firestore().collection('users');
  const nome = document.querySelector('.js-text-input');
  const sobrenome = document.querySelector('.js-text2-input');
  const bio = document.querySelector('.js-bio-input');
  const status = document.querySelector('.js-status-input');
  const user = {
    nome: nome.value,
    sobrenome: sobrenome.value,
    bio: bio.value,
    status: status.value,
    user_uid: firebase.auth().currentUser.uid,
  };
  firestoreUserCollection.add(user);
}

function create() {
  const email = document.querySelector('.js-email-input').value;
  const password = document.querySelector('.js-password-input').value;
  const passwordConfirmation = document.querySelector('.js-confirm-password-input').value;
  const errorMessage = document.querySelector('.error');

  if (password === passwordConfirmation) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      window.location = '#feed';
      saveUser();
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
      ${Input({ type: 'text', class: 'js-text-input', placeholder: 'nome' })}<br>
      ${Input({ type: 'text', class: 'js-text2-input', placeholder: 'sobrenome' })}<br>
      ${Input({ type: 'text', class: 'js-bio-input', placeholder: 'bio' })}<br>
      ${Input({ type: 'date', class: 'js-date-input' })}<br>
      <select class='js-status-input'>
        <option value=solteiro>Solteiro(a)</option>
        <option value=namorando>Namorando</option> 
        <option value=casado>Casado(a)</option>";
      </select><br>
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

window.saveUser = saveUser;

export default Register;
