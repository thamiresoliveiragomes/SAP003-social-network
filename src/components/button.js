function Button(props) {
  const template = `
    <button class= "${props.icone} ${props.class} primary-button" 
      data-id="${props.dataId}" onclick="button.handleClick(event, ${props.onclick})">${props.title}
    </button>
  `;
  return template;
}

window.button = {
  handleClick: (event, callback) => {
    event.preventDefault();
    callback(event);
  },
};

export default Button;
