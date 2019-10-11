import Home from './pages/home.js';
import Register from './pages/register.js';
import Login from './pages/login.js';
import Feed from './pages/feed.js';

const pages = {
  home: Home(),
  register: Register(),
  login: Login(),
  feed: Feed(),
};
function verificaUser() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.querySelector('main').innerHTML = pages[location.hash.substring(1)];
      console.log(user.email)
      // User is signed in.
    } else if (!user && window.location.hash === '#register'){
      document.querySelector('main').innerHTML = pages.register;
    } else {
      document.querySelector('main').innerHTML = Login();
      // No user is signed in.
    }
  });
  
}
function init() {
  document.querySelector('main').innerHTML = Login();
}
window.addEventListener('load', init);

window.addEventListener('hashchange', () => {
  verificaUser();
  // const pageHash = location.hash.substring(1);
  // console.log(pageHash);
  // document.querySelector('main').innerHTML = pages[location.hash.substring(1)];
}, false);
