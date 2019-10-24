function CardUser(idPost, date, txt) {
const template = `
      <p class='data'>Postado em ${date} </p>
      <textarea id=${idPost} class='textarea-posts' disabled='true'>${txt}</textarea>
    `;
  
    return template;
  }
  
  export default CardUser;
  