import Button from '../components/button.js';
import Input from '../components/input.js';
import Card from '../components/card.js';
import RoundButton from '../components/round-button.js';

function logout() {
  firebase.auth().signOut().then(() => {
    window.location = '#login';
  }).catch((error) => {
    console.log(error);
  });
}

function profile() {
  window.location = '#profile';
}

function edit() {
  window.location = '#config';
}

function editPost() {
  // document.getElementById(event.target.id).setAttribute('disabled', false)
  console.log('edit')
  
}

function SavePostEdited() {
  const postCollection = firebase.firestore().collection('posts');
  postCollection.doc(event.target.dataset.id).update({
    txt: 'hackeado!',
  })
    .then(() => {
      console.log('Document successfully updated!');
    });
}

function postDelete(event) {   //event como parametro não funciona
  
  event.preventDefault();
  // const id = event.target.dataset.id
  
  // console.log('post delete')
  console.log(event);

  firebase.firestore().collection('posts').doc(event.target.parentElement.dataset.id).delete()
  event.target.parentElement.remove();

  // document.querySelector(`li[data-id='${id}']`).remove();
  // document.querySelector(`button[data-id='${id}']`).remove();
}

function printData(post, classe) {

  const postList = document.querySelector(classe);
  const idPost = post.id;
  const date = post.data().date.toDate().toLocaleString('pt-BR');
  const txt = post.data().txt;
  if (post.data().user_uid === firebase.auth().currentUser.uid) {
    const postTemplateUser = `
    <li data-id='${idPost}'>
      ${Card(idPost, date, txt)}
      ${RoundButton({class: 'deletar', title: '<i class="far fa-trash-alt"></i>', dataId: idPost, onclick: 'window.app.postDelete(event)' })}
      ${RoundButton({class: 'editar', title: '<i class="far fa-edit"></i>', dataId: idPost, onclick: editPost })}
    </li>
    `;
    postList.innerHTML += postTemplateUser;
  } else {
    const postTemplate = `
    <li data-id='${idPost}'>
      ${Card(idPost, date, txt)}
    </li>
    `;
    postList.innerHTML += postTemplate;
  }

  return postList.innerHTML;
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
  const firestorePostCollection = firebase.firestore().collection('posts');
  const txt = document.querySelector('.js-text-input');
  const post = {
    txt: txt.value,
    date: new Date(),
    comments: [],
    likes: 0,
    user_uid: firebase.auth().currentUser.uid,
  };
  const addPromise = firestorePostCollection.add(post);
  addPromise.then(() => {
    txt.value = '';
    loadData('.js-post');
  });
  addPromise.catch((error) => {
    console.log(error);
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

function Feed() {
  const template = `
  <nav class="navbar">
    <div class="nav-btn-div">
      ${Button({ class: 'nav-btn', onclick: showMenubar, title: '<i class="fas fa-bars"></i>'})}
      <ul class="toggle-content" id="lista-menu">
        <li> ${Button({ class: 'profile', title: 'Perfil', onclick: profile })} </li>
        <li> ${Button({ class: 'profile', title: 'Editar', onclick: edit })}</li>
        <li> ${Button({ class: 'profile', title: 'Sair', onclick: logout })}</li>
        </ul>
    </div>
    <a class="navbar-brand">&lt Yellow Bag &gt</a>
  </nav>

  <section class="box-intro">
    <header class='box-intro-head'>
      <h1> Olá </h1>
      <p>Seja bem vindo!</p>
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
};

export default Feed;
