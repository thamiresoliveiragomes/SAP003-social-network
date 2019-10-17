import Button from '../components/button.js';
import Input from '../components/input.js';

function Card(date, txt) {
  const template = `
  <li>
    Postado em ${date} <br>
    <textarea class='textarea-posts' disabled >${txt}</textarea>
  </li>
  `;

  return template;
}

export default Card;
