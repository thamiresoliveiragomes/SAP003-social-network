import Button from '../components/button.js';
import Card from '../components/card.js';

function edit() {
  window.location = '#config';
}

function feed() {
  window.location = '#feed';
}

function Profile() {
  const firestoreCollectionPost = firebase.firestore().collection('posts')
  // const currentUserId = firebase.auth().currentUser.uid;
  // firestoreCollectionPost.where('user_uid', '==', currentUserId).get().then(() => console.log('certo'))
  
  const template = `
    <section class="box-profile">
    <h1>foto</h1>
      <h3>Nome</h3>
      ${Button({ class: 'edit', title: 'Editar', onclick: edit })}
      ${Button({ class: 'voltar', title: 'Ir para o Feed', onclick: feed })}
      <p>BLa bla bla</p>
      </section>
      `;
  return template;
}

export default Profile;
