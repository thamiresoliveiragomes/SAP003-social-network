function RoundButton(props) {
  const template = `
    <button class="${props.icone} ${props.class} secondary-button" data-id="${props.dataId}" onclick="${props.onclick}">${props.title}</button>
  `;

  return template;
}

// window.button = {
//   // handleClick: (event, callback) => {
//   //   event.preventDefault();
//   //   callback(event);
//   // },
//   handleClick: (event) => {
//     event.preventDefault();
//   },
// }; 

export default RoundButton;
