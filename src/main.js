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
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      window.location.hash = 'feed';
      //document.querySelector('main').innerHTML = pages[location.hash.substring(1)];
      // User is signed in.
    } else if (!user && window.location.hash === '#register') {
      document.querySelector('main').innerHTML = pages.register;
    } else {
      window.location.hash = 'login';
      // No user is signed in.
    }
  });
}
// function init() {
//   document.querySelector('main').innerHTML = verificaUser();
// }

window.addEventListener('load', verificaUser);

function changeHash() { 
  if (window.location.hash === '#home') { document.querySelector('main').innerHTML = Home(); }
  if (window.location.hash === '#feed') { document.querySelector('main').innerHTML = Feed(); }
  if (window.location.hash === '#register') { document.querySelector('main').innerHTML = Register(); }
  if (window.location.hash === '#login') { document.querySelector('main').innerHTML = Login(); }
}

window.addEventListener('hashchange', () => {
  changeHash();
}, false);
