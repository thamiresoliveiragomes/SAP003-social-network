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

function savePost() {
  const txt = document.querySelector('.js-text-input').value;
  const post = {
    post: txt,
    date: Date(),
  };
  firebase.firestore().collection('posts').add(post);
}

function LoadPost() {
  
}

function profile() {
  window.location = '#profile';
}

function Feed() {
  const template = `
  <section class="box-post"
      <h1> Olá </h1>
      <p>Esse é o feed 🍌</p>
      <form>
      ${Input({ type: 'text', class: 'js-text-input', placeholder: 'Escreva sua publicação aqui...' })}<br>
      ${Button({ class: 'signIn', title: 'Publicar', onclick: savePost })}<br>
      ${Button({ class: 'signIn', title: 'Sair', onclick: logout })}
      ${Button({ class: 'profile', title: 'Perfil', onclick: profile })}
      </form>
      </section>
      `;
  window.location = '#feed';
  return template;
}

export default Feed;
