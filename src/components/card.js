function Card(idPost, date, txt, name) {
  const template = `
  <li class='card' data-id='${idPost}'>
    <header class='post-header'> 
        <p class='data'>Postado por ${name} em ${date} 
      </header>
      <textarea id=${idPost} class='textarea-posts' disabled>${txt}</textarea>
  </li>`;

  return template;
}

export default Card;
