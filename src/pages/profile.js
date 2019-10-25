import Button from '../components/button.js';

function edit() {
  window.location = '#config';
}

function feed() {
  window.location = '#feed';
}

function printProfile(user) {
  const userProfile = document.querySelector('.js-profile');
  const nome = user.data().nome;
  const sobrenome = user.data().sobrenome;
  const nascimento = user.data().nascimento;
  const bio = user.data().bio;
  const status = user.data().status;
  const profileTemplate = `
    <section class="perfil-user">
    <h3>${nome} ${sobrenome}</h3>
    <p>${nascimento}</p> 
    <p>${status}</p>
    <p>${bio}</p>
    </section>
    `;

  userProfile.innerHTML = profileTemplate;
}

function loadProfile() {
  const firestoreUserCollection = firebase.firestore().collection('users');
  const currentUserId = firebase.auth().currentUser.uid;
  firestoreUserCollection.where('user_uid', '==', currentUserId).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((user) => {
        printProfile(user);
      });
    });
}

function userPosts() {
  const firestorePostCollection = firebase.firestore().collection('posts');
  const currentUserId = firebase.auth().currentUser.uid;
  firestorePostCollection.orderBy('date', 'desc').where('user_uid', '==', currentUserId).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((post) => {
        window.app.printData(post, '.js-user-post');
      });
    });
}

function Profile() {
  const template = `
    <section class="box-profile">
    <p class="js-profile"></p>
      ${Button({ class: 'edit', title: 'Editar', onclick: edit })}
      ${Button({ class: 'voltar', title: 'Ir para o Feed', onclick: feed })}
      </section>
      <ul class="js-user-post"></ul>
      `;
  return template;
}

window.profile = {
  userPosts,
  loadProfile,
};

export default Profile;
