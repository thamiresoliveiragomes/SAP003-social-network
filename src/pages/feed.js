import Button from '../components/button.js';

function logout() {
  firebase.auth().signOut().then(() => {
    window.location = '#login';
    // Sign-out successful.
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
}

function Feed() {
  const template = `
      <h1> Olá </h1>
      <p>Esse é o feed 🍌</p>
      ${Button({ class: 'signIn', title: 'Sair', onclick: logout })}
      `;
  return template;
}

export default Feed;
