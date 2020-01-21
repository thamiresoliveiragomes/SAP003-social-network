import Button from './button.js';

const Card = (idPost, name, date, txt, likes, userId) => {
  let template;

  const templateUser = `
    <li class='card' data-id='${idPost}'>
      <header class='post-header'> 
        <p>Postado por ${name} em ${date}</p>
      </header>
      <textarea id=${idPost} class='post-textarea' disabled>${txt}</textarea>
      <section class='post-btn'>
        <span>
          ${Button({ class: 'editar', classType: 'round-button', title: '<i class="far fa-edit"></i>', dataId: idPost, onclick: window.app.editPost })}
          ${Button({ class: 'save', classType: 'round-button', title: '<i class="far fa-save"></i>', dataId: idPost, onclick: window.app.saveEditedPost })}
        </span>
        <span>
          ${Button({ class: 'deletar', classType: 'round-button', title: '<i class="fas fa-trash-alt"></i>', dataId: idPost, onclick: window.app.postDelete })} 
        </span>
      </section>
    </li>
  `;

  const templateOthers = `
    <li class='card' data-id='${idPost}'>
      <header class='post-header'> 
        <p>Postado por ${name} em ${date}</p>
      </header>
      <textarea id=${idPost} class='post-textarea' disabled>${txt}</textarea>
      <section class='post-btn'>
        <span>
          ${Button({ class: 'like', classType: 'round-button', title: '<i class="fas fa-heart"></i>', dataId: idPost, onclick: window.app.likePost })}
          ${likes}
        </span>
      </section>
    </li>
  `;

  if (userId === firebase.auth().currentUser.uid) {
    template = templateUser;
  } else {
    template = templateOthers;
  }

  return template;
};

export default Card;
