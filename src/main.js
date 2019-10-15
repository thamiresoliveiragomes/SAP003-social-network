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
    if (user && (window.location.hash === '#login' || window.location.hash === '#register')) {
      document.querySelector('main').innerHTML = Feed();
    } else if (user) {
      document.querySelector('main').innerHTML = pages[location.hash.substring(1)];
    } else if (!user && window.location.hash === '#register') {
      document.querySelector('main').innerHTML = Register();
    } else {
      document.querySelector('main').innerHTML = Login();
    }
  });
}

window.addEventListener('hashchange', () => {
  verificaUser();
}, false);

// function init() {
//   document.querySelector('main').innerHTML = Login();
// }

// window.addEventListener('load', verificaUser);

// function changeHash() {
//   if (window.location.hash === '#home') { document.querySelector('main').innerHTML = Home(); }
//   if (window.location.hash === '#feed') { document.querySelector('main').innerHTML = Feed(); }
//   if (window.location.hash === '#register') { document.querySelector('main').innerHTML = Register(); }
//   if (window.location.hash === '#login') { document.querySelector('main').innerHTML = Login(); }
// }

// window.addEventListener('hashchange', () => {
//   changeHash();
// }, false);
