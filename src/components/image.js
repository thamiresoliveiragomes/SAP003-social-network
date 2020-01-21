const Image = (props) => {
  const template = `
    <img class='${props.class}' alt='${props.alt}' src='${props.src}'/> 
  `;

  return template;
};

export default Image;
