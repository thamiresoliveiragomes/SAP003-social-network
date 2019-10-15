import Button from '../components/button.js';
import Input from '../components/input.js';

function logout() {
  firebase.auth().signOut().then(() => {
    window.location = '#login';
    // Sign-out successful.
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
}

const firestorePostCollection = firebase.firestore().collection('posts');

function savePost() {
  const txt = document.querySelector('.js-text-input').value;
  const post = {
    txt: txt,
    date: new Date(),
    comments: [],
    likes: 0,
    user_uid: firebase.auth().currentUser.uid,
  };
  const addPromise = firestorePostCollection.add(post);
  addPromise.then(() => {
    txt.value = '';
  });
  addPromise.catch((error) => {
    console.log(error)
  });
}

function profile() {
  window.location = '#profile';
}

function Feed() {
  // const name = firebase.auth().currentUser.displayName;
  // console.log(name);
  const template = `
  <section class="box-post">
      <h1> Olá </h1>
      <p>Esse é o feed 🍌</p>
      <form>
      ${Input({ type: 'text', class: 'js-text-input', placeholder: 'Escreva sua publicação aqui...' })}<br>
      ${Button({ class: 'signIn', title: 'Publicar', onclick: savePost })}<br>
      ${Button({ class: 'profile', title: 'Perfil', onclick: profile })}<br>
      ${Button({ class: 'signIn', title: 'Sair', onclick: logout })}
      </form>
      </section>
      `;
  window.location = '#feed';
  return template;
}

export default Feed;
