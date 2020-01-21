import Button from '../components/button.js';
import Card from '../components/card.js';

const logout = () => {
  firebase.auth().signOut()
    .then(() => {
      window.location = '#login';
    });
};

const profile = () => {
  window.location = '#profile';
};

const editPost = (event) => {
  const id = event.currentTarget.dataset.id;
  const textArea = document.querySelector(`textarea[id='${id}']`);
  const saveButton = document.querySelector(`.save[data-id='${id}']`);
  textArea.disabled = false;
  textArea.style.color = 'black';
  saveButton.style.display = 'inline-block';
};

const saveEditedPost = (event) => {
  const id = event.currentTarget.dataset.id;
  const textArea = document.querySelector(`textarea[id='${id}']`);
  const saveButton = document.querySelector(`.save[data-id='${id}']`);
  textArea.disabled = true;
  textArea.style.color = 'rgb(110, 110, 110)';
  saveButton.style.display = 'none';

  firebase.firestore().collection('posts').doc(id).update({
    txt: textArea.value,
  });
};

const postDelete = (event) => {
  const dataId = event.currentTarget.dataset.id;
  document.querySelector(`li[data-id='${dataId}']`).remove();

  firebase.firestore().collection('posts').doc(dataId).delete();
};

const likePost = (event) => {
  const id = event.currentTarget.dataset.id;
  const likeButton = document.querySelector(`.like[data-id='${id}']`);
  likeButton.disabled = true;

  firebase.firestore().collection('posts').doc(id).get()
    .then((post) => {
      const likes = (post.data().likes) + 1;
      firebase.firestore().collection('posts').doc(id).update({
        likes,
      });
    });
};

const postCard = (post, classe) => {
  const postList = document.querySelector(classe);
  const idPost = post.id;
  const date = post.data().date.toDate().toLocaleString('pt-BR');
  const txt = post.data().txt;
  const likes = post.data().likes;
  const userId = post.data().user_uid;

  firebase.firestore()
    .collection('users')
    .onSnapshot((snap) => {
      snap.forEach((user) => {
        if (user.data().user_uid === userId) {
          const name = ` ${user.data().nome} ${user.data().sobrenome} `;
          const postTemplate = ` ${Card(idPost, name, date, txt, likes, userId)} `;
          postList.innerHTML += postTemplate;
        }
      });
    });
};

const loadPosts = (classe) => {
  const postList = document.querySelector(classe);
  postList.innerHTML = 'Carregando...';

  firebase.firestore()
    .collection('posts')
    .orderBy('date', 'desc')
    .onSnapshot((snap) => {
      postList.innerHTML = '';
      snap.forEach((post) => {
        postCard(post, '.js-post');
      });
    });
};

const savePost = () => {
  const txt = document.querySelector('.js-text-input');
  const post = {
    txt: txt.value,
    date: new Date(),
    comments: [],
    likes: 0,
    user_uid: firebase.auth().currentUser.uid,
  };

  firebase.firestore().collection('posts').add(post)
    .then(() => {
      txt.value = '';
    });
};

const printName = () => {
  const userId = firebase.auth().currentUser.uid;
  firebase.firestore()
    .collection('users')
    .where('user_uid', '==', userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((user) => {
        document.querySelector('.name').innerHTML = `Olá, ${user.data().nome}`;
      });
    });
};

const openMenu = () => {
  const list = document.getElementById('lista-menu');
  if (list.style.display === 'block') {
    list.style.display = 'none';
  } else {
    list.style.display = 'block';
  }
};

const Feed = () => {
  const template = `
    <nav class="navbar">
      <div class="nav-btn-div">
        ${Button({ class: 'nav-btn', classType: 'button', onclick: openMenu, title: '<i class="fas fa-bars"></i>' })}
        <ul class="toggle-content" id="lista-menu">
          <li> ${Button({ class: 'option-btn', classType: 'button', title: 'Perfil', onclick: profile })} </li>
          <li> ${Button({ class: 'option-btn', classType: 'button', title: 'Sair', onclick: logout })}</li>
        </ul>
      </div>
      <a class="navbar-title">&lt Yellow Bag &gt</a>
    </nav>
    
    <section class="body-feed">
      <section class="box-profile-feed">
        <div class="foto-box">
          <div class="foto"></div>
        </div>
        <div class="dados">
          <h4 class='name'></h4>
          <p>Compartilhe suas aventuras!</p>
        </div>
      </section>

      <section class="box-post-feed">
        <form>
          <textarea class='js-text-input input-feed' placeholder= 'Escreva sua publicação aqui...'> </textarea><br>
          ${Button({ class: 'publicar', classType: 'button', title: 'Publicar', onclick: savePost })}<br>
        </form>
        <ul class="js-post"></ul>
      </section>
    </section>
  `;
  window.location = '#feed';

  return template;
};

window.app = {
  openMenu,
  logout,
  printName,
  loadPosts,
  postCard,
  editPost,
  saveEditedPost,
  postDelete,
  likePost,
};

export default Feed;
