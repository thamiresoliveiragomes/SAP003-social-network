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
  <section class="box-profile">
    <section class="box-profile1">
      <div class="foto"></div>
      <div class="dados">
        <h4>${nome} ${sobrenome}</h4>
        <p class="dados2">${bio}</p>
        <p class="dados2">Nascida em ${nascimento}</p> 
        <p class="dados2">${status}</p>
      </div>
    </section>
    ${Button({ class: 'edit', title: 'Editar', onclick: edit })}
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
    <nav class="navbar">
    <div class="nav-btn-div">
      ${Button({ class: 'nav-btn', onclick: window.app.showMenubar, title: '<i class="fas fa-bars"></i>' })}
      <ul class="toggle-content" id="lista-menu">
        <li> ${Button({ class: 'profile', title: 'Feed', onclick: feed })} </li>
        <li> ${Button({ class: 'profile', title: 'Sair', onclick: window.app.logout })}</li>
        </ul>
    </div>
    <a class="navbar-brand title">&lt Yellow Bag &gt</a>
    </nav>
    <section>
      <p class="js-profile"></p>
    </section>
      <section class="box-post">
        <ul class="js-user-post"></ul>
      </section>
      `;
  return template;
}

window.profile = {
  userPosts,
  loadProfile,
};

export default Profile;
