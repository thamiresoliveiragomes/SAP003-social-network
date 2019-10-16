function Image(props) {
  const template = `
    <figure>
        <img class="${props.class} image" alt="${props.alt}" src="${props.src}"/> 
    </figure>
  `;
  return template;
}

export default Image;
