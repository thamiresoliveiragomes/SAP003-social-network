function RoundButton(props) {
  const template = `
    <button class="${props.icone} ${props.class} secondary-button" 
      data-id="${props.dataId}" onclick="roundButton.handleClick(event, ${props.onclick})">${props.title}
    </button>
  `;
  return template;
}

window.roundButton = {
  handleClick: (event, callback) => {
    event.preventDefault();
    callback(event);
  },
};

export default RoundButton;
