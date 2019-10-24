import Button from '../components/button.js';
import Input from '../components/input.js';
import Card from '../components/card.js';
import RoundButton from '../components/round-button.js';
import CardUser from '../components/card-user.js';

function logout() {
  firebase.auth().signOut()
    .then(() => {
      window.location = '#login';
    });
}

function profile() {
  window.location = '#profile';
}

function edit() {
  window.location = '#config';
}

function editPost(event) {
  // document.getElementById(event.target.id).setAttribute('disabled', false)
  console.log('edit');
  console.log(event);
}

function SavePostEdited(event) {
  const postCollection = firebase.firestore().collection('posts');
  postCollection.doc(event.target.dataset.id).update({
    txt: 'hackeado!',
  })
    .then(() => {
      console.log('Document successfully updated!');
    });
}

function postDelete(event) {
  const dataId = event.currentTarget.dataset.id;
  console.log(dataId)
  // fazer um loop: https://stackoverflow.com/questions/14106905/changing-event-target
  // console.log(event.target.parentElement.parentElement);
  // const id = event.target.parentElement.parentElement.dataset.id;
  const postCollection = firebase.firestore().collection('posts');
  postCollection.doc(dataId).delete();
  document.querySelector(`li[data-id='${dataId}']`).remove();
  // document.querySelector(`button[data-id='${id}']`).remove();
}

function printData(post, classe) {
  const postList = document.querySelector(classe);
  const idPost = post.id;
  const date = post.data().date.toDate().toLocaleString('pt-BR');
  const txt = post.data().txt;

  const userId = post.data().user_uid;
  firebase.firestore().collection('users').where('user_uid', '==', userId).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((user) => {
        const nome = user.data().nome;

        if (post.data().user_uid === firebase.auth().currentUser.uid) {
          const postTemplateUser = `
          ${CardUser(idPost, date, txt, nome)}
          `;


          postList.innerHTML += postTemplateUser;
        } else {
          const postTemplate = `
            ${Card(idPost, date, txt, nome)}
          `;
          postList.innerHTML += postTemplate;
        }


      });
    });
}

function loadData(classe) {
  console.log('loadData');
  const postCollection = firebase.firestore().collection('posts');
  const postList = document.querySelector(classe);
  postList.innerHTML = 'Carregando...';
  postCollection.orderBy('date', 'desc').onSnapshot((snap) => {
    postList.innerHTML = '';
    snap.forEach((post) => {
      printData(post, '.js-post');
    });
  });
}

function savePost() {
  console.log('savePost');

  const txt = document.querySelector('.js-text-input');
  const post = {
    txt: txt.value,
    date: new Date(),
    comments: [],
    likes: 0,
    user_uid: firebase.auth().currentUser.uid,
  };
  const postCollection = firebase.firestore().collection('posts');
  postCollection.add(post)
    .then(() => {
      txt.value = '';
    });
}

function showMenubar() {
  const list = document.getElementById('lista-menu');
  if (list.style.display === 'block') {
    list.style.display = 'none';
  } else {
    list.style.display = 'block';
  }
}

// function print(user) {
//   const nome = user.data().nome;
//   document.getElementById('name').innerHTML = ` Olá, ${nome}`;
// }

function printName() {
  const userId = firebase.auth().currentUser.uid;
  firebase.firestore().collection('users').where('user_uid', '==', userId).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((user) => {
        const nome = user.data().nome;
        document.getElementById('name').innerHTML = ` Olá, ${nome}`;
      });
    });
}

function Feed() {
  const template = `
  <nav class="navbar">
    <div class="nav-btn-div">
      ${Button({ class: 'nav-btn', onclick: showMenubar, title: '<i class="fas fa-bars"></i>' })}
      <ul class="toggle-content" id="lista-menu">
        <li> ${Button({ class: 'profile', title: 'Perfil', onclick: profile })} </li>
        <li> ${Button({ class: 'profile', title: 'Editar', onclick: edit })}</li>
        <li> ${Button({ class: 'profile', title: 'Sair', onclick: logout })}</li>
        </ul>
    </div>
    <a class="navbar-brand title">&lt Yellow Bag &gt</a>
  </nav>

  <section class="box-intro">
    <header class='box-intro-head'>
      <h4 class='name' id='name'></h4>
      <p>Compartilhe suas aventuras!</p>
    </header>  
  </section>

  <section class="box-post">
    <form>
      ${Input({ type: 'text', class: 'js-text-input', placeholder: 'Escreva sua publicação aqui...' })}<br>
      ${Button({ class: 'publicar', title: 'Publicar', onclick: savePost })}<br>
    </form>
  <ul class="js-post"></ul>
  </section>
  `;
  window.location = '#feed';
  return template;
}

window.app = {
  loadData,
  printData,
  postDelete,
  printName,
  editPost,
};

export default Feed;
