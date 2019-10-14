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

function Feed() {
  const template = `
  <section class="box-post"
      <h1> Olá </h1>
      <p>Esse é o feed 🍌</p>
      <form>
      ${Input({ type: 'text', class: 'js-text-input', placeholder: 'Escreva o post' })}<br>
      ${Button({ class: 'signIn', title: 'Postar', onclick: savePost })}<br>
      ${Button({ class: 'signIn', title: 'Sair', onclick: logout })}
      </form>
      </section>
      `;
  window.location = '#feed';
  return template;
}

export default Feed;
