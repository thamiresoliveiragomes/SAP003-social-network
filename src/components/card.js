function Card(idPost, date, txt) {
  const template = `
  <li data-id='${idPost}'>
    <p>Postado em ${date} </p>
    <textarea id=${idPost} class='textarea-posts' disabled='true'>${txt}</textarea>
  </li>
  `;

  return template;
}

export default Card;
