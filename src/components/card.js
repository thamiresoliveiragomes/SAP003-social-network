import Button from './button.js';

function Card(idPost, date, txt, name, likes) {
  const template = `
  <li class='card' data-id='${idPost}'>
    <header class='post-header'> 
        <p class='data'>Postado por ${name} em ${date}</p>
      </header>
      <textarea id=${idPost} class='textarea-posts' disabled>${txt}</textarea>
      <section class='card-btns'>
      ${Button({ class: 'like', classType: 'round-button', title: '<i class="fas fa-heart"></i>', dataId: idPost, onclick: window.app.likePost })}
      ${likes}
      </section>
  </li>`;

  return template;
}

export default Card;
