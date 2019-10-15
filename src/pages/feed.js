import Button from '../components/button.js';
import Input from '../components/input.js';
// import Card from '../components/card.js';

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
    'txt': txt,
    'date': new Date(),
    'comments': [],
    'likes': 0,
    'user_uid': firebase.auth().currentUser.uid,
  };
  const addPromise = firestorePostCollection.add(post);
  addPromise.then(() => {
    txt.value = '';

  });
  addPromise.catch((error) => {
    console.log(error)
  });
}

function Feed() {
  // const name = firebase.auth().currentUser.displayName;
  // console.log(name);
  const template = `
      <h1> Olá </h1>
      <p>Esse é o feed 🍌</p>
      ${Input({ type: 'email', class: 'js-text-input', placeholder: ' escreva aqui' })}
      ${Button({ class: 'signIn', title: 'Sair', onclick: logout })}
      ${Button({ class: 'post', title: 'Postar', onclick: savePost })}
      <ul>
      </ul>`
  return template;
}

export default Feed;
