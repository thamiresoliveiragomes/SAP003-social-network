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

const main = document.querySelector('main');
function init() {
  console.log('função init - #login');
  main.innerHTML = Login();
}
window.addEventListener('load', init);

function verificaUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user && (window.location.hash === '#login' || window.location.hash === '#register')) {
      main.innerHTML = Feed();
    } else if (user) {
      main.innerHTML = pages[location.hash.substring(1)];
    } else if (!user && window.location.hash === '#register') {
      main.innerHTML = Register();
    } else {
      main.innerHTML = Login();
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

// function goPage() {
// const newHash = window.location.hash;
// const pagesHash = [#feed, #register, #login, #profile, #config];

//   if (pages.Hash.includes(newHash)) { document.querySelector('main').innerHTML = Home(); }
//   if (newHash === '#feed') { document.querySelector('main').innerHTML = Feed(); }
//   if (newHash === '#register') { document.querySelector('main').innerHTML = Register(); }
//   if (newHash === '#login') { document.querySelector('main').innerHTML = Login(); }
// }

// window.addEventListener('hashchange', () => {
//   goPage();
// }, false);
