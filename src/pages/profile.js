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
    <section class="box-profile1">
      <div class="foto"></div>
      <div class="dados">
        <h4>${nome} ${sobrenome}</h4>
        <p class="dados2">${bio}</p>
        <p class="dados2">Nascida em ${nascimento}</p> 
        <p class="dados2">${status}</p>
      </div>
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
