import Input from '../components/input.js';
import Button from '../components/button.js';

function save() {
// função para atualizar os dados no firebase
  window.location = '#feed';
}

// function updateUsers() {
//   const firestoreUserCollection = firebase.firestore().collection('users');
//   const currentUserId = firebase.auth().currentUser.uid;
//   console.log(currentUserId);
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
      ${Input({ type: 'text', class: 'js-text-input', placeholder: 'nome' })}
      ${Input({ type: 'text', class: 'js-text2-input', placeholder: 'sobrenome' })}
      ${Input({ type: 'text', class: 'js-bio-input', placeholder: 'bio' })}
      ${Input({ type: 'date', class: 'js-date-input', placeholder: 'data de nascimento' })}
      <select class='js-status-input'>
        <option value= >Status de Relacionamento</option>
        <option value=Solteiro(a)>Solteiro(a)</option>
        <option value=Relacionamento Sério>Relacionamento Sério</option> 
        <option value=Relacionamento Aberto>Relacionamento Aberto</option> 
        <option value=Casado(a)>Casado(a)</option>
        <option value=Divorciado(a)>Divorciado(a)</option>
        <option value=Viúvo(a)>Viúvo(a)</option>";
      </select><br>
      ${Button({ class: 'cancel', title: 'Cancelar', onclick: cancel })}
      ${Button({ class: 'update', title: 'Salvar', onclick: save })}
    </form>
  </section>
  `;
  return template;
}

export default Config;
