import Button from './button.js';

function CardUser(idPost, date, txt, name) {
  const template = `
    <li class='card' data-id='${idPost}'>
      <header class='post-header'> 
        <p class='data'>Postado por ${name} em ${date}</p>
        ${Button({ class: 'deletar', classType: 'round-button', title: '<i class="far fa-trash-alt"></i>', dataId: idPost, onclick: window.app.postDelete })} 
      </header>
      <textarea id=${idPost} class='textarea-posts' disabled>${txt}</textarea>
      <section class='card-btns'>
        ${Button({ class: 'editar', classType: 'round-button', title: '<i class="far fa-edit"></i>', dataId: idPost, onclick: window.app.editPost })}
        ${Button({ class: 'save', classType: 'round-button', title: '<i class="far fa-save"></i>', dataId: idPost, onclick: window.app.savePostEdited })}
      </section>
    </li>`;
  return template;
}

export default CardUser;
