import Button from '../components/button.js';
import Input from '../components/input.js';

function Card(props) {
  const template = `
    <section class="show-posts">${props.txt}</section>

  `;

  return template;
}

export default Card;
