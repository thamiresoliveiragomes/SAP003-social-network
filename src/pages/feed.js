import Button from '../components/button.js';
import Input from '../components/input.js';

function logout() {
  firebase.auth().signOut().then(() => {
    window.location = '#login';

  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
}

function loadData() {
  console.log('loadData');
    const postCollection = firebase.firestore().collection('posts');
    const postList = document.querySelector('.js-post');
    postList.innerHTML = 'Carregando...';
    postCollection.onSnapshot((snap) => {
      postList.innerHTML = ''
      snap.forEach(post => {
        const postList = document.querySelector('.js-post');
        const postTemplate = `
        <li> 
        ${post.data().txt}
        </li>
        `;
        postList.innerHTML += postTemplate;
      })
        // (addPost(post))
      // })
    })
  }


// function loadData() {
//   console.log('loadData');
//     const postCollection = firebase.firestore().collection('posts');
//     const postList = document.querySelector('.js-post');
//     postList.innerHTML = 'Carregando...';
//     postCollection.onSnapshot((snap) => {
//       postList.innerHTML = ''
//       snap.forEach(post => {
//         (addPost(post))
//       })
//     })
//   }

//   function addPost(post) {
//     const postList = document.querySelector('.js-post');
//     const postTemplate = `
//     <li> 
//     ${post.data().txt}
//     </li>
//     `;
//     postList.innerHTML += postTemplate;
//   }

// window.coisa = {
//   loadData: loadData,
//   addPost: addPost
//   }
  
// window.addEventListener('load', loadData);

function savePost() {

  function loadData() {
  console.log('loadData');
    const postCollection = firebase.firestore().collection('posts');
    const postList = document.querySelector('.js-post');
    postList.innerHTML = 'Carregando...';
    postCollection.onSnapshot((snap) => {
      postList.innerHTML = ''
      snap.forEach(post => {
        const postList = document.querySelector('.js-post');
        const postTemplate = `
        <li> 
        ${post.data().txt}
        </li>
        `;
        postList.innerHTML += postTemplate;
      })
        // (addPost(post))
      // })
    })
  }

  // function addPost(post) {
  //   const postList = document.querySelector('.js-post');
  //   const postTemplate = `
  //   <li> 
  //   ${post.data().txt}
  //   </li>
  //   `;
  //   postList.innerHTML += postTemplate;
  // }

  const firestorePostCollection = firebase.firestore().collection('posts');
  const txt = document.querySelector('.js-text-input').value;
  const post = {
    txt: txt,
    date: new Date(),
    comments: [],
    likes: 0,
    user_uid: firebase.auth().currentUser.uid,
  };
  const addPromise = firestorePostCollection.add(post);
  addPromise.then(() => {
    txt.value = '';
    // window.coisa.loadData();
    loadData();
  });
  addPromise.catch((error) => {
    console.log(error);
  });
}

function profile() {
  window.location = '#profile';
}

function Feed() {
  // const name = firebase.auth().currentUser.displayName;
  // console.log(name);
  const template = `
  <section class="box-post">
      <h1> Olá </h1>
      <p>Esse é o feed 🍌</p>
      <form>
      ${Input({ type: 'text', class: 'js-text-input', placeholder: 'Escreva sua publicação aqui...' })}<br>
      ${Button({ class: 'publicar', title: 'Publicar', onclick: savePost })}<br>
      ${Button({ class: 'profile', title: 'Perfil', onclick: profile })}<br>
      ${Button({ class: 'signIn', title: 'Sair', onclick: logout })}
      </form>
      </section>
      `;
  window.location = '#feed';
  loadData();
  return template;
}











// window.addEventListener('onhashchange', loadData);

export default Feed;
