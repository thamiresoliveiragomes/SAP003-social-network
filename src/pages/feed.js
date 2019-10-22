import Button from '../components/button.js';
import Input from '../components/input.js';
import Card from '../components/card.js';

function logout() {
  firebase.auth().signOut().then(() => {
    window.location = '#login';
  }).catch((error) => {
    console.log(error);
  });
}

function editPost() {
  // document.getElementById(event.target.id).setAttribute('disabled', false)
  console.log(event.target.id)
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

function profile() {
  window.location = '#profile';
}

function postDelete() {
  console.log('testando');
  firebase.firestore().collection('posts').doc(event.target.dataset.id).delete()
    // .then(()=> 
    // {loadData()})

  event.target.parentElement.remove();
  // document.querySelector(`li[data-id='${id}']`).remove();
  loadData()
};

function printData(post) {
  const postList = document.querySelector('.js-post');
  const idPost = post.id;
  const date = post.data().date.toDate().toLocaleString('pt-BR');
  const txt = post.data().txt;
  if (post.data().user_uid === firebase.auth().currentUser.uid) {
    const postTemplateUser = `
    ${Card(idPost, date, txt)}
    ${Button({class: 'deletar', title: 'Deletar', dataId: idPost, onclick: postDelete })}
    `;
    postList.innerHTML += postTemplateUser;
  }
  else {
    const postTemplate = `
    ${Card(idPost, date, txt)}
    ${Button({ class: 'editar', title: 'Editar', dataId: idPost, onclick: editPost })}
    `;
    postList.innerHTML += postTemplate;
  }
  
  return postList.innerHTML;
}

function loadData() {
  console.log('loadData');
  const postCollection = firebase.firestore().collection('posts');
  const postList = document.querySelector('.js-post');
  postList.innerHTML = 'Carregando...';
  postCollection.orderBy('date', 'desc').onSnapshot((snap) => {
    postList.innerHTML = '';
    snap.forEach((post) => {
      printData(post);
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
    loadData();
  });
  addPromise.catch((error) => {
    console.log(error);
  });
}

function Feed() {
  const template = `
  <section class="box-page">
    <h1> Olá </h1>
    <p>Seja bem vindo!</p>
      <form>
      ${Button({ class: 'profile', title: 'Perfil', onclick: profile })}<br>
      ${Button({ class: 'signIn', title: 'Sair', onclick: logout })}
      </form>
  </section>

  <section class="box-post">
    <form>
      ${Input({ type: 'text', class: 'js-text-input', placeholder: 'Escreva sua publicação aqui...' })}<br>
      ${Button({ class: 'publicar', title: 'Publicar', onclick: savePost })}<br>
    </form>
  </section>
  <ul class="js-post"></ul>`;
  window.location = '#feed';
  return template;
}

window.app = {
  loadData,
  printData,
  postDelete,
};

export default Feed;
