import Button from '../components/button.js';

function edit() {
  window.location = '#config';
}

function feed() {
  window.location = '#feed';
}

function userPosts() {
  const firestorePostCollection = firebase.firestore().collection('posts')
  const currentUserId = firebase.auth().currentUser.uid;
  console.log(currentUserId);
  firestorePostCollection.orderBy('date', 'desc').where('user_uid', '==', currentUserId).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((post) => {
        window.app.printData(post);
      });
    });
}


function Profile() {
  const template = `
    <section class="box-profile">
    <h1>foto</h1>
      <h3>Nome</h3>
      ${Button({ class: 'edit', title: 'Editar', onclick: edit })}
      ${Button({ class: 'voltar', title: 'Ir para o Feed', onclick: feed })}
      <p>BLa bla bla</p>
      </section>
      <ul class="js-post"></ul>
      `;
  return template;
}

window.userPosts = userPosts;

export default Profile;
