function Card(idPost, date, txt) {
  const template = `
  <li data-id='${idPost}'>
    <p>Postado em ${date} </p>
    <textarea class='textarea-posts' disabled >${txt}</textarea>
  </li>
  `;

  return template;
}

export default Card;
