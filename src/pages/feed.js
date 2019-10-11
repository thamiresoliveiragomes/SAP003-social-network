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
  // var user = firebase.auth().currentUser;
  // console.log(user)

  // if (user) {
  //   console.log("bosta")
  //   const template = `
  //     <h1 class="greetings"></h1>
  //     <p>Esse é o feed 🍌</p>
  //     ${Button({ class: 'signIn', title: 'Logout', onclick: logout })}
  //     `;
  // return template;
  // // User is signed in.

  // } else if(user === null) {
  //   console.log("foi")
  //   const template = `
  //     <h1 class="greetings"></h1>
  //     <p>não está logado 🍌</p>
  //     ${Button({ class: 'signIn', title: 'Logout', onclick: logout })}
  //     `;
  //   return template;
  // // No user is signed in.
  // }

  const template = `
      <h1 class="greetings"></h1>
      <p>Esse é o feed 🍌</p>
      ${Button({ class: 'signIn', title: 'Logout', onclick: logout })}
      `;
  return template;

}

export default Feed;
