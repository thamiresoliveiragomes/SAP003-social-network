import Input from '../components/input.js';
import Button from '../components/button.js';

function save() {
// função para atualizar os dados no firebase
  // window.location = '#feed';
  const firestoreUserCollection = firebase.firestore().collection('users');
  const nome = document.querySelector('.js-text-input');
  const sobrenome = document.querySelector('.js-text2-input');
  const bio = document.querySelector('.js-bio-input');
  const status = document.querySelector('.js-status-input');
  const nascimento = document.querySelector('.js-date-input');
  firestoreUserCollection.where('user_uid', '==', firebase.auth().currentUser.uid).update({
    nome: nome.value,
    sobrenome: sobrenome.value,
    bio: bio.value,
    status: status.value,
    nascimento: nascimento.value,
    user_uid: firebase.auth().currentUser.uid,
  });
}

function userInfo() {
  const firestoreUserCollection = firebase.firestore().collection('users');
  const currentUserId = firebase.auth().currentUser.uid;
  firestoreUserCollection.where('user_uid', '==', currentUserId).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((user) => {
        document.querySelector('.js-text-input').value = user.data().nome;
        document.querySelector('.js-text2-input').value = user.data().sobrenome;
        document.querySelector('.js-bio-input').value = user.data().bio;
        document.querySelector('.js-date-input').value = user.data().nascimento;
        document.querySelector('.js-status-input').value = user.data().status;
      });
    });
}

// function updateUsers() {
//   const firestoreUserCollection = firebase.firestore().collection('users');
//   const currentUserId = firebase.auth().currentUser.uid;
//   firestoreUserCollection.where('user_uid', '==', currentUserId).update
// }

function cancel() {
  window.location = '#profile';
}

function Config() {
  const template = `
  <section class="box-config">
    <h1>Editar Dados</h1>
    <form>
      ${Input({ type: 'text', class: 'js-text-input', placeholder: 'nome' })}<br>
      ${Input({ type: 'text', class: 'js-text2-input', placeholder: 'sobrenome' })}<br>
      ${Input({ type: 'text', class: 'js-bio-input', placeholder: 'bio' })}<br>
      ${Input({ type: 'date', class: 'js-date-input' })}<br>
      <select class='js-status-input'>
        <option value= >Status de Relacionamento</option>
        <option value=Solteiro(a)>Solteiro(a)</option>
        <option value=Relacionamento Sério>Relacionamento Sério</option> 
        <option value=Relacionamento Aberto>Relacionamento Aberto</option> 
        <option value=Casado(a)>Casado(a)</option>
        <option value=Divorciado(a)>Divorciado(a)</option>
        <option value=Viúvo(a)>Viúvo(a)</option>";
      </select>
      ${Button({ class: 'cancel', title: 'Cancelar', onclick: cancel })}<br>
      ${Button({ class: 'update', title: 'Salvar', onclick: save })}<br>
    </form>
    </section>
  `;
  userInfo();
  return template;
}

export default Config;
