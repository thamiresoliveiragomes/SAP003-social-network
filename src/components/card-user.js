import RoundButton from './round-button.js';

function CardUser(idPost, date, txt, name) {
  const template = `
    <li data-id='${idPost}'>
    <p>${name}</p>
      <p class='data'>Postado em ${date} </p>
      <textarea id=${idPost} class='textarea-posts' disabled='true'>${txt}</textarea>
      <section class='card-btns'>
        ${RoundButton({ class: 'deletar', title: '<i class="far fa-trash-alt"></i>', dataId: idPost, onclick: window.app.postDelete })} 
        ${RoundButton({ class: 'editar', title: '<i class="far fa-edit"></i>', dataId: idPost, onclick: window.app.editPost })}
      </section>
    </li>`;


  return template;
}

export default CardUser;
