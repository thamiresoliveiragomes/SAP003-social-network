function Card(props) {
  const template = `
    <section class="show-posts">${props.txt}</section>
  `;

  return template;
}

export default Card;
