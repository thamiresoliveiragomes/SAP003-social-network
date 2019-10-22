function Card(idPost, date, txt) {
  const template = `
    <p>Postado em ${date} </p>
    <textarea id=${idPost} class='textarea-posts' disabled='true'>${txt}</textarea>
  `;

  return template;
}

export default Card;
