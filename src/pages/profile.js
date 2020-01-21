import Button from '../components/button.js';

const feed = () => {
  window.location = '#feed';
};

const edit = () => {
  window.location = '#config';
};

const printProfile = (user) => {
  const userProfile = document.querySelector('.js-profile');
  const nome = user.data().nome;
  const sobrenome = user.data().sobrenome;
  const nascimento = user.data().nascimento;
  const bio = user.data().bio;
  const status = user.data().status;
  const profileTemplate = `
    <section class="box-profile">
      <div class='foto-box'>
        <div class="foto"></div>
      </div>
      <div class="dados">
        <h4>${nome} ${sobrenome}</h4>
        <p class="dados2">${bio}</p>
        <p class="dados2">Nascida em ${nascimento}</p> 
        <p class="dados2">${status}</p>
      </div>
      </section>
      ${Button({ class: 'edit', classType: 'button', title: 'Editar', onclick: edit })}
  `;

  userProfile.innerHTML = profileTemplate;
};

const loadProfile = () => {
  const currentUserId = firebase.auth().currentUser.uid;
  firebase.firestore()
    .collection('users')
    .where('user_uid', '==', currentUserId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((user) => {
        printProfile(user);
      });
    });
};

const userPosts = () => {
  const currentUserId = firebase.auth().currentUser.uid;
  firebase.firestore()
    .collection('users')
    .where('user_uid', '==', currentUserId)
    .get()
    .then((querySnapshot) => {
      const users = querySnapshot.docs;

      firebase.firestore()
        .collection('posts')
        .orderBy('date', 'desc')
        .where('user_uid', '==', currentUserId)
        .get()
        .then((snapshot) => {
          const posts = snapshot.docs;
          window.app.postCard(posts, users, '.js-user-post');
        });
    });
};

const Profile = () => {
  const template = `
    <nav class="navbar">
      <div class="nav-btn-div">
        ${Button({ class: 'nav-btn', classType: 'button', onclick: window.app.openMenu, title: '<i class="fas fa-bars"></i>' })}
        <ul class="toggle-content" id="lista-menu">
          <li> ${Button({ class: 'option-btn', classType: 'button', title: 'Feed', onclick: feed })} </li>
          <li> ${Button({ class: 'option-btn', classType: 'button', title: 'Sair', onclick: window.app.logout })}</li>
        </ul>
      </div>
      <a class="navbar-title">&lt Yellow Bag &gt</a>
    </nav>

    <section class="body-profile">
      <span class="js-profile"></span>
      <section class="box-post-feed">
        <ul class="js-user-post"></ul>
      </section>
    </section>
      `;
  return template;
};

window.profile = {
  userPosts,
  loadProfile,
};

export default Profile;
