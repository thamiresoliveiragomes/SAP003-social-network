import RoundButton from './round-button.js';

function CardUser(idPost, date, txt, name) {
  const template = `
    <li data-id='${idPost}'>
    <p>${name}</p>
      <p class='data'>Postado em ${date} </p>
      <textarea id=${idPost} class='textarea-posts' disabled>${txt}</textarea>
      <section class='card-btns'>
        ${RoundButton({ class: 'deletar', title: '<i class="far fa-trash-alt"></i>', dataId: idPost, onclick: window.app.postDelete })} 
        ${RoundButton({ class: 'editar', title: '<i class="far fa-edit"></i>', dataId: idPost, onclick: window.app.editPost })}
        ${RoundButton({ class: 'save', title: '<i class="far fa-save"></i>', dataId: idPost, onclick: window.app.savePostEdited })}
      </section>
    </li>`;

  return template;
}

export default CardUser;
