import Register from './pages/register.js';
import Login from './pages/login.js';
import Feed from './pages/feed.js';
import Config from './pages/config.js';
import Profile from './pages/profile.js';

// const pages = {
//   register: Register(),
//   login: Login(),
//   feed: Feed(),
//   config: Config(),
//   profile: Profile(),
// };


function verificaUser() {
  console.log('verifica user')
  firebase.auth().onAuthStateChanged((user) => {
    const currentHash = window.location.hash;
    const main = document.querySelector('main');
    if (user) {
      switch (currentHash) {
        case '#profile':
          main.innerHTML = Profile();
          userPosts();
          break;
        case '#config':
          main.innerHTML = Config();
          break;
        default:
          main.innerHTML = Feed();
          window.app.loadData('.js-post');
      }
    } else if (!user) {
      switch (currentHash) {
        case '#register':
          main.innerHTML = Register();
          break;
        default:
          main.innerHTML = Login();
      }
    }
  });
}

window.addEventListener('load', verificaUser);
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
