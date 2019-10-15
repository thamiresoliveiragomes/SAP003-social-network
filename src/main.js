import Register from './pages/register.js';
import Login from './pages/login.js';
import Feed from './pages/feed.js';
import Config from './pages/config.js';
import Profile from './pages/profile.js';

const pages = {
  register: Register(),
  login: Login(),
  feed: Feed(),
  config: Config(),
  profile: Profile(),
};

function init() {
  document.querySelector('main').innerHTML = Login();
}
window.addEventListener('load', init);

function verificaUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (window.location.hash === '#login' || window.location.hash === '#register') {
        document.querySelector('main').innerHTML = Feed();
      } else {
        document.querySelector('main').innerHTML = pages[location.hash.substring(1)];
      }
      // User is signed in.
    } else if (!user && window.location.hash === '#register') {
      document.querySelector('main').innerHTML = Register();
    } else {
      document.querySelector('main').innerHTML = Login();
      // No user is signed in.
    }
  });
}

window.addEventListener('hashchange', () => {
  verificaUser();
}, false);
