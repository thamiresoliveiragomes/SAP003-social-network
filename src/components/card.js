function Card(idPost, date, txt, name) {
  const template = `
  <li data-id='${idPost}'>
  <p>${name}</p>
    <p class='data'>Postado em ${date} </p>
    <textarea class='textarea-posts' disabled='true'>${txt}</textarea>
  </li>`;

  return template;
}

export default Card;
