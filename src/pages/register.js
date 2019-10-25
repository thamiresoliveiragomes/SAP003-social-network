import Button from '../components/button.js';
import Input from '../components/input.js';

function saveUser() {
  const firestoreUserCollection = firebase.firestore().collection('users');
  const nome = document.querySelector('.js-text-input');
  const sobrenome = document.querySelector('.js-text2-input');
  const bio = document.querySelector('.js-bio-input');
  const status = document.querySelector('.js-status-input');
  const nascimento = document.querySelector('.js-date-input');
  const user = {
    nome: nome.value,
    sobrenome: sobrenome.value,
    bio: bio.value,
    status: status.value,
    nascimento: nascimento.value,
    user_uid: firebase.auth().currentUser.uid,
  };
  firestoreUserCollection.add(user);
}

function create() {
  const email = document.querySelector('.js-email-register-input').value;
  const password = document.querySelector('.js-password-register-input').value;
  const passwordConfirmation = document.querySelector('.js-confirm-password-input').value;
  const errorMessage = document.querySelector('.error');

  if (password === passwordConfirmation) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      window.location = '#feed';
      window.saveUser();
    }).catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/weak-password') errorMessage.textContent = 'A senha deve possuir no mínimo 6 caracteres';
      if (errorCode === 'auth/email-already-in-use') errorMessage.textContent = 'O e-mail informado já está em uso';
      if (errorCode === 'auth/operation-not-allowed') errorMessage.textContent = 'Conta não ativada';
      if (errorCode === 'auth/invalid-email') errorMessage.textContent = 'Email inválido';
    });
  } else if (password !== passwordConfirmation) {
    errorMessage.textContent = 'Senha não confere';
  } else if (email === '' || password === '') {
    errorMessage.textContent = 'Preencha os campos em branco';
  }
}

function Register() {
  const template = `
    <section class="box-login">
    <h1>Criar Conta</h1>
    <form>
      ${Input({ type: 'text', class: 'js-text-input', placeholder: 'nome' })}
      ${Input({ type: 'text', class: 'js-text2-input', placeholder: 'sobrenome' })}
      ${Input({ type: 'text', class: 'js-bio-input', placeholder: 'bio' })}
      ${Input({ type: 'date', class: 'js-date-input', placeholder: 'data de nascimento' })}
      <select class='js-status-input'>
        <option value= >Status de Relacionamento</option>
        <option value=Solteiro(a)>Solteiro(a)</option>
        <option value='Relacionamento Sério'>Relacionamento Sério</option> 
        <option value='Relacionamento Aberto'>Relacionamento Aberto</option> 
        <option value=Casado(a)>Casado(a)</option>
        <option value=Divorciado(a)>Divorciado(a)</option>
        <option value=Viúvo(a)>Viúvo(a)</option>";
      </select>
      ${Input({ type: 'email', class: 'js-email-register-input', placeholder: 'email' })}
      ${Input({ type: 'password', class: 'js-password-register-input', placeholder: 'senha' })}
      ${Input({ type: 'password', class: 'js-confirm-password-input', placeholder: 'confirmar senha' })}<br>
      ${Button({ class: 'create', title: 'Criar conta', onclick: create })}
    </form>
    <p class="error"></p><br>
    <p>Já tem uma conta? <a href="#login">Fazer Login</a></p>
    </section>
  `;
  return template;
}

window.saveUser = saveUser;

export default Register;
