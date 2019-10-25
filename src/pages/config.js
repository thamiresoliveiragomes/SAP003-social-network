import Input from '../components/input.js';
import Button from '../components/button.js';

function save() {
  const firestoreUserCollection = firebase.firestore().collection('users');
  const nome = document.querySelector('.js-text-input');
  const sobrenome = document.querySelector('.js-text2-input');
  const bio = document.querySelector('.js-bio-input');
  const status = document.querySelector('.js-status-input');
  const nascimento = document.querySelector('.js-date-input');
  firestoreUserCollection.where('user_uid', '==', firebase.auth().currentUser.uid).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((user) => {
        const userId = user.id;
        firestoreUserCollection.doc(userId).update({
          nome: nome.value,
          sobrenome: sobrenome.value,
          bio: bio.value,
          status: status.value,
          nascimento: nascimento.value,
          user_uid: firebase.auth().currentUser.uid,
        }).then(() => {
          window.location = '#profile';
        });
      });
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

function cancel() {
  window.location = '#profile';
}

function Config() {
  const template = `
  <section class="box-config">
    <h1>Editar Dados</h1>
    <form class='form-config'>
      ${Input({ type: 'text', class: 'js-text-input input-config', placeholder: 'nome' })}
      ${Input({ type: 'text', class: 'js-text2-input input-config', placeholder: 'sobrenome' })}
      ${Input({ type: 'text', class: 'js-bio-input input-config', placeholder: 'bio' })}
      <select class='js-status-input input-config'>
        <option value= >Status de Relacionamento</option>
        <option value=Solteiro(a)>Solteiro(a)</option>
        <option value='Relacionamento Sério'>Relacionamento Sério</option> 
        <option value='Relacionamento Aberto'>Relacionamento Aberto</option> 
        <option value=Casado(a)>Casado(a)</option>
        <option value=Divorciado(a)>Divorciado(a)</option>
        <option value=Viúvo(a)>Viúvo(a)</option>";
      </select><br>
      <label>Data de Nascimento:</label>
      ${Input({ type: 'date', class: 'js-date-input input-config' })}
      ${Button({ class: 'cancel', title: 'Cancelar', onclick: cancel })}
      ${Button({ class: 'update', title: 'Salvar', onclick: save })}
    </form>
  </section>
  `;
  userInfo();
  return template;
}

export default Config;
